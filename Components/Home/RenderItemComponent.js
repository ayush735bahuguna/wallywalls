import { memo } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import Animated from "react-native-reanimated";
import Vibrate from "../Vibrate";

const renderItemComponent = ({ item, index, navigation, numColumns, screenWidth }) => {

    return <View
        className={`${numColumns === 1 ? 'w-full' : 'w-1/2'}rounded-md`}
    >
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
                })
                Vibrate();
            }}
        >
            <Animated.Image
                source={{ uri: item?.urls?.small }}
                className={`rounded-md`}
                width={numColumns === 1 ? (screenWidth - 4) : (screenWidth / 2) - 4}
                height={200}
                style={{ margin: 2 }}
                sharedTransitionTag={`${index}Image`}
            />
        </TouchableWithoutFeedback>
    </View>
};

export default memo(renderItemComponent);