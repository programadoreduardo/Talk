import { View, Text, ScrollView } from 'react-native'

import MessageItem from './MessageItem'


export default function MessagesList({messages, currentUser}) {
  // const [messages, setMessages] = useState([]) // Lista de mensagens
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: 10 }}>
      {
        messages.map((message, index)=>{
          return(
            <MessageItem message={message} key={index} currentUser={currentUser}/>
          )
        }

        )
      }
    </ScrollView>
  )
}