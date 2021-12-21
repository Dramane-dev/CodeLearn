import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
  Button
} from 'react-native';

const Separator = () => <View style={styles.separator} />;

// Service imports
import { signup } from '../../services/BasicAuthService';

const Signup = ({ navigation }: any) => {
    const [registring, setRegistring] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    
    const formTitle = "Sign Up";
    const nameTitle = "Name";
    const emailTitle = "E-mail";
    const passwordTitle = "Password";
    const signUpButtonTitle = "Create my account!";
    const signInButtonTitle = "Sign in!";

    const onNameChange = (e: React.SetStateAction<string>) => {
        setName(e);
    };

    const onEmailChange = (e: React.SetStateAction<string>) => {
        setEmail(e);
    };

    const onPasswordChange = (e: React.SetStateAction<string>) => {
        setPassword(e);
    };

    const register = () => {
        signup(email, password).then((res) => {
            setRegistring(true);
        }).catch(error => {
            setRegistring(false);

            if (error) {
                if (error.includes('auth/email-already-in-use')) {
                    setRegistring(true);
                }

                if (error.includes('auth/invalid-email') || error.includes('auth/wrong-password') || error.includes('auth/internal-error')) {
                    setError(true);
                }
            }
        });
    };

    useEffect(() => {
        if (registring) {
            navigation.navigate('Signin');
        }
    }, [registring]);

  return (
    <>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.containerKey}>
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={require('../../assets/login.png')} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>{formTitle}</Text>
                    <Text style={styles.fields}>{nameTitle}</Text>
                    <TextInput 
                     style={styles.input} 
                     value={name} 
                     onChangeText={onNameChange} 
                     focusable={true} 
                    />
                    <Text style={styles.fields}>{emailTitle}</Text>
                    <TextInput 
                     style={styles.input} 
                     value={email} 
                     onChangeText={onEmailChange} 
                     focusable={true} 
                    />
                    <Text style={styles.fields}>{passwordTitle}</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={onPasswordChange}
                        focusable={true}
                    />
                    <Separator />
                    <View style={styles.button}>
                        <Button title={signUpButtonTitle} color="#000" onPress={register} />
                    </View>
                    <Separator />
                    <View style={styles.button}>
                        <Button
                            title={signInButtonTitle}
                            color="#000"
                            onPress={() => navigation.navigate("Signin")}
                        />
                    </View>
                </View>
            </View>
            {
                error ? (
                    <View style={styles.errorMessageContainer}>
                        <Text style={styles.errorMessage}>An error occured on Email or Password !</Text>
                    </View>
                ) : (
                    <>
                    </>
                )
            }
        </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
    containerKey: {
        flex: 1,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 30,
        margin: 10,
        marginTop: 20,
    },
    imgContainer: {
        margin: 10,
    },
    img: {
        height: 200,
        width: 200,
        marginRight: "auto",
        marginLeft: "auto",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 30,
        borderStyle: "solid",
        borderRadius: 30,
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: "#0E1717",
        height: 500,
    },
    formTitle: {
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 30,
        color: "#fff",
        marginBottom: 30,
    },
    input: {
        height: 40,
        margin: 22,
        borderWidth: 1,
        padding: 10,
        color: "#fff",
        borderColor: "#fff",
        alignSelf: "stretch",
    },
    fields: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: "auto",
        marginRight: "auto",
    },
    separator: {
        marginVertical: 10,
        borderBottomColor: "#fff",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        height: 40,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMessageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'black',
        height: 50,
        width: 300,
        borderRadius: 30
    },
    errorMessage: {
        fontSize: 15,
        fontWeight: '900',
        color: '#c0392b'
    }
});

export default Signup;