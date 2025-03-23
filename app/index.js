import { View} from 'react-native'
import React from 'react'
import '../global.css';
import { ActivityIndicator } from 'react-native';

export default function StartPage() {
  return (
    <View className="flex-1 justify-center items-center" >
      <ActivityIndicator size="large" color="gray"/>
    </View>
  )
}