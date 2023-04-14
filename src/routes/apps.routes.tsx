import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

import { Home } from '../ui/Home'
import { NewHabit } from '../ui/NewHabit'
import { Habit } from '../ui/Habit'

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="home"
        component={ Home }
      />

      <Screen
        name="newHabit"
        component={ NewHabit }
      />

      <Screen
        name="habit"
        component={ Habit }
      />
    </Navigator>
  )
}