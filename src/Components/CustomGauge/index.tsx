import * as React from 'react'
import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import Svg, {
  G,
  Circle,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export default function CustomGauge({
  radius = 100,
  strokeWidth = 10,
  percentage = 0,
}) {
  const center = radius / 2
  const circleRef = React.useRef()
  const innerRadius = radius - strokeWidth
  const circumference = innerRadius * 2 * Math.PI

  const arc = circumference * 0.5
  const dashArray = `${arc} ${circumference}`
  const transform = `rotate(180, ${radius}, ${radius})`

  const offsetP = arc - (percentage / 100) * arc
  const rotation = percentage * 1.8
  return (
    <View style={{ width: 300, height: 300 }}>
      <Svg height="300" width="300">
        <G>
          <Circle
            cx={radius}
            cy={radius}
            r={innerRadius}
            fill="transparent"
            stroke="gray"
            strokeWidth={10}
            strokeDasharray={dashArray}
            transform={transform}
            strokeLinecap="round"
          />
          <Circle
            ref={circleRef}
            cx={radius}
            cy={radius}
            r={innerRadius}
            fill="transparent"
            stroke="red"
            strokeWidth={10}
            strokeDasharray={dashArray}
            strokeDashoffset={offsetP}
            transform={transform}
            strokeLinecap="round"
            strokeOpacity=".9"
          />
        </G>

        <G transform={`rotate(${rotation} 100 100)`}>
          <G>
            <Circle cx={radius} cy={radius} r="10" fill="#000" />
            <Path
              d={`M ${radius - 3} ${radius + 3} L ${radius / 5} ${radius} L ${
                radius + 3
              } ${radius - 3} z`}
              fill="#000"
              stroke="#111"
            />
            <Path
              d={`M ${radius} ${radius - 2} L ${radius + 30} ${radius - 2} L ${
                radius + 30
              } ${radius + 2} L ${radius} ${radius + 2} z`}
              fill="#000"
              stroke="#111"
            />
            <Circle cx={radius + 30} cy={radius} r="7" fill="#000" />
            <Circle cx={radius + 30} cy={radius} r="3.5" fill="#fff" />
            <Circle cx={radius} cy={radius} r="4" stroke="#999" fill="#ccc" />
          </G>
        </G>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
})
