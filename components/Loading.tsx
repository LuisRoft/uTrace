import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


export function Loading({size} : any) {
  return (
    <View style={{height: size, aspectRatio: 2}}>
      <LottieView source={require('@/assets/animations/loading.json')} autoPlay loop style={{flex:1}}/>
    </View>
  )
}