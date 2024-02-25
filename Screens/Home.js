import { View, Text, FlatList, StatusBar, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useInfiniteQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import FilterComponent from '../Components/Home/FilterComponent';
import { ActivityIndicator } from 'react-native-paper';
import RenderItemComponent from '../Components/Home/RenderItemComponent';
import Vibrate from '../Components/Vibrate';
import UserModel from '../Components/Home/UserModel';
import HeaderWithDrawerIcon from '../Components/Home/HeaderWithDrawerIcon'
import { withTheme } from 'react-native-paper';

const Home = ({ navigation, theme }) => {
    // console.log(theme);
    const AccessKey = process.env.ACCESS_KEY;
    const queryClient = useQueryClient();
    const orientation = 'portrait';
    const [Data, setData] = React.useState([]);
    const [UserObject, setUserObject] = React.useState([]);
    const [Sort, setSort] = React.useState('popular');
    const [numColumns, setnumColumns] = React.useState(2);
    const screenWidth = Dimensions.get("window").width;
    const [visible, setVisible] = React.useState(false);
    const flatListRef = useRef(null);

    const fetchImages = async ({ pageParam = 1 }) => {
        try {
            const { data, headers } = await axios.get(`https://api.unsplash.com/photos?client_id=${AccessKey}&page=${pageParam}&per_page=10&order_by=${Sort}&orientation=${orientation}`)

            // console.log(headers.get('x-ratelimit-remaining'));
            return data
        } catch (error) {
            console.log(error, 'error');
            return error
        }
    }

    const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
        queryKey: ['Images', Sort],
        queryFn: fetchImages,
        getNextPageParam(lastpage, allpages) {
            if (lastpage?.length === 0) return undefined
            return allpages?.length + 1
        }
    })

    useEffect(() => { setData(data) }, [data])

    const header = () => {
        return (
            <View className='p-3 pb-0'>
                <HeaderWithDrawerIcon name='Home' navigation={navigation} />

                <TouchableOpacity onPress={() => { navigation.navigate('Search', { query: null }); Vibrate() }} className='bg-slate-200 rounded-xl flex flex-row items-center justify-start p-2 mt-4'>
                    <AntDesign className='m-2' name="search1" size={24} color="black" />
                    <Text className='m-2'>Search photos...</Text>
                </TouchableOpacity>

                <View className='flex items-center justify-between flex-row my-4'>
                    <FilterComponent setSort={setSort} Sort={Sort} />
                    <View className='flex gap-2 flex-row'>
                        <View className={`${numColumns === 1 && 'bg-slate-200'} rounded-full p-2`}>
                            <MaterialCommunityIcons name="format-list-text" size={24} color="black"
                                onPress={() => { setnumColumns(1); Vibrate() }} />
                        </View>
                        <View className={`${numColumns === 2 && 'bg-slate-200'} rounded-full p-2`}>
                            <Ionicons name="grid-outline" size={24} color="black" onPress={() => { setnumColumns(2); Vibrate() }} />
                        </View>
                    </View>
                </View>

                <UserModel visible={visible} setVisible={setVisible} UserObject={UserObject} />
            </View >
        );
    };

    return (
        <View className='relative h-full'>
            <TouchableOpacity className='absolute bottom-4 right-4 bg-black p-2 z-30 rounded-full'
                onPress={() => {
                    Vibrate();
                    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
                }}>
                <AntDesign name="arrowup" size={26} color="white" />
            </TouchableOpacity>
            <FlatList
                // stickyHeaderHiddenOnScroll={true}
                // stickyHeaderIndices={[0]}
                ref={flatListRef}
                ListHeaderComponent={header}
                contentContainerStyle={{ paddingTop: StatusBar.currentHeight, backgroundColor: 'white' }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                key={numColumns}
                numColumns={numColumns}
                data={Data?.pages?.map(page => page).flat()}
                refreshing={isLoading}
                onEndReachedThreshold={0}
                onEndReached={() => {
                    Vibrate()
                    if (hasNextPage && !isLoading && !isFetching && !isFetchingNextPage) { fetchNextPage() }
                }}
                onRefresh={() => { queryClient.invalidateQueries(['Images']) }}
                renderItem={({ item, index }) => <RenderItemComponent item={item} index={index} navigation={navigation} numColumns={numColumns} screenWidth={screenWidth} setVisible={setVisible} setUserObject={setUserObject} showfooter={true} />}
                ListFooterComponent={isFetchingNextPage ?
                    <View className='flex items-center justify-center flex-row'>
                        <ActivityIndicator animating={true} />
                        <View className='p-4'>
                            <Text>Loading more image</Text>
                        </View>
                    </View>
                    : null}
                keyExtractor={item => item?.id}
            />
        </View>
    )
}

export default withTheme(Home)