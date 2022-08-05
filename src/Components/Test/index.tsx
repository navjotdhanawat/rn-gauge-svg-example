import React, { useState, useEffect, useMemo } from 'react'
import { Easing, Animated, View } from 'react-native'
import Svg, { G, Circle, Path } from 'react-native-svg'
import Needle from '../Needle'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedG = Animated.createAnimatedComponent(G)

export default function Test({
  radius = 200,
  strokeWidth = 30,
  percentage = 100,
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
    <View style={{ aspectRatio: 1, backgroundColor: 'blue' }}>
      <Svg height="100%" width="100%" viewBox={`0 0 400 400`}>
        <G transform={`translate(200, 200)`}>
          <G>
            <Path
              d="M-186.60302053666894,-6.178371261852132A6,6,0,0,1,-192.59028322768506,-12.569121141911557A193,193,0,0,1,-107.18031982598201,-160.5035172262596A6,6,0,0,1,-98.65213673511015,-158.51377057673855L-85.31913163194753,-135.42032832048588A6,6,0,0,1,-87.1294255488691,-127.4669494556298A154.4,154.4,0,0,0,-153.95432914591697,-11.72282121465063A6,6,0,0,1,-159.93701033034378,-6.178371261852096Z"
              fill={`rgb(0, 255, 0)`}
            />
          </G>
          <G>
            <Path
              d="M-87.95088380155886,-164.6921418385907A6,6,0,0,1,-85.4099634017031,-173.07263836817114A193,193,0,0,1,85.40996340170311,-173.0726383681711A6,6,0,0,1,87.95088380155885,-164.69214183859066L74.61787869839625,-141.59869958233796A6,6,0,0,1,66.82490359704786,-139.18977067028044A154.4,154.4,0,0,0,-66.82490359704794,-139.1897706702804A6,6,0,0,1,-74.6178786983963,-141.59869958233793Z"
              fill={`rgb(255, 255, 0)`}
            />
          </G>
          <G>
            <Path
              d="M98.65213673511008,-158.5137705767386A6,6,0,0,1,107.18031982598195,-160.50351722625965A193,193,0,0,1,192.59028322768506,-12.56912114191157A6,6,0,0,1,186.60302053666894,-6.178371261852142L159.93701033034378,-6.178371261852138A6,6,0,0,1,153.95432914591694,-11.722821214650684A154.4,154.4,0,0,0,87.12942554886907,-127.4669494556298A6,6,0,0,1,85.31913163194751,-135.4203283204859Z"
              fill={`rgb(255, 0, 0)`}
            />
          </G>
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
