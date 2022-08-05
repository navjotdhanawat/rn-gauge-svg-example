import React, { useState, useEffect, useMemo } from 'react'
import { Easing, Animated, View } from 'react-native'
import Svg, { G, Circle, Path } from 'react-native-svg'
import Needle from '../Needle'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedG = Animated.createAnimatedComponent(G)

export default function CustomGauge({
  radius = 200,
  strokeWidth = 30,
  percentage = 100,
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
    <View style={{ aspectRatio: 1, backgroundColor: 'green' }}>
      <Svg height="100%" width="100%" viewBox={`0 0 400 400`}>
        <G>
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
        <Needle
          radius={radius}
          interpolateRotating={interpolateRotating}
          innerRadius={innerRadius}
        />
      </Svg>
    </View>
  )
}
