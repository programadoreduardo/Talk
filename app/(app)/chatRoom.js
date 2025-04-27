import { View, Text, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image'
import ChatRoomHeader from '../../components/chatRoomHeader';
import MessagesList from '../../components/MessagesList';
import { Feather } from '@expo/vector-icons';

export default function ChatRoom() {
    const item = useLocalSearchParams()
    const router = useRouter()
    const [messages, setMessages] = useState([])
    console.log('Pegando os dados do item: ', item)
    return (
        <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'>
            <View className='flex-1 bg-white flex-row'>
                <StatusBar style='dark' />
                <ChatRoomHeader user={item} router={router} />
                <View className='h-3 border-b border-neutral-200' />

                <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
                    <View className='flex-1'>
                        <MessagesList messages={messages} />
                    </View>
                    <View style={{ marginBottom: hp(2.7) }} className='pt-2'>
                        <View className='flex-row justify-between bg-white border mx-3 p-2 border-neutral-300 rounded-full pl-3 pr-2'>
                            <TextInput
                                placeholder='Mensagem...'
                                multiline={true}
                                className='flex-1 mx-2'
                                style={{ fontSize: hp(1.6) }} />
                            <TouchableOpacity className=' bg-neutral-200 p-2 mr-[1px] rounded-full'>
                                <Feather name="send" size={hp(2.7)} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </View >
        </ScrollView>
    )
}