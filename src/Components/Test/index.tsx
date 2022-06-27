import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Animated, Platform } from 'react-native'
import { Svg, Path, Rect, G, Circle } from 'react-native-svg'

const AnimatedG = Animated.createAnimatedComponent(G)

export default function Test({
  radius = 100,
  strokeWidth = 10,
  percentage = 0,
  max = 10,
}) {
  const rotation = React.useRef(new Animated.Value(0)).current

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        useNativeDriver: true,
        duration: 3000,
        toValue: 1,
      }),
    ).start()
  }, [])

  const offsetAndroid = offset
  const [pivotX, pivotY] = [100, 100]

  return (
    <View style={{ width: 300, height: 300 }}>
      <Svg
        width="100%"
        height="100%"
        // onLayout={this.onLayout}
        // viewBox={`0 0 50 50`}
      >
        {/* <Rect width="50" height="50" /> */}
        <G transform={`translate(${pivotX}, ${pivotY})`}>
          <AnimatedG
            style={{
              transform: [
                { translateX: -offsetAndroid },
                {
                  rotate: rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'], // I would like to set pivot point at 25 25
                  }),
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
        <G transform={`translate(${pivotX}, ${pivotY})`}>
          <Circle r="5" fill="black" />
          <AnimatedG
            style={{
              transform: [
                // { translateX: -offsetAndroid },
                {
                  rotate: rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'], // I would like to set pivot point at 25 25
                  }),
                },
                // { translateX: offsetAndroid },
              ],
            }}
          >
            <Path
              fill="#000"
              d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
              transform={`translate(-${pivotX} -${pivotY})`}
            />
          </AnimatedG>
        </G>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
})
