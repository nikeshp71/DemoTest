import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import storage, { TOKEN_STORAGE } from '@storage/index';

import ROUTE_CONSTANTS from './constants';

import ArticlesList from '@articleList';
import PostDetail from '@postDetail';
import Login from '@login';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const TOKEN_VALUE = storage?.getString(TOKEN_STORAGE)
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: false
                }}
                initialRouteName={TOKEN_VALUE ? ROUTE_CONSTANTS.ARTICLE : ROUTE_CONSTANTS.LOGIN}>
                <Stack.Screen
                    options={{
                        gestureEnabled: false,
                        headerBackVisible: false,
                        headerStyle: {
                            backgroundColor: '#D2D9D8'
                        },
                    }}
                    name={ROUTE_CONSTANTS.ARTICLE}
                    component={ArticlesList}
                    detachPreviousScreen={true}
                />
                <Stack.Screen
                    name={ROUTE_CONSTANTS.LOGIN}
                    component={Login}
                />
                <Stack.Screen
                    name={ROUTE_CONSTANTS.POST}
                    component={PostDetail}
                    options={{
                        headerBackTitleVisible: false,
                        headerStyle: {
                            backgroundColor: '#D2D9D8'
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes