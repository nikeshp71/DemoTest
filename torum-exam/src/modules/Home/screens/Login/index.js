import React, { useCallback } from 'react'
import { View, Text, Alert, TextInput } from 'react-native'
import { Button } from 'native-base';

import { loginUser } from '@api/index';

import { EMAIL, PASS } from "@src/constants";
import ROUTE_CONSTANTS from '@route/constants';
import styles from './styles';

function Login({ navigation: { replace } }) {

    const performAuth = useCallback(async () => {
        const status = await loginUser()
        if (status) {
            replace(ROUTE_CONSTANTS.ARTICLE)
        } else {
            Alert.alert('Oops!', 'Something went wrong')
        }
    }, [])

    return (
        <View style={styles.container}>
            <TextInput value={EMAIL} style={styles.textInput} editable={false} />
            <TextInput value={PASS} style={styles.textInput} editable={false} secureTextEntry={true} />
            <Button onPress={performAuth} width={'130'} height={'12'}>Login</Button>
        </View>
    )
}

export default Login