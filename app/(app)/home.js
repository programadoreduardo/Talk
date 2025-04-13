import { View, Text, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';

export default function Home() {
  const { logout, user } = useAuth()
  const [users, setUsers] = useState([1,2,3,4,5,6,7,8,9,10,11])
  useEffect(() => {
    if (user?.uid)
      getUsers()
  }, [])

  const getUsers = async () => {
    //fetch users
    const q = query(usersRef, where('userId', '!=', user?.uid))

    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach(doc => {
      data.push(...doc.data)
    })
    setUsers(data)
    console.log("got users: ", data)
  }


  

  return (
    <View className='flex-1 bg-white' >
      <StatusBar barStyle="light" />
      {
        users.length > 0 ? (
          <ChatList users={users} />
        ) : (
          <View className="flex items-center" style={{ top: hp(30) }}>
            <ActivityIndicator size='large' />
          </View>
        )
      }

    </View >
  )
}