import { View, Text, ScrollView, Dimensions, TouchableOpacity, Share, Linking, StatusBar, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import Vibrate from '../Components/Vibrate';
import { FontAwesome6 } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { useInfiniteQuery } from 'react-query';
import RenderItemComponent from '../Components/Home/RenderItemComponent';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';

const DetailPage = ({ route, navigation }) => {
    const { URL, BlueHash, width, height, ImageId, data } = route.params;
    const AccessKey = process.env.ACCESS_KEY;
    const screenHeight = Dimensions.get("window").height + StatusBar.currentHeight;
    const screenWidth = Dimensions.get("window").width;
    const calculatedWidth = width / (Math.ceil(height / screenHeight));
    const statusbarHeight = StatusBar.currentHeight;
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [downloadLoading, setdownloadLoading] = useState(false)
    const [ImageHeight, setImageHeight] = useState(screenHeight)
    const flatListRef = useRef(null);

    const SaveImageToGallary = async () => {
        Vibrate();
        setdownloadLoading(true)
        await requestPermission();

        if (permissionResponse?.granted) {
            FileSystem.downloadAsync(URL, FileSystem.documentDirectory + ImageId + '.jpg')
                .then(({ uri }) => {
                    MediaLibrary.createAssetAsync(uri)
                    alert('Saved to photos');
                    setdownloadLoading(false)
                })
                .catch(error => {
                    console.log(error);
                    setdownloadLoading(false)
                });
        } else {
            alert('Requires camera roll permission');
            setdownloadLoading(false)
        }
    }

    const shareWallpaper = async () => {
        Vibrate();
        try {
            await Share.share({
                message: 'Checkout this Image ' + URL
            })
        } catch (error) {
            console.log(error);
        }
    }
    const fetchImages = async ({ pageParam = 1 }) => {
        try {
            if (data?.user?.username) {
                const { data: result, headers } = await axios.get(`https://api.unsplash.com/users/${data?.user.username}/photos?client_id=${AccessKey}&page=${pageParam}&per_page=10&order_by=popular`)
                // console.log(headers.get('x-ratelimit-remaining'));
                return result
            }
        } catch (error) {
            console.log(error, 'error');
            return error
        }
    }

    const { isLoading, data: ApiData, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
        queryKey: ['UsersImages'],
        queryFn: fetchImages,
        getNextPageParam(lastpage, allpages) {
            if (lastpage?.length === 0) return undefined
            return allpages?.length + 1
        }
    })
    const AnimatedImage = () => {
        return <View style={{ height: ImageHeight, width: calculatedWidth }}>
            <Image
                source={{ uri: URL }}
                style={{ width: calculatedWidth, height: ImageHeight }}
                placeholder={BlueHash}
            />
        </View>
    }
    const header = () => {
        return <>
            <StatusBar animated={true} barStyle={'auto'} backgroundColor={'transparent'} />
            <View className='relative'>

                <View className='z-10 flex flex-row gap-2' style={{ position: 'absolute', top: statusbarHeight + 10, right: 10 }}>

                    <View className={`h-10 bg-slate-700 rounded-full flex items-center justify-between flex-row px-2`}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                        <Text className='text-white px-2'>Scroll</Text>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </View>

                    <TouchableOpacity onPress={() => { navigation.goBack(); }} className={` h-10 w-10 bg-slate-700 rounded-full flex items-center justify-center`}  >
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View className='z-10 flex flex-row gap-2' style={{ position: 'absolute', bottom: 20, right: 10 }}>

                    <TouchableOpacity onPress={SaveImageToGallary} style={{ width: (screenWidth / 2) - 40 }} className={` bg-slate-700 rounded-lg flex items-center justify-center`}  >
                        {downloadLoading ?
                            <View className='flex items-center justify-center flex-row gap-2 py-2'>
                                <ActivityIndicator animating={true} color='white' />
                                <Text className='text-white text-base'> Wait</Text>
                            </View>
                            :
                            <View className='flex items-center justify-center flex-row gap-2 py-2'>
                                <FontAwesome6 name="download" size={20} color="white" />
                                <Text className='text-white text-base'> Downlod</Text>
                            </View>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={shareWallpaper} style={{ width: (screenWidth / 2) - 40 }} className={` bg-slate-700 rounded-lg flex flex-row items-center justify-center py-2`}  >
                        <Entypo name="share" size={24} color="white" />
                        <Text className='text-white text-base'> &nbsp; &nbsp; Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        Vibrate();
                        flatListRef.current.scrollToOffset({ animated: true, offset: screenHeight / 2 });
                    }} className={` h-10 w-10 bg-slate-700 rounded-lg flex items-center justify-center`}  >
                        <FontAwesome name="arrow-down" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true}>
                    <AnimatedImage />
                </ScrollView>
            </View >
            <View className='my-4 flex items-center justify-center flex-row'>

                <Text className='p-2 text-xl'>More Image by</Text>
                <Text className='font-bold text-xl'>{data?.user.name}</Text>
            </View>
        </>
    }

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            key={1}
            ref={flatListRef}
            numColumns={2}
            data={ApiData?.pages?.map(page => page).flat()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={header}
            onStartReached={() => { Vibrate() }}
            onEndReachedThreshold={0}
            onEndReached={() => {
                Vibrate()
                if (hasNextPage && !isLoading && !isFetching && !isFetchingNextPage) { fetchNextPage() }
            }}
            renderItem={({ item, index }) => <RenderItemComponent item={item} index={index} navigation={navigation} numColumns={2} screenWidth={screenWidth} setUserObject={data?.user} showfooter={false} Listref={flatListRef} />
            }
            ListFooterComponent={isFetchingNextPage ?
                <View className='flex items-center justify-center flex-row'>
                    <ActivityIndicator animating={true} />
                    <View className='p-4'>
                        <Text>Loading more image</Text>
                    </View>
                </View>
                : <Text className='p-2 text-center my-4'>End of list</Text>}
        />


    )
}

export default DetailPage