import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import Catalog from "../pages/catalog/Catalog";
import { Home } from "../pages/home/Home";

export function Routes () {
    const StackNavigation = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <StackNavigation.Navigator>
                <StackNavigation.Screen name="Home" component={Home} />
                <StackNavigation.Screen name="Catalog" component={Catalog} />
            </StackNavigation.Navigator>
        </NavigationContainer>
    )
}