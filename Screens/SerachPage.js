import { View, Text, ScrollView, Dimensions, FlatList, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator, Searchbar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import Vibrate from '../Components/Vibrate';
import UserModel from '../Components/Home/UserModel';
import RenderItemComponent from '../Components/Home/RenderItemComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SerachPage = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [Query, setQuery] = React.useState(null);
    const AccessKey = process.env.ACCESS_KEY;
    const queryClient = useQueryClient();
    const orientation = 'portrait';
    const [Data, setData] = React.useState([]);
    const [UserObject, setUserObject] = React.useState([]);
    const [Sort, setSort] = React.useState('popular');
    const [numColumns, setnumColumns] = React.useState(2);
    const screenWidth = Dimensions.get("window").width;
    const [visible, setVisible] = React.useState(false);


    const fetchImages = async ({ pageParam = 1 }) => {
        if (Query) {
            const { data } = await axios.get(`https://api.unsplash.com/search/photos?client_id=${AccessKey}&query=${Query}&page=${pageParam}&per_page=10&order_by=${Sort}&orientation=${orientation}`)
            return data
        }
    }

    const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
        queryKey: ['SearchImages', Sort, Query],
        queryFn: fetchImages,
        getNextPageParam(lastpage, allpages) {
            if (lastpage?.length === 0) return undefined
            return allpages?.length + 1
        }
    })

    useEffect(() => {
        setData(data)
    }, [data])

    return (
        <FlatList
            contentContainerStyle={{ backgroundColor: 'white' }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            key={numColumns}
            numColumns={numColumns}
            data={Data?.pages?.map(page => page?.results).flat()}
            refreshing={isLoading}
            onEndReachedThreshold={0}
            onStartReached={() => { Vibrate() }}
            onEndReached={() => {
                Vibrate()
                if ((Data?.pages?.map(page => page?.results).flat())?.length !== 0) {
                    if (hasNextPage && !isLoading && !isFetching && !isFetchingNextPage) { fetchNextPage() }
                }
            }}
            onRefresh={() => {
                setData([])
                queryClient.invalidateQueries(['SearchImages'])
            }}
            ListHeaderComponent={
                <View className='p-3' style={{ marginTop: StatusBar.currentHeight }}>
                    <Searchbar
                        placeholder="Search photos..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        autoFocus={true}
                        onSubmitEditing={() => {
                            setData([])
                            setQuery(searchQuery)
                            queryClient.invalidateQueries(['SearchImages'])
                        }}
                    />
                    {(Data?.pages?.map(page => page?.results).flat())?.length === 0 ?
                        <View>
                            <Text className='p-5 text-center text-xl'>Oops! No results</Text>
                        </View>
                        :
                        <>
                            {Query &&
                                <>
                                    <View className='flex items-center justify-between flex-row my-4'>
                                        <View></View>
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
                                </>
                            }
                        </>}
                </View >
            }

            renderItem={({ item, index }) => {
                if (item) {
                    return <RenderItemComponent item={item} index={index} navigation={navigation} numColumns={numColumns} screenWidth={screenWidth} setVisible={setVisible} setUserObject={setUserObject} />
                } else {
                    return null
                }
            }}

            ListFooterComponent={isFetchingNextPage ?
                <View className='flex items-center justify-center flex-row'>
                    <ActivityIndicator animating={true} />
                    <View className='p-4'>
                        <Text>Loading more image</Text>
                    </View>
                </View>
                : null}
            keyExtractor={(item, index) => {
                return (index + `${item?.id}`)
            }}
        />
    )
}

export default SerachPage