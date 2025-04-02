import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/loading';
import { useAuth } from '../context/authContext';

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login} = useAuth()
 

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login', "Por favor preencha todos os campos")
      return;
    }
    setLoading(true)
    const response = await login(email, password)
    setLoading(false);
    console.log('sign in response: ', response)
    if(!response.success){
      Alert.alert('Login', response.msg)
      return 
    }
  }
  return (
    <View className='flex-1'>
      <StatusBar style='dark' />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className='flex-1 gap-12'>
        {/* SignIn image */}
        <View className="items-center">
          <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/login.jpg')} />
        </View>

        <View className='gap-10'>
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800"> Login</Text>
          {/* Inputs */}
          <View className='gap-4'>
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
            <View className='gap-3'>
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
              <Text style={{ fontSize: hp(1.8) }} className=' font-semibold text-right text-neutral-400'>Forgot password</Text>
            </View>
            {/*  Submit button */}
            <View>
              {
                loading ? (
                  <View className='flex-row justify-center'>
                    <Loading size={hp(10)} />
                  </View>
                ) : (
                  <TouchableOpacity onPress={handleLogin} style={{ height: hp(6.5) }} className='bg-blue-500 rounded-xl justify-center items-center'>
                    <Text style={{ fontSize: hp(2.7) }} className=' text-white font-bold tracking-wider'>Login
                    </Text>
                  </TouchableOpacity>
                )
              }
            </View>



            <View className='flex-row justify-center'>
              <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>Don't have an account?</Text>
              <Pressable onPress={() => router.push('signUp')}>
                <Text style={{ fontSize: hp(1.8) }} className='font-bold text-blue-500'> Sign Up</Text>
              </Pressable>
            </View>
          </View>

        </View>
      </View>
    </View >
  )
}