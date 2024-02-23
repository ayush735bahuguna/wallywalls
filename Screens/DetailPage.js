import { View, Text, ScrollView, Dimensions, StatusBar, TouchableOpacity, Share } from 'react-native'
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
    const { URL, BlueHash, width, height, description, ImageId, Color } = route.params;
    const screenHeight = Dimensions.get("window").height + StatusBar.currentHeight;
    const screenWidth = Dimensions.get("window").width;
    const calculatedWidth = width / (Math.ceil(height / screenHeight));
    const statusbarHeight = StatusBar.currentHeight;
    const [Loading, setLoading] = useState(true);
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['10%', '40%'], []);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [downloadLoading, setdownloadLoading] = useState(false)
    const [oppositeColor, setoppositeColor] = useState('')


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



    function invertColor(hex) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        return '#' + padZero(r) + padZero(g) + padZero(b);
    }

    useEffect(() => {
        const OppositeColor = invertColor(Color)
        setoppositeColor(OppositeColor);
    }, [])

    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

    return (
        <GestureHandlerRootView>
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
                    {/* {Loading ?
                        <View style={{ marginTop: statusbarHeight, width: screenWidth }} className='flex-1 items-center justify-center flex-row absolute top-1/2 z-10'>
                            <ActivityIndicator animating={true} />
                            <View className='p-4'>
                                <Text>Loading high quality image</Text>
                            </View>
                        </View>
                        :
                        <View></View>
                    } */}
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
                backgroundStyle={{ backgroundColor: Color }}
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
            >
                <View className='p-2'>
                    <Text className='text-xl font-bold' style={{ color: oppositeColor }}>{description}</Text>
                    {/* <Text className='text-right p-1'>{updated_at}</Text> */}
                    {/* <Text className='text-right p-1'>{UserName}</Text>
                    <Avatar.Image size={50} source={UserProfileImage} /> */}
                </View>
            </BottomSheet>

        </GestureHandlerRootView>
    )
}

export default DetailPage