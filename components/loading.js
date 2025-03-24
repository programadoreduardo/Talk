import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

export default function Loading({size}) {
    return (
        <View style={{height: size, aspectRatio: 1}}>
            <LottieView style={{flex:1}} source={require('../assets/images/Animation - 1742766264248.json')} autoPlay loop />
        </View>
    );
}