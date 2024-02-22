import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import Vibrate from '../Vibrate';

const HeaderWithDrawerIcon = ({ name, navigation }) => {
    return (
        <View>
            <View className='flex items-start justify-start flex-row gap-3'>
                <TouchableOpacity onPress={() => {
                    Vibrate();
                    navigation?.dispatch(DrawerActions.openDrawer())
                }}>
                    <View className=' bg-slate-300 rounded-xl w-[40px] h-[40px] flex items-center justify-center'>
                        <Entypo name="menu" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <Text className='text-4xl text-slate-600 font-bold'>{name}</Text>
            </View>
        </View>
    )
}

export default HeaderWithDrawerIcon