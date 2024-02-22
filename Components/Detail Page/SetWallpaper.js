import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import { MaterialIcons } from '@expo/vector-icons';

const SetWallpaper = ({ ImageUrl }) => {
    const callback = res => { console.log('Response: ', res); };
    const setWallpaper = () => {
        if (ImageUrl) {
            ManageWallpaper?.setWallpaper({ uri: ImageUrl, }, callback, TYPE.HOME,);
        }
    };

    return (
        <TouchableOpacity onPress={setWallpaper} className={` h-10 w-10 bg-slate-700 rounded-full flex items-center justify-center`}  >
            <MaterialIcons name="wallpaper" size={22} color="white" />
        </TouchableOpacity>
    )
}

export default SetWallpaper

const styles = StyleSheet.create({
    VIEW: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    BUTTON: {
        paddingHorizontal: 30,
        paddingVertical: 8,
        marginBottom: 24,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    TEXT: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        color: '#ffffff',
    },
});