import './src/lib/dayjs'
import { StatusBar } from 'react-native'
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold, 
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading'
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_800ExtraBold
  })

  // If the fonts are not loaded, the app will not be loaded
  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  )
} 
