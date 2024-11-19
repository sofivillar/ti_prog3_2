import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import Home from "../screens/Home";
import NewPost from './NewPost';
import Profile from '../screens/Profile';
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

class HomeMenu extends Component {

    render() {
        return (
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
                <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => <AntDesign name="home" size={24} color="black" /> }} />
                <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }} />
                <Tab.Screen name="Search" component={Search} options={{ tabBarIcon: () => <AntDesign name="team" size={24} color="black" /> }} />
                <Tab.Screen name="NewPost" component={NewPost} options={{ tabBarIcon: () => <AntDesign name="picture" size={24} color="black" /> }} />
            </Tab.Navigator>
        );
    }
}

export default HomeMenu;