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
  duration = 1000,
  max = 10,
}) {
  const animated = React.useRef(new Animated.Value(0)).current
  const circleRef = React.useRef()
  const inputRef = React.useRef()
  const innerRadius = radius - strokeWidth
  const circumference = innerRadius * 2 * Math.PI

  const animation = (toValue: any) => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      animation(toValue === 0 ? percentage : 0)
    })
  }

  const arc = circumference * 0.65
  const dashArray = `${arc} ${circumference}`
  const transform = `rotate(100, ${radius}, ${radius})`

  React.useEffect(() => {
    animation(percentage)
    animated.addListener(
      v => {
        const maxPerc = (100 * v.value) / max
        const strokeDashoffset = arc - (Math.round(v.value) / 100) * arc
        if (inputRef?.current) {
          inputRef.current.setNativeProps({
            text: `${Math.round(v.value)}`,
          })
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          })
        }
      },
      [max, percentage],
    )

    return () => {
      animated.removeAllListeners()
    }
  })

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
