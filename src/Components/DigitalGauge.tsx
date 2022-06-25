import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/Hooks'

type Props = {
  value: number
  unit: string
  height?: number | string
  width?: number | string
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center'
}

const DigitalGauge = ({ value, unit, height, width, mode }: Props) => {
  const { Layout, Images } = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 100,
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#000',
      }}
    >
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          textAlignVertical: 'center',
          alignSelf: 'center',
          fontSize: 20,
        }}
      >
        {value} : {unit}
      </Text>
    </View>
  )
}

DigitalGauge.defaultProps = {
  height: 200,
  width: 200,
  mode: 'contain',
}

export default DigitalGauge
