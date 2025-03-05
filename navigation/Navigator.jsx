import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Screens/Home.jsx";
import Welcome from "../Screens/Welcome.jsx";
import Login from "../Screens/Login.jsx";
import Signup from "../Screens/Signup.jsx";
import Details from "../Screens/Details.jsx";
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
  );
}
