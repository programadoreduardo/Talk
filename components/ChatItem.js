import { Text, View } from "react-native";

export default function ChatItem({ item }) {
    return (
      <View style={{ padding: 20, backgroundColor: '#eee', marginBottom: 10 }}>
        <Text>{item}</Text>
      </View>
    );
  }
  