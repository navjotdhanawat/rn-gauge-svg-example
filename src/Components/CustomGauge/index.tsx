import React, { useState, useEffect, useMemo } from 'react'
import { Easing, Animated, View } from 'react-native'
import Svg, { G, Circle, Path } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedG = Animated.createAnimatedComponent(G)

export default function CustomGauge({
  radius = 100,
  strokeWidth = 20,
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
    <View style={{ aspectRatio: 1 }}>
      <Svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
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
              <Circle
                cx={innerRadius}
                cy={innerRadius}
                r={radius / 13}
                fill="#000"
              />
              <Path
                d={`M ${innerRadius - radius / 40} ${
                  innerRadius + radius / 40
                } L ${innerRadius / (radius / 30)} ${innerRadius} L ${
                  innerRadius + radius / 40
                } ${innerRadius - radius / 40} z`}
                fill="#000"
                stroke="#111"
              />
              <Path
                d={`M ${innerRadius} ${innerRadius - radius / 50} L ${
                  innerRadius + radius / 5
                } ${innerRadius - radius / 50} L ${innerRadius + radius / 5} ${
                  innerRadius + radius / 50
                } L ${innerRadius} ${innerRadius + radius / 50} z`}
                fill="#000"
                stroke="#111"
              />
              <Circle
                cx={innerRadius + radius / 5}
                cy={innerRadius}
                r={radius / 18}
                fill="#000"
              />
              <Circle
                cx={innerRadius + radius / 5}
                cy={innerRadius}
                r={radius / 40}
                fill="#fff"
              />
              <Circle
                cx={innerRadius}
                cy={innerRadius}
                r={radius / 30}
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
