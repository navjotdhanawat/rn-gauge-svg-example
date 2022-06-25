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
} from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export default function Donut({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
}) {
  const inputRef = React.useRef()

  const innerRadius = radius - strokeWidth
  const circumference = innerRadius * 2 * Math.PI
  const arc = circumference * 0.65
  const dashArray = `${arc} ${circumference}`
  const transform = `rotate(150, ${radius}, ${radius})`

  const offsetP = arc - (80 / 100) * arc

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg height="100" width="100">
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
        {/* <AnimatedCircle
          stroke="url(#grad)"
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={offset}
          strokeWidth={10}
        /> */}
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2, color: '#000' },
          styles.text,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
})
