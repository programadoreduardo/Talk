import { FlatList, View } from 'react-native';
import ChatItem from './ChatItem';
import { useRouter } from 'expo-router';

export default function ChatList({ users, currentUser }) {
    const router = useRouter();
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={users}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 25 }}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <ChatItem
                        noBorder={index + 1 == users.length}
                        router={router}
                        currentUser={currentUser}
                        item={item}
                        index={index}
                    />
                )}
            />
        </View>
    );
}