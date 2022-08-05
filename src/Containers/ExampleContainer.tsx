import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { DigitalGauge } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme, ThemeState } from '@/Store/Theme'
import AnalogGauge from '@/Components/AnalogGauge'
import CustomGauge from '@/Components/CustomGauge'
import Test from '@/Components/Test'

const ExampleContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const [percentage, setPercentage] = useState(40)

  const [userId, setUserId] = useState('9')
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchOneQuery()

  useEffect(() => {
    fetchOne(userId)
  }, [fetchOne, userId])

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min // max & min both included
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // console.log('This will run every second!')
  //     setPercentage(getRandomIntInclusive(50, 100))
  //   }, 2000)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
      <DigitalGauge value={percentage} unit={'V'} />
      <Button title="+" onPress={() => setPercentage(percentage + 10)} />
      <Button title="-" onPress={() => setPercentage(percentage - 10)} />

      {/* <AnalogGauge /> */}
      {/* <CustomGauge radius={100} strokeWidth={20} percentage={percentage} /> */}
      <View
        style={{
          width: 300,
          // height: 300,
          justifyContent: 'space-around',
        }}
      >
        <CustomGauge percentage={percentage} />
      </View>

      <View
        style={{
          width: 300,
          // height: 400,
          justifyContent: 'space-around',
        }}
      >
        <Test percentage={percentage} />
      </View>

      {/* <Test radius={10} strokeWidth={10} percentage={percentage} /> */}
    </ScrollView>
  )
}

export default ExampleContainer
