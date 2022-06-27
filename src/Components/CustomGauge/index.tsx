import React, { useState, useEffect, useRef } from 'react'
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
const AnimatedG = Animated.createAnimatedComponent(G)

export default function CustomGauge({
  radius = 100,
  strokeWidth = 10,
  percentage = 0,
  max = 10,
}) {
  const center = radius / 2
  const circleRef = React.useRef()
  const needleRef = React.useRef()
  const innerRadius = radius - strokeWidth
  const circumference = innerRadius * 2 * Math.PI

  const arc = circumference * 0.5
  const dashArray = `${arc} ${circumference}`
  const transform = `rotate(180, ${radius}, ${radius})`

  const offsetP = arc - (percentage / 100) * arc
  const rotation = percentage * 1.8

  const animated = React.useRef(new Animated.Value(0)).current

  const animation = (toValue: any) => {
    return Animated.timing(animated, {
      toValue,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      console.log('-----')
      // animation(toValue === 0 ? percentage : 0)
    })
  }

  React.useEffect(() => {
    animation(percentage)
    console.log(percentage)
    animated.addListener(v => {
      const maxPerc = (100 * v.value) / max
      const strokeDashoffset = arc - (Math.round(v.value) / 100) * arc
      if (needleRef.current) {
        const rotation = percentage * 1.8
        needleRef.current.setNativeProps({
          // transform: [{ rotation: '100 100 100' }],
        })
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        })
      }
    })

    return () => {
      animated.removeAllListeners()
    }
  }, [percentage])

  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0))
  React.useEffect(() => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [])

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  const [pivotX, pivotY] = [100, 100]

  const [offset, setOffset] = useState(0)
  const offsetAndroid = offset
  return (
    <View style={{ width: 300, height: 300 }}>
      <Svg width="100%" height="100%">
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
        <G transform={`translate(${pivotX}, ${pivotY})`}>
          <AnimatedG
            style={{
              transform: [
                { translateX: -offsetAndroid },
                {
                  rotate: interpolateRotating,
                },
                { translateX: offsetAndroid },
              ],
            }}
          >
            <G transform={`translate(-${pivotX} -${pivotY})`}>
              <Circle cx={radius} cy={radius} r="10" fill="#000" />
              <Path
                d={`M ${radius - 3} ${radius + 3} L ${radius / 5} ${radius} L ${
                  radius + 3
                } ${radius - 3} z`}
                fill="#000"
                stroke="#111"
              />
              <Path
                d={`M ${radius} ${radius - 2} L ${radius + 30} ${
                  radius - 2
                } L ${radius + 30} ${radius + 2} L ${radius} ${radius + 2} z`}
                fill="#000"
                stroke="#111"
              />
              <Circle cx={radius + 30} cy={radius} r="7" fill="#000" />
              <Circle cx={radius + 30} cy={radius} r="3.5" fill="#fff" />
              <Circle cx={radius} cy={radius} r="4" stroke="#999" fill="#ccc" />
            </G>
          </AnimatedG>
        </G>
      </Svg>
      <Text>{percentage}: </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
})
