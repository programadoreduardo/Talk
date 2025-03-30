import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Home() {
  const { logout } = useAuth()
  const handleLogout = async () => {
    await logout()
  }

  return (
  <View className='pt-20'>
    <Text>home</Text>
    <Button title=' Sair' onPress={handleLogout} />
  </View>
  )
}