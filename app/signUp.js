import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/loading';
import { useAuth } from '../context/authContext';


export default function SignUp() {
  const router = useRouter()
  const {register} = useAuth()
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [profile, setProfile] = useState("")

  const handleRegister = async () => {
    if (!email || !password || !username || !profile) {
      Alert.alert('Sign Up', "Please fill all the fields!")
      return;
    }
    setLoading(true)

    let response = await register(email, password, username, profile)
    setLoading(false)

    console.log('got result: ', response)
    if(!response.success){
      Alert.alert('Sign Up', response.msg)
      
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView
      contentContainerStyle={{flexGrow:1}}
      keyboardShouldPersistTaps='handled'
      >
        <StatusBar style='dark' />
        <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className='flex-1 gap-12'>
          {/* SignIn image */}
          <View className="items-center">
            <Image style={{ height: hp(30) }} resizeMode='contain' source={require('../assets/images/signUp.jpg')} />
          </View>

          <View className='gap-10'>
            <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800"> Sign Up</Text>
            {/* Inputs */}
            <View className='gap-4'>
              <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 items-center rounded-2xl'>
                <Feather name='user' size={hp(2.7)} color='gray' />
                <TextInput
                  onChangeText={setUsername}
                  value={username}
                  style={{ fontSize: hp(2) }}
                  className=' flex-1 font-semibold text-neutral-700'
                  placeholder='Username' />
              </View>
              <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 items-center rounded-2xl'>
                <Octicons name='mail' size={hp(2.7)} color='gray' />
                <TextInput
                  onChangeText={setEmail}
                  value={email}
                  style={{ fontSize: hp(2) }}
                  className=' flex-1 font-semibold text-neutral-700'
                  placeholder='Email address'
                  keyboardType='email-address' />
              </View>
              <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 items-center rounded-2xl'>
                <Octicons name='lock' size={hp(2.7)} color='gray' />
                <TextInput
                  onChangeText={setPassword}
                  value={password}
                  style={{ fontSize: hp(2) }}
                  className=' flex-1 font-semibold text-neutral-700'
                  placeholder='Password'
                  secureTextEntry />
              </View>
              <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 items-center rounded-2xl'>
                <Feather name='image' size={hp(2.7)} color='gray' />
                <TextInput
                  onChangeText={setProfile}
                  value={profile}
                  style={{ fontSize: hp(2) }}
                  className=' flex-1 font-semibold text-neutral-700'
                  placeholder='Profile url' />
              </View>

              {/*  Submit button */}
              <View>
                {
                  loading ? (
                    <View className='flex-row justify-center'>
                      <Loading size={hp(10)} />
                    </View>
                  ) : (
                    <TouchableOpacity onPress={handleRegister} style={{ height: hp(6.5) }} className='bg-blue-500 rounded-xl justify-center items-center'>
                      <Text style={{ fontSize: hp(2.7) }} className=' text-white font-bold tracking-wider'>Sign Up
                      </Text>
                    </TouchableOpacity>
                  )
                }
              </View>



              <View className='flex-row justify-center'>
                <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>Already have an account?</Text>
                <Pressable onPress={() => router.push('signIn')}>
                  <Text style={{ fontSize: hp(1.8) }} className='font-bold text-blue-500'> Sign In</Text>
                </Pressable>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}