import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {blurhash} from '../utils/common'


export default function ChatItem({ item, router, noBorder }) {
  return (
    <View style={{ padding: 20, backgroundColor: '#eee', marginBottom: 10 }}>
      <TouchableOpacity className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-1 border-b ${noBorder ? '' : ' border-b border-b-neutral-200'} `}>
        {/*  <Image
          source={{uri:item?.profileUrl}}
          style={{ height: hp(6), width: hp(6) }}
          className="rounded-full"
        /> */}
        <Image
        style={{height: hp(6), width: hp(6), borderRadius: 100}}
        source={item?.profileUrl}
        placeholder={blurhash}
        transition={500}
        />

        <View className="flex-1 gap-1">
          <View className="flex-row justify-between">
            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-800">{item?.username}</Text>
            <Text style={{ fontSize: hp(1.5) }} className="font-medium text-neutral-500">Time</Text>
          </View>
          <Text style={{ fontSize: hp(1.4) }} className="font-medium text-neutral-500">Last message</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
