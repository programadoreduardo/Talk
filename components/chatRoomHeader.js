import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';

// Corrigindo: o certo é receber { user, router } como props
export default function ChatRoomHeader({ user, router }) {

  const HeaderLeft = () => (
    <View className="flex-row items-center gap-4">
      <TouchableOpacity onPress={() => router.back()}>
        <Entypo name="chevron-left" size={hp(4)} color="#737373" />
      </TouchableOpacity>
      <View className="flex-row items-center gap-3">
        <Image
          source={user?.profileUrl}
          className="rounded-full"
          style={{ height: hp(4.5), aspectRatio: 1 }}
        />
        <Text className="text-neutral-500 font-medium" style={{ fontSize: hp(2.5) }}>
          {user?.username}
        </Text>
      </View>
    </View>
  );

  const HeaderRight = () => (
    <View className="flex-row items-center gap-8">
      <Ionicons name="call" size={hp(2.8)} color="#737373" />
      <Ionicons name="videocam" size={hp(2.8)} color="#737373" />
    </View>
  );

  return (
    <Stack.Screen
      options={{
        title: '',
        headerShadowVisible: false,
        headerLeft: HeaderLeft,
        headerRight: HeaderRight,
      }}
    />
  );
}
