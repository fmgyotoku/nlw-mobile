import { useState } from "react"
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import { Feather } from "@expo/vector-icons"

import { BackButton } from "../components/BackButton"
import { CheckBox } from "../components/CheckBox"
import colors from "tailwindcss/colors"

import { api } from '../lib/axios';

const daysOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function NewHabit() {
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([])
  const [title, setTitle] = useState('')

  function handleDayOfWeekToggle(dayOfWeekIdx: number) {
    if(daysOfWeek.includes(dayOfWeekIdx)) {
      setDaysOfWeek(prevState => prevState.filter(dayOfWeek => dayOfWeek !== dayOfWeekIdx))
    } else {
      setDaysOfWeek(prevState => [...prevState, dayOfWeekIdx])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim()) {
        Alert.alert('New Habit', 'Inform the habit name')
        return
      }

      if(daysOfWeek.length === 0) {
        Alert.alert('New Habit', 'Select at least one day of the week')
        return
      }

      await api.post('/habits', { title, daysOfWeek})

      setTitle('')
      setDaysOfWeek([])

      Alert.alert('New Habit', 'Habit created successfully')
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'New habit could not be created')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Create Activity
        </Text>

        <Text className="mt-6 text-white font-extrabold text-3xl">
          What's your commitment?
        </Text>

        <TextInput 
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600" 
          placeholder="Exercise, sleep well, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          What's the frequency?
        </Text>

        {
          daysOfWeekArray.map((dayOfWeek, index) => (
            <CheckBox 
              key={dayOfWeek}
              title={dayOfWeek}
              checked={daysOfWeek.includes(index)}
              onPress={() => handleDayOfWeekToggle(index)}
            />
          ))
        }

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather 
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-2">
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}