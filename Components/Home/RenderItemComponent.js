import { memo } from "react";
import { TouchableWithoutFeedback, View, Text, TouchableOpacity, Linking, } from "react-native";
import Vibrate from "../Vibrate";
import { Entypo } from '@expo/vector-icons';
import { Image } from "expo-image";

const renderItemComponent = ({ item, index, navigation, numColumns, screenWidth, setVisible, setUserObject }) => {
    // console.log(item?.color);
    return <View className={`${numColumns === 1 ? 'w-full' : 'w-1/2'}rounded-md`}>
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('DetailPage', {
                    index: index,
                    URL: item?.urls?.raw,
                    width: item?.width, height: item?.height,
                    description: item?.description,
                    updated_at: item?.updated_at,
                    UserName: item?.user?.first_name,
                    UserBio: item?.user?.bio,
                    UserProfileImage: item?.user.profile_image?.small,
                    UserPortfolio: item?.user.social?.portfolio_url,
                    UserTotalPhotos: item?.user?.total_photos,
                    ImageId: item?.id,
                    BlueHash: item?.blur_hash,
                    Color: item?.color
                })
                Vibrate();
            }}
        >
            <View>
                <Image
                    source={{ uri: item?.urls?.small }}
                    className={`rounded-md`}
                    placeholder={item?.blur_hash}
                    width={numColumns === 1 ? (screenWidth - 4) : (screenWidth / 2) - 4}
                    height={numColumns === 1 ? 200 : 270}
                    style={{ margin: 2 }}
                    sharedTransitionTag={`${index}Image`}
                />
                <TouchableOpacity onPress={() => {
                    setVisible(true)
                    Vibrate();
                    setUserObject(item?.user)
                }} className='flex flex-row justify-between items-center p-2'>
                    <View className='flex items-center justify-center flex-row gap-1'>
                        <Entypo name="heart" size={20} color="red" />
                        <Text>{item?.likes}</Text>
                    </View>
                    <Entypo name="dots-three-horizontal" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    </View>
};

export default memo(renderItemComponent);