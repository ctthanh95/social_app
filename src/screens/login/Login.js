import React, { useState, useEffect } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import {
    SIGN_IN,
    LOGIN_WITH_FACEBOOK,
    LOGIN_WITH_GOOGLE,
    GET_CURRENT_USER_GOOGLE,
    GET_CURRENT_USER_FACEBOOK
} from '../../firebase'
import { CustomButton, CustomImageButton, CustomInput } from '../../components'
import { Colors, Fonts } from '../../constants'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '376268813058-4utruuio1kndakt69n5dites36ajerrd.apps.googleusercontent.com',
        })
    }, [])
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image source={require('../../assets/images/logo.png')} resizeMode='cover' />
                <CustomInput
                    name='user'
                    labelValue={email}
                    onChangeText={userEmail => setEmail(userEmail)}
                    placeholder='Email'
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <CustomInput
                    name='lock'
                    labelValue={password}
                    onChangeText={userPassword => setPassword(userPassword)}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <CustomButton title='Sign In' onPress={() => SIGN_IN(email, password, navigation)} />
                <TouchableOpacity style={styles.wrapForgot} onPress={() => Alert.alert('a')}>
                    <Text style={styles.textForgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <CustomImageButton
                    name="facebook"
                    title='Sign In with Facebook'
                    color="#4867aa"
                    backgroundColor="#e6eaf4"
                    onPress={() => LOGIN_WITH_FACEBOOK().then(() => {
                        GET_CURRENT_USER_FACEBOOK()
                        Alert.alert(
                            "Alert Title",
                            "My Alert Msg",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "OK", onPress: () => navigation.navigate('Home') }
                            ]
                        )
                    })}
                />
                <CustomImageButton
                    name="google"
                    title='Sign In with Google'
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={() => LOGIN_WITH_GOOGLE().then(() => {
                        GET_CURRENT_USER_GOOGLE()
                        navigation.navigate('Home')
                    })}
                />
                <TouchableOpacity
                    style={styles.wrapForgot}
                    onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.textForgot}>
                        Don't have an acount? Create here
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.white
    },
    wrapForgot: {
        marginVertical: 15
    },
    textForgot: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.blue,
        fontFamily: Fonts.bold,
    }
})
