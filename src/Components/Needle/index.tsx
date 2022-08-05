import React, { useState, useEffect, useMemo } from 'react'
import Svg, { G, Circle, Path } from 'react-native-svg'
import { Easing, Animated, View } from 'react-native'

const AnimatedG = Animated.createAnimatedComponent(G)

export default function Needle({ radius, interpolateRotating, innerRadius }) {
  return (
    <G transform={`translate(${radius}, ${radius})`}>
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
            d={`M ${innerRadius - radius / 40} ${innerRadius + radius / 40} L ${
              innerRadius / (radius / 30)
            } ${innerRadius} L ${innerRadius + radius / 40} ${
              innerRadius - radius / 40
            } z`}
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
  )
}
