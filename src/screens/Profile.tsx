import { Auth } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Service import
import { getActualUser, signout } from '../services/BasicAuthService';

const Profile = ({ navigation }: any) => {
    const [user, setUser] = useState([]) as any;

    const logout = () => {
        signout().then((res) => {
            if (res) {
                navigation.navigate('Signin');
            }
        });
    };

    useEffect(() => {
        (async () => {
            let actualUser: Auth = await getActualUser();

            if (actualUser.currentUser) {
                let usr: object = {
                    email: actualUser.currentUser.email
                };

                await setUser(usr);
            }
        })();
    }, []);
  return (
    <>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.globalContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>My Profile</Text>
                    </View>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={require('../assets/login.png')} />
                    </View>
                    <View style={styles.globalContentContainer}>
                        <View style={styles.content}>
                            <View style={styles.contentText}>
                                <Text style={styles.text}>
                                    <Text style={styles.field}>Name : </Text>
                                    { user.email ? user.email.substring(0, user.email.indexOf('@')) : <></> }
                                </Text>
                                <Text style={styles.text}>
                                    <Text style={styles.field}>Email : </Text>
                                    { user.email }
                                </Text>
                                <Text style={styles.text}>
                                    <Text style={styles.field}>Password : </Text>
                                    ..........
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={logout}>
                    <View style={styles.signOutContainer}>
                        <View style={styles.signOutTextContainer}>
                            <Text style={styles.signOutText}>Sign out</Text>
                        </View>
                        <View style={styles.signOutTextIcon}>
                            <Ionicons name="log-out-outline" color="#000000" size={20} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    globalContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        height: 550,
        width: '99%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: "#1E293B",
        borderRadius: 30
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 5,
        height: 70,
        width: '90%',
        backgroundColor: "#1E293B",
        borderRadius: 30
    },
    globalContentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 5,
        height: 400,
        width: '90%',
    },
    titleText: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 30
    },
    content: {
        width: '100%',
        backgroundColor: 'white',
        height: 200,
        borderWidth: 5,
        borderColor: '#ffffff',
        borderRadius: 30,
        marginBottom: 190
    },
    contentText: {
        margin: 10
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
        color : '#000000',
        marginBottom: 10
    },
    field: {
        fontWeight: '900',
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
    signOutContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 10,
    },
    signOutTextContainer: {
        marginRight: 10
    },
    signOutTextIcon: {
        marginLeft: 10
    },
    signOutText: {
        color: '#1E293B',
        fontWeight: '900',
        fontSize: 20
    },
});
export default Profile;