import React, { useState, useEffect, useRef, useMemo } from 'react'
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
  strokeWidth = 20,
  percentage = 100,
  width = 200,
  height = 200,
  scale = 1,
}) {
  const innerRadius = radius - strokeWidth
  const circumference = innerRadius * 2 * Math.PI
  const halfCircle = radius + strokeWidth

  const arc = circumference * 0.5
  const dashArray = `${arc} ${circumference}`
  const transform = `rotate(180, ${radius}, ${radius})`

  const [rotateAnimation] = useState(new Animated.Value(0))
  const [circleAnimation] = useState(new Animated.Value(283))

  useMemo(() => {
    Animated.timing(circleAnimation, {
      toValue: arc - (percentage / 100) * arc,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {})

    Animated.timing(rotateAnimation, {
      toValue: percentage * 1.8,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {})
  }, [percentage])

  const [interpolateRotating, setInterpolateRotating] = useState({})
  const [interpolateOffset, setInterpolateOffset] = useState(0)
  useEffect(() => {
    const interpolateOffset = circleAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: [0, 180],
    })
    setInterpolateOffset(interpolateOffset)
    const interpolateRotating = rotateAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', `180deg`],
    })
    setInterpolateRotating(interpolateRotating)
  }, [])

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G scale={scale}>
          <Circle
            cx={radius}
            cy={radius}
            r={innerRadius}
            fill="transparent"
            stroke="gray"
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            transform={transform}
            strokeLinecap="round"
          />
          <AnimatedCircle
            cx={radius}
            cy={radius}
            r={innerRadius}
            fill="transparent"
            stroke="red"
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={interpolateOffset}
            transform={transform}
            strokeLinecap="round"
            strokeOpacity=".9"
          />
        </G>
        <G scale={scale} transform={`translate(${radius}, ${radius})`}>
          <AnimatedG
            style={{
              transform: [
                // { translateX: -offsetAndroid },
                {
                  rotate: interpolateRotating,
                },
                // { translateX: offsetAndroid },
              ],
            }}
          >
            <G transform={`translate(-${innerRadius} -${innerRadius})`}>
              <Circle cx={innerRadius} cy={innerRadius} r="10" fill="#000" />
              <Path
                d={`M ${innerRadius - 3} ${innerRadius + 3} L ${
                  innerRadius / 5
                } ${innerRadius} L ${innerRadius + 3} ${innerRadius - 3} z`}
                fill="#000"
                stroke="#111"
              />
              <Path
                d={`M ${innerRadius} ${innerRadius - 2} L ${innerRadius + 30} ${
                  innerRadius - 2
                } L ${innerRadius + 30} ${innerRadius + 2} L ${innerRadius} ${
                  innerRadius + 2
                } z`}
                fill="#000"
                stroke="#111"
              />
              <Circle
                cx={innerRadius + 30}
                cy={innerRadius}
                r="7"
                fill="#000"
              />
              <Circle
                cx={innerRadius + 30}
                cy={innerRadius}
                r="3.5"
                fill="#fff"
              />
              <Circle
                cx={innerRadius}
                cy={innerRadius}
                r="4"
                stroke="#999"
                fill="#ccc"
              />
            </G>
          </AnimatedG>
        </G>
      </Svg>
    </View>
  )
}
