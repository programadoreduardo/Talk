import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { blurhash, getRoomId } from '../utils/common';
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ChatItem({ item, router, noBorder, currentUser }) {
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    console.log("ChatItem useEffect triggered");
    console.log("Current user ID:", currentUser?.userId);
    console.log("Item user ID:", item?.userId);

    if (!currentUser?.userId || !item?.userId) {
      console.log("Missing user IDs");
      return;
    }

    let roomId = getRoomId(currentUser.userId, item.userId);
    console.log("Room ID:", roomId);
    
    const docRef = doc(db, 'rooms', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(q, 
      (querySnapshot) => {
        let allMessages = querySnapshot.docs.map(doc => {
          console.log("Message doc:", doc.data());
          return doc.data();
        });
        setLastMessage(allMessages[0] ? allMessages[0] : null);
      },
      (error) => {
        console.error("Error in snapshot:", error);
        setLastMessage(null);
      }
    );

    return unsub;
  }, [currentUser?.userId, item?.userId]);

  const openChatRoom = () => {
    router.push({ pathname: '/chatRoom', params: item });
  };
const renderTime = () => {
  if (!lastMessage?.createdAt) return '';
  const date = lastMessage.createdAt.toDate();
  const diffInHours = (new Date() - date) / (1000 * 60 * 60);
  
  return diffInHours < 24 ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : diffInHours < 48 
      ? 'Ontem' 
      : date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
};

  const renderLastMessage = () => {
    console.log("Current user ID:", currentUser?.userId);
    console.log("Last message object:", lastMessage);
    
    if (lastMessage === null) return 'Diga olá ✋';
    if (!lastMessage) return 'Loading...';
    
    if (currentUser?.userId === lastMessage?.userId) {
      return 'Você: ' + lastMessage?.message;
    }
    return lastMessage?.message;
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