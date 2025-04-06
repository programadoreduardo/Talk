import { View, Text, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItem';
import { Feather, MaterialIcons } from '@expo/vector-icons';
const ios = Platform.OS == 'ios'


export default function HomeHeader() {
    const { top } = useSafeAreaInsets()
    const { user, logout } = useAuth()
    const handleProfile = () => {

    }
    const handleLogout = async () => {
        return(
            await logout()
        )
    }

    return (
        <View style={{ paddingTop: ios ? top : top + 10 }} className='flex-row justify-between px-5 bg-blue-500 pb-6 rounded-b-3xl'>
            <Text style={{ fontSize: hp(3) }} className='font-medium text-white ' > Chats </Text>

            <View>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {
                            /*trigger wrapper style*/
                        }
                    }}>
                        <Image
                            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                            source={user?.profileUrl}
                            placeholder={{ blurhash }}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions
                    customStyles={{
                        optionsContainer:{
                            borderRadius:10,
                            borderCurve:'continuousss',
                            marginTop: 35,
                            marginLeft: -10,
                            backgroundColor: 'white',
                          
                        }
                    }}
                    >
                        <MenuItem
                            text="Perfil"
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color="#737373" />}
                        />
                        <Divider />
                        <MenuItem
                            text="Sair"
                            action={handleLogout}
                            value={null}
                            icon={<MaterialIcons name='logout' size={hp(2.5)} color="#737373" />}
                        />
                    </MenuOptions>
                </Menu>

            </View>
        </View >
    )
}

const Divider = () => {
    return (
        <View className='p-[1px] w-full bg-neutral-200' />
    )
}