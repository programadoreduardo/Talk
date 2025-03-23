import { View, Text, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SignIn() {
  const router = useRouter()
  return (
    <View className='flex-1'>
      <StatusBar style='dark' />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className='flex-1 gap-12'>
        {/* SignIn image */}
        <View className="items-center">
          <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/login.jpg')} />
        </View>

        <View className='gap-10'>
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800"> Sign In</Text>
          {/* Inputs */}
          <View className='gap-4'>
            <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 items-center rounded-2xl'>
              <Octicons name='mail' size={hp(2.7)} color='gray' />
              <TextInput
                style={{ fontSize: hp(2) }}
                className=' flex-1 font-semibold text-neutral-700'
                placeholder='Email address' />
            </View>
            <View className='gap-3'>
              <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 items-center rounded-2xl'>
                <Octicons name='lock' size={hp(2.7)} color='gray' />
                <TextInput
                  style={{ fontSize: hp(2) }}
                  className=' flex-1 font-semibold text-neutral-700'
                  placeholder='Password' />
              </View>
              <Text style={{ fontSize: hp(1.8) }} className=' font-semibold text-right text-neutral-400'>Forgot password</Text>
            </View>
            {/*  Submit button */}
            <TouchableOpacity style={{ height: hp(6.5) }} className='bg-indigo-500 rounded-xl justify-center items-center'>
              <Text style={{ fontSize: hp(2.7) }} className=' text-white font-bold tracking-wider'>Sign In</Text>
            </TouchableOpacity>

            <View className='flex-row justify-center'>
              <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>Don't have an account?</Text>
              <Pressable onPress={()=> router.push('signUp')}>
                <Text style={{ fontSize: hp(1.8) }} className='font-bold text-indigo-500'> Sign Up</Text>
              </Pressable>
            </View>
          </View>

        </View>
      </View>
    </View>
  )
}