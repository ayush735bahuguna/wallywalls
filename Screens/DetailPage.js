import { View, Text, ScrollView, Dimensions, StatusBar, TouchableOpacity, Share, Linking } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import Vibrate from '../Components/Vibrate';
import { FontAwesome6 } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
const DetailPage = ({ route, navigation }) => {
    const { URL, BlueHash, width, height, ImageId, Color, data } = route.params;
    const screenHeight = Dimensions.get("window").height + StatusBar.currentHeight;
    const calculatedWidth = width / (Math.ceil(height / screenHeight));
    const statusbarHeight = StatusBar.currentHeight;
    const [Loading, setLoading] = useState(true);
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['5%', '50%'], []);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [downloadLoading, setdownloadLoading] = useState(false)

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

    // console.log(data);
    return (
        <GestureHandlerRootView>
            <StatusBar barStyle={'light-content'} />
            <View className='relative'>

                <View className='z-10 flex flex-row gap-2' style={{ position: 'absolute', top: statusbarHeight + 10, right: 10 }}>

                    <TouchableOpacity onPress={SaveImageToGallary} className={` h-10 w-10 bg-slate-700 rounded-full flex items-center justify-center`}  >
                        {downloadLoading ? <ActivityIndicator animating={true} color='white' /> :
                            <FontAwesome6 name="download" size={20} color="white" />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={shareWallpaper} className={` h-10 w-10 bg-slate-700 rounded-full flex items-center justify-center`}  >
                        <Entypo name="share" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} className={` h-10 w-10 bg-slate-700 rounded-full flex items-center justify-center`}  >
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true}>
                    <View style={{ height: screenHeight, width: calculatedWidth }}>
                        <Image
                            source={{ uri: URL }}
                            style={{ width: calculatedWidth, height: screenHeight }}
                            placeholder={BlueHash}
                            onLoadEnd={() => { setLoading(false) }}
                        />
                    </View>
                </ScrollView>
            </View >
            <BottomSheet
                backgroundStyle={{ backgroundColor: 'white' }}
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
            >
                <View className='p-2'>
                    <Text className='text-xl font-bold' >{data?.description}</Text>
                    <View className='flex gap-3 flex-row items-center justify-between py-4'>

                        <Text className='font-bold text-2xl'>{data?.user?.first_name}</Text>
                        <View className='flex gap-3 flex-row px-3'>
                            <TouchableOpacity
                                onPress={() => { Linking.openURL(data?.user.social?.portfolio_url) }}
                            >
                                <Entypo name="link" size={24} color='black' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { Linking.openURL('https://www.instagram.com/' + data?.user.social?.instagram_username) }}
                            >
                                <Entypo name="instagram" size={24} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { Linking.openURL('https://twitter.com/' + data?.user.social?.twitter_username) }}
                            >
                                <Entypo name="twitter" size={24} color="blue" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </BottomSheet>

        </GestureHandlerRootView>
    )
}

export default DetailPage