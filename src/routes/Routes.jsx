import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { Home } from "../pages/Home";
import { ScanPM } from "../pages/Scan";
import Catalog from "../pages/Catalog";

export function Routes () {
    const StackNavigation = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <StackNavigation.Navigator>
                <StackNavigation.Screen name="Home" component={Home} />
                <StackNavigation.Screen name="ScanPM" component={ScanPM} />
                <StackNavigation.Screen name="Catalog" component={Catalog} />
            </StackNavigation.Navigator>
        </NavigationContainer>
    )
}