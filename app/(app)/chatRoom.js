import { View, Text, StatusBar, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatRoomHeader from '../../components/chatRoomHeader';
import MessagesList from '../../components/MessagesList';
import { useAuth } from '../../context/authContext';
import { Feather } from '@expo/vector-icons';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { getRoomId } from '../../utils/common';
import { db } from '../../firebaseConfig';

const ChatRoom = () => {
    const item = useLocalSearchParams()
    const { user } = useAuth();
    const router = useRouter()
    const [messages, setMessages] = useState([]) // Lista de mensagens
    const [messageText, setMessageText] = useState('') // Mensagem atual sendo digitada

    useEffect(() => {
        createRoomIfNotExists()
    }, [])

    const createRoomIfNotExists = async () => {
        try {
            if (!user?.uid || !item?.userId) {
                console.log("Missing user IDs - current user:", user?.uid, "other user:", item?.userId);
                return;
            }

            const roomId = getRoomId(user?.uid, item?.userId);
            
            await setDoc(doc(db, 'rooms', roomId), {
                roomId,
                createdAt: Timestamp.fromDate(new Date()),
                participants: [user?.uid, item?.userId],
                participantNames: [user?.username, item?.username],
                lastUpdated: Timestamp.fromDate(new Date())
            }, { merge: true }); // Usamos merge: true para não sobrescrever mensagens existentes

        } catch (error) {
            console.error("Error creating room:", error);
        }
    }

    const handleSendMessage = async () => {
        const text = messageText.trim()
        if (!text || !user?.uid || !item?.userId) return
        
        try {
            const roomId = getRoomId(user?.uid, item?.userId)
            const messagesRef = collection(db, 'rooms', roomId, 'messages')
            
            await addDoc(messagesRef, {
                userId: user?.uid,
                text: text,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            })
            
            // Atualiza a última mensagem na sala
            await setDoc(doc(db, 'rooms', roomId), {
                lastMessage: text,
                lastUpdated: Timestamp.fromDate(new Date())
            }, { merge: true })
            
            setMessageText('') // Limpa o input após enviar
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível enviar a mensagem')
            console.error("Send message error:", err)
        }
    }

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
                        <MessagesList messages={messages} currentUserId={user?.uid} />
                    </View>
                    <View style={{ marginBottom: hp(2.7) }} className='pt-2'>
                        <View className='flex-row justify-between bg-white border mx-3 p-2 border-neutral-300 rounded-full pl-3 pr-2'>
                            <TextInput
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
    )
}

export default ChatRoom