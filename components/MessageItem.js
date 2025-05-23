import { View, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export default function MessageItem({ message, currentUser }) {
    if (currentUser?.userId === message?.userId) {

        return (
            <View className="flex-row justify-end mb-3 mr-2">
                <View style={{ width: wp(80) }}>
                    <View className="flex self-end p-3 rounded-2xl bg-white boder border-neutral-200">
                        <Text style={{ fontSize: hp(1.9) }}>
                            {message?.message}
                        </Text>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View style={{ width: wp(80) }} className="mb-3 ml-3">
                <View className="flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border-indigo-200">
                    <Text style={{ fontSize: hp(1.9) }}>
                        {message?.message}
                    </Text>
                </View>
            </View>
        )
    }
}