import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Home() {
  const { logout, user } = useAuth()
  const handleLogout = async () => {
    await logout()
  }
  console.log('Users data: ', user)
  return (
  <View className='pt-20 flex-1 bg-white' >
    <Text>home</Text>
    <Button title=' Sair' onPress={handleLogout} />
  </View>
  )
}