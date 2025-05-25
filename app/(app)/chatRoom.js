import { View, Text, StatusBar, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatRoomHeader from '../../components/chatRoomHeader';
import MessagesList from '../../components/MessagesList';
import { useAuth } from '../../context/authContext';
import { Feather } from '@expo/vector-icons';
import { addDoc, collection, doc, onSnapshot, setDoc, Timestamp, query, orderBy } from 'firebase/firestore';
import { getRoomId } from '../../utils/common';
import { db } from '../../firebaseConfig';

const ChatRoom = () => {
    const item = useLocalSearchParams();
    const { user } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();

        let roomId = getRoomId(user?.userId, item?.userId);
        console.log("ChatRoom roomId:", roomId);
        
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, 
            (querySnapshot) => {
                let allMessages = querySnapshot.docs.map(doc => {
                    console.log("ChatRoom message:", doc.data());
                    return doc.data();
                });
                setMessages([...allMessages]);
            },
            (error) => {
                console.error("ChatRoom snapshot error:", error);
            }
        );

        return unsub;
    }, []);

    const createRoomIfNotExists = async () => {
        try {
            console.log("Creating room with IDs:", user?.uid, item?.userId);
            
            if (!user?.uid || !item?.userId) {
                console.log("Missing user IDs - current user:", user?.uid, "other user:", item?.userId);
                return;
            }

            const roomId = getRoomId(user?.uid, item?.userId);
            console.log("Creating room with ID:", roomId);

            await setDoc(doc(db, 'rooms', roomId), {
                roomId,
                createdAt: Timestamp.fromDate(new Date()),
                participants: [user?.uid, item?.userId],
                participantNames: [user?.username, item?.username],
                lastUpdated: Timestamp.fromDate(new Date())
            }, { merge: true });
        } catch (error) {
            console.error("Error creating room:", error);
        }
    };

    const handleSendMessage = async () => {
        let text = messageText.trim();
        if (!text) return;
        
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef, 'messages');

            if (inputRef.current) inputRef.current.clear();

            await addDoc(messagesRef, {
                userId: user?.uid,
                message: text,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date()),
            });
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível enviar a mensagem');
            console.error("Send message error:", err);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'>
            <View className='flex-1 bg-white'>
                <StatusBar style='dark' />
                <ChatRoomHeader user={item} router={router} />
                <View className='h-3 border-b border-neutral-200' />

                <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
                    <View className='flex-1'>
                        <MessagesList messages={messages} currentUser={user} />
                    </View>
                    <View style={{ marginBottom: hp(2.7) }} className='pt-2'>
                        <View className='flex-row justify-between bg-white border mx-3 p-2 border-neutral-300 rounded-full pl-3 pr-2'>
                            <TextInput
                                ref={inputRef}
                                value={messageText}
                                onChangeText={setMessageText}
                                placeholder='Mensagem...'
                                multiline={true}
                                className='flex-1 mx-2'
                                style={{ fontSize: hp(1.6) }}
                            />
                            <TouchableOpacity
                                onPress={handleSendMessage}
                                className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                                <Feather name="send" size={hp(2.7)} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ChatRoom;