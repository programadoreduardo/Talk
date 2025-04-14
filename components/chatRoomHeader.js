import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';

export default function ChatRoomHeader(user, router) {
    return (
        <Stack.Screen
            options={{
                title: '',
                headerShadowVisible: false,
                headerLeft: () => {
                    <View className='flex-row items-center  gap-4'>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Entypo name='chevron-left' size={hp(4)} color="#737373" />
                        </TouchableOpacity>
                        <View className='flex-row items-center gap-3'>
                            <Image
                                source={user?.profileUrl}
                                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                            />
                        </View>
                    </View>
                }
            }}
        />
    )
}