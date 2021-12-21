import React, { useContext, useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { img } from '../assets/images';

// Context import 
import { ShoppingCartContext } from '../../shoppingCartContext';

const ShoppingCart = ({ route, navigation }: any, props: any) => {
    const [cart, setCart] = useContext(ShoppingCartContext);
    const [total, setTotal] = useState(0);

    const removeFromCart = async (id: string) => {
        await setCart(cart.filter((item: any) => item.id !== id));
    };

    const payment = () => {
        if (cart.length > 0) {
            navigation.navigate('PaymentConfirmed');
        }
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

    useEffect(() => {
        sumOfAllArticles();
    }, [cart])

  return (
    <>
        <SafeAreaView>
            <View style={styles.globalContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>My Cart</Text>
                </View>
                <ScrollView>
                    <View style={styles.globalArticleContainer}>
                        {
                            cart.length > 0 ? (
                                cart.map((value: any, index: any) => {
                                    return (
                                        <View key={ index } style={ styles.globalArticleContainer }>
                                            <View key='0' style={styles.imgContainer}>
                                                <Image style={styles.img} source={ img[value.imgIndex] } />
                                            </View>
                                            <View key='1' style={styles.articleContainer}>
                                                <Text style={styles.articleText}>{ value.name.length > 7 ? value.name.toString().substring(0, 12) : value.name }</Text>
                                            </View>
                                            <View key='2'style={styles.articleContainer}>
                                                <Text style={styles.articleText}>{ value.quantity }</Text>
                                            </View>
                                            <View key='3' style={styles.articleContainer}>
                                                <Text style={styles.articleText}>{ value.amount } $</Text>
                                            </View>
                                            <TouchableWithoutFeedback onPress={() => { removeFromCart(value.id) }}>
                                                <View style={styles.removeArticleContainer}>
                                                    <Text style={styles.removeArtcileButtonText}>X</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    )
                                })
                            ) : (
                                <View style={styles.nothingArticleMessageContainer}>
                                    <Text style={styles.nothingArticleMessageText}>Nothing articles in the cart!</Text>
                                </View>
                            )
                        }
                        {
                            cart.length > 0 ? (
                                <View style={styles.totalContainer}>
                                    <Text style={styles.totalText}>Total Amount : { total } $</Text>
                                </View>
                            ) : (
                                <></>
                            )
                        }
                    </View>
                </ScrollView>
            </View>
            <TouchableWithoutFeedback onPress={payment}>
                <View style={cart.length > 0 ? styles.paymentContainer : styles.paymentContainerWithoutArticles}>
                    <View style={styles.paymentTextContainer}>
                        <Text style={styles.paymentText}>Payment</Text>
                    </View>
                    <View style={styles.paymentTextIcon}>
                        <Ionicons name="card-outline" color="#000000" size={20} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    globalContainer: {
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
    globalArticleContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 2,
        marginBottom: 2,
        padding: 7
    },
    articleContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    nothingArticleMessageContainer: {
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
        backgroundColor: "#1E293B",
        borderRadius: 30
    },
    imgContainer: {
        marginBottom: 10
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: 30,
        margin: "5% 2% 2% 5%",
    },
    totalContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 5,
        marginRight: 5,

    },
    paymentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 10,
    },
    paymentContainerWithoutArticles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 10,
        opacity: 0.5
    },
    paymentTextContainer: {
        marginRight: 10
    },
    paymentTextIcon: {
        marginLeft: 10
    },
    removeArticleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 30,
        width: '10%',
        marginLeft: 'auto',
        marginRight: 5,
        marginTop: 30,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 30,
    },
    removeArtcileButtonText: {
        color: '#000000',
        fontWeight: '900',
        fontSize: 20
    },
    titleText: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 30
    },
    articleText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center'
    },
    paymentText: {
        color: '#1E293B',
        fontWeight: '900',
        fontSize: 20
    },
    nothingArticleMessageText: {
        color: '#ffffff',
        fontSize: 25
    },
    totalText: {
        color: "#ffffff",
        fontWeight: '700',
        fontSize: 25
    }
});
export default ShoppingCart;
