import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#007AFF",
                tabBarInactiveTintColor: "#8E8E93"
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons 
                            size={24} 
                            name={focused ? "home" : "home-outline"} 
                            color={color}
                        />
                    )
                }}
            />
           
                    
                
            </Tabs>
    );
}



