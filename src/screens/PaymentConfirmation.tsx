import React, { useContext, useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { img } from '../assets/images';

// Context import
import { ShoppingCartContext } from '../../shoppingCartContext';

const PaymentConfirmation = ({ navigation }: any) => {
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [cart, setCart] = useContext(ShoppingCartContext);
    const [total, setTotal] = useState(0);

    const init = () => {
        setTimeout(() => {
            setPaymentConfirmed(true);
        }, 2000);
    };

    const sumOfAllArticles = async () => {
        if (cart.length > 0) {
            let sum = 0;

            await cart.map((article: any) => {
                sum += article.quantity * article.amount
            });
            await setTotal(sum);
        }
    };

    const back = () => {
        navigation.goBack();
    };

    useEffect(() => {
        init();
        sumOfAllArticles();
    }, [paymentConfirmed]);

  return (
    <>
        {
            paymentConfirmed ? (
                <SafeAreaView>
                    <View style={styles.globalContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>
                                Congratulations!
                            </Text>
                        </View>
                        <View style={styles.subSentence} >
                            <Text style={styles.subSentenceText}>Your order is validated.</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image style={styles.img} source={require('../assets/validate.png')} />
                        </View>
                        <View style={styles.globalContentContainer}>
                            <View style={styles.content}>
                                <ScrollView>
                                    <View style={styles.contentText}>
                                        {
                                            cart.map((article: any, index: number) => {
                                                return (
                                                    <View key={index} style={styles.text}>
                                                        <Text style={styles.field}>Article { index === 0 ? 1 : index + 1 } : </Text>
                                                        <View style={styles.descriptionContainer}>
                                                            <Image style={styles.imgMin} source={ img[article.imgIndex] } />
                                                            <Text style={styles.text}>Name : { article.name }</Text>
                                                            <Text style={styles.text}>Quantity : { article.quantity }</Text>
                                                            <Text style={styles.text}>Amount : { article.amount } $</Text>
                                                        </View>
                                                    </View>
                                                );
                                            })
                                        }
                                        <Text style={styles.field}>Total amount : { total } $</Text>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={back}>
                        <View style={styles.backContainer}>
                            <View style={styles.backTextIcon}>
                                <Ionicons name="arrow-back-outline" color="#000000" size={20} />
                            </View>
                            <View style={styles.backTextContainer}>
                                <Text style={styles.backText}>Back</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            ) : (
                <SafeAreaView>
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#1E293B" />
                    </View>
                </SafeAreaView>
            )
        }
    </>
  );
}

const styles = StyleSheet.create({
    globalContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        height: 650,
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
        height: 600,
        width: '90%',
    },
    subSentence: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    subSentenceText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '600'
    },
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: 800,
    },
    content: {
        width: '100%',
        backgroundColor: 'white',
        height: 300,
        borderWidth: 5,
        borderColor: '#ffffff',
        borderRadius: 30,
        marginBottom: 190
    },
    contentText: {
        margin: 10
    },
    titleText: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 30
    },
    descriptionContainer: {
       display : 'flex',
       flexDirection: 'column',
       justifyContent: 'center'
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
        color : '#000000',
        marginBottom: 10
    },
    field: {
        fontSize: 20,
        fontWeight: '900',
        color : '#000000',
    },
    imgContainer: {
        margin: 10,
    },
    img: {
        height: 100,
        width: 100,
        marginRight: "auto",
        marginLeft: "auto",
    },
    imgMin: {
        height: 30,
        width: 30,
        marginTop: 10,
        marginBottom: 10
    },
    backContainer: {
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
    backTextContainer: {
        marginRight: 10
    },
    backTextIcon: {
        marginLeft: 10
    },
    backText: {
        color: '#1E293B',
        fontWeight: '900',
        fontSize: 20
    },
});
export default PaymentConfirmation;