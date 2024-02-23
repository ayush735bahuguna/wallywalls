import { View, Text, Image, FlatList, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
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

const Home = ({ route, navigation }) => {
    const AccessKey = process.env.ACCESS_KEY;
    const queryClient = useQueryClient();
    const orientation = 'portrait';
    const [Data, setData] = React.useState([]);
    const [UserObject, setUserObject] = React.useState([]);
    const [Sort, setSort] = React.useState('popular');
    const [numColumns, setnumColumns] = React.useState(2);
    var pageNo = 1;
    const screenWidth = Dimensions.get("window").width;
    const [visible, setVisible] = React.useState(false);

    const fetchImages = async ({ pageParam = 1 }) => {
        const { data } = await axios.get(`https://api.unsplash.com/photos?client_id=${AccessKey}&page=${pageParam}&per_page=10&order_by=${Sort}&orientation=${orientation}`)
        return data
    }

    const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
        queryKey: ['Images', Sort],
        queryFn: fetchImages,
        getNextPageParam(lastpage, allpages) {
            if (lastpage.length === 0) return undefined
            return allpages.length + 1
        }
    })
    useEffect(() => { setData(data) }, [data])

    return (
        <FlatList
            contentContainerStyle={{ backgroundColor: 'white' }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            key={numColumns}
            numColumns={numColumns}
            data={Data?.pages?.map(page => page).flat()}
            refreshing={isLoading}
            onEndReachedThreshold={0}
            onStartReached={() => { Vibrate() }}
            onEndReached={() => {
                Vibrate()
                if (hasNextPage && !isLoading && !isFetching && !isFetchingNextPage) { fetchNextPage() }
            }}
            onRefresh={() => { queryClient.invalidateQueries(['Images']) }}
            ListHeaderComponent={
                <View className='p-3 pb-0' style={{ marginTop: StatusBar.currentHeight }}>

                    <HeaderWithDrawerIcon name='Home' navigation={navigation} />

                    <TouchableOpacity onPress={() => { navigation.navigate('Search', { query: null }); Vibrate() }} className='bg-slate-200 rounded-xl flex flex-row items-center justify-start p-2 mt-7'>
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
                                <Ionicons name="grid-outline" size={24} color="black"
                                    onPress={() => { setnumColumns(2); Vibrate() }} />
                            </View>
                        </View>
                    </View>

                    <UserModel visible={visible} setVisible={setVisible} UserObject={UserObject} />
                </View >
            }
            renderItem={({ item, index }) => <RenderItemComponent item={item} index={index} navigation={navigation} numColumns={numColumns} screenWidth={screenWidth} setVisible={setVisible} setUserObject={setUserObject} />}
            ListFooterComponent={isFetchingNextPage ?
                <View className='flex items-center justify-center flex-row'>
                    <ActivityIndicator animating={true} />
                    <View className='p-4'>
                        <Text>Loading more image</Text>
                    </View>
                </View>
                : null}
            keyExtractor={item => item.id}
        />
    )
}

export default Home