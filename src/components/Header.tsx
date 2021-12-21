import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';

export default function Header() {
  return (
    <>
        <View style={styles.headContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>E-learning</Text>
                <Text style={styles.subTitle}>Choose the right course for you!</Text>
            </View>
            <View>
                <Image style={styles.img} source={require('../assets/learn.png')} />
            </View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
    headContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#FFF8E1",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
    },
    title: {
        color: "#1e2023",
        fontWeight: "900",
        fontSize: 40,
        fontFamily: "Georgia",
    },
    subTitle: {
        marginTop: 30,
        fontSize: 15,
        color: "#1e2023",
        fontFamily: "Georgia",
    },
    img: {
        height: 100,
        width: 100,
        marginTop: 70,
    },
});