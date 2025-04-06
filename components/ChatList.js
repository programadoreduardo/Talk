import { FlatList, View } from 'react-native';
import ChatItem from './ChatItem';

export default function ChatList({ users }) {
    return (
        <View style={{flex:1}}>
            <FlatList
                data={users}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 25 }}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => <ChatItem item={item} index={index} />}
            />
        </View>
    );
}