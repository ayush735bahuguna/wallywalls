import { View, Text, ScrollView, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import Animated from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import SetWallpaper from '../Components/Detail Page/SetWallpaper';

const DetailPage = ({ route, navigation }) => {
    const { URL, index, width, height, description, updated_at, UserProfileImage, UserName } = route.params;
    const screenHeight = Dimensions.get("window").height + StatusBar.currentHeight;
    const screenWidth = Dimensions.get("window").width;
    const calculatedWidth = width / (Math.ceil(height / screenHeight));
    const statusbarHeight = StatusBar.currentHeight;
    const [Loading, setLoading] = useState(true);

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['10%', '40%'], []);

    return (
        <GestureHandlerRootView>
            <View className='relative'>

                <View className='z-10 flex flex-row gap-2' style={{ position: 'absolute', top: statusbarHeight + 10, right: 10 }}>

                    <SetWallpaper ImageUrl={URL} />

                    <TouchableOpacity onPress={() => { navigation.goBack(); }} className={` h-10 w-10 bg-slate-700 rounded-full flex items-center justify-center`}  >
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true}>
                    {Loading ?
                        <View style={{ marginTop: statusbarHeight, width: screenWidth }} className='flex-1 items-center justify-center flex-row'>
                            <ActivityIndicator animating={true} />
                            <View className='p-4'>
                                <Text>Loading high quality image</Text>
                            </View>
                        </View>
                        :
                        <View></View>
                    }
                    <View style={{ height: screenHeight, width: calculatedWidth }}>
                        <Animated.Image
                            source={{ uri: URL }}
                            style={{ width: calculatedWidth, height: screenHeight }}
                            sharedTransitionTag={`${index}Image`}
                            onLoadEnd={() => { setLoading(false) }}
                        />
                    </View>
                </ScrollView>
            </View >
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
            >
                <View className='p-2'>
                    <Text className='text-xl font-bold'>{description}</Text>
                    {/* <Text className='text-right p-1'>{updated_at}</Text> */}
                    {/* <Text className='text-right p-1'>{UserName}</Text>
                    <Avatar.Image size={50} source={UserProfileImage} /> */}
                </View>
            </BottomSheet>

        </GestureHandlerRootView>
    )
}

export default DetailPage