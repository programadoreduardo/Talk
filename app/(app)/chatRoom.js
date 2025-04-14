import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image'
import ChatRoomHeader from '../../components/chatRoomHeader';

export default function ChatRoom() {
    const item = useLocalSearchParams()
    const router = useRouter()
    console.log('Pegando os dados do item: ', item)
    return (
        <View className='flex-1 bg-white'>
            <StatusBar style='dark' />
            <ChatRoomHeader user={item} router={router} />
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{item?.username}</Text>
            <Image style={{ height: hp(60), width: hp(60), borderRadius: 100 }} source={item?.profileUrl} />
        </View>
    )
}