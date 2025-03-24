import { KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native'

export default function CustomView({ children }) {
    return (
        <KeyboardAvoidingView
            behavior={ios ? 'padding' : 'height'}
            style={{ flex: 1 }}
            >
            <ScrollView
                style={{ flex: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {
                    children
                }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}