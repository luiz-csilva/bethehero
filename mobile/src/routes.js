import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const AppStack = createStackNavigator()

import Casos from './pages/Casos'
import Detail from './pages/Detail'


function Routes () {
  return (
    <NavigationContainer>

      <AppStack.Navigator screenOptions={ { headerShown: false } }>
        <AppStack.Screen name="Casos" component={Casos}/>
        <AppStack.Screen name="Detail" component={Detail}/>
      </AppStack.Navigator>

    </NavigationContainer>
  )
}

export default Routes