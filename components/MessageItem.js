import { View, Text } from "react-native";


export default function MessageItem({ message, currentUser }) {
    const isCurrentUser = currentUser?.userId === message?.userId;

    return (
        <View style={{ 
            alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
            backgroundColor: isCurrentUser ? '#DCF8C6' : '#ECECEC',
            padding: 10,
            borderRadius: 10,
            marginVertical: 5,
            maxWidth: '80%',
        }}>
            <Text>{message?.message}</Text>
        </View>
    );
}