import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import defaultStyle from './style'

type Props = {
  value: number
  unit: string
  valueStyle?: object
  unitStyle?: object
  cardStyle?: object
}

const DigitalGauge = ({
  value,
  unit,
  valueStyle,
  unitStyle,
  cardStyle,
}: Props) => {
  return (
    <View style={{ ...defaultStyle.card, ...cardStyle }}>
      <Text
        style={{
          ...defaultStyle.value,
          ...valueStyle,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          ...defaultStyle.unit,
          ...unitStyle,
        }}
      >
        {unit}
      </Text>
    </View>
  )
}

DigitalGauge.defaultProps = {}

export default DigitalGauge
