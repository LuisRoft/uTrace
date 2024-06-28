import { View, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Index() {
  return (
    <View className='flex w-full h-full justify-center items-center'>
      <ActivityIndicator size='large' color='gray' />
    </View>
  )
}


