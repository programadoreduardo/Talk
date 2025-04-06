import { View, Text, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';

export default function Home() {
  const { logout, user } = useAuth()
  const [users, setUsers] = useState([1, 2, 3])
  useEffect(()=>{
    if(user?.uid)
      getUsers()
  },[])

  const getUsers = async ()=>{
    //fetch users
  }


  console.log("usuário:", user.username, "---","E-mail: ", user.email)

  return (
    <View className='flex-1 bg-white' >
      <StatusBar barStyle="light" />
      {
        users.length > 0 ? (
          <ChatList users={users}/>
        ) : (
          <View className="flex items-center" style={{ top: hp(30)}}>
            <ActivityIndicator size='large' />
          </View>
        )
      }

    </View >
  )
}