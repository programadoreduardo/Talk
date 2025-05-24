import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { blurhash, getRoomId } from '../utils/common'
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";


export default function ChatItem({ item, router, noBorder, currentUser }) {
  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, 'rooms', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    let unsub = onSnapshot(q, (querySnapshot) => {
      let allMessages = querySnapshot.docs.map(doc => doc.data());
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unsub;
  }, []);

  const openChatRoom = () => {
    router.push({ pathname: '/chatRoom', params: item });
  };

  const renderTime = () => {
    return ''; // implemente a lógica ou retorne vazio por enquanto
  };

  const renderLastMessage = () => {
    if (typeof lastMessage == 'undefined') return 'Loading...';
    if (lastMessage){
      if (currentUser?.userId == lastMessage?.userId) return 'Você: ' + lastMessage?.message;
      return lastMessage?.message;
    } else {
      return 'Diga olá ✋';
    }
  };

 
  return (
    <View style={{ padding: 20, backgroundColor: '#eee', marginBottom: 10 }}>
      <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-1 border-b ${noBorder ? '' : ' border-b border-b-neutral-200'} `}>
        <Image
          style={{ height: hp(10), width: hp(9), borderRadius: 100 }}
          source={item?.profileUrl}
          placeholder={blurhash}
          transition={500}
        />
        <View className="flex-1 gap-1">
          <View className="flex-row justify-between">
            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-800">{item?.username}</Text>
            <Text style={{ fontSize: hp(1.5) }} className="font-medium text-neutral-500">
              {renderTime()}
            </Text>
          </View>
          <Text style={{ fontSize: hp(1.4) }} className="font-medium text-neutral-500">
            {renderLastMessage()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
