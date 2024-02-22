import React from 'react'
import HeaderWithDrawerIcon from '../Components/Home/HeaderWithDrawerIcon'
import { StatusBar, View } from 'react-native'

const Settings = ({ navigation }) => {
    return (
        <View className='p-3' style={{ marginTop: StatusBar.currentHeight }}>
            <HeaderWithDrawerIcon name='Setting' navigation={navigation} />
        </View>
    )
}

export default Settings