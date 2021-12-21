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
import { Icon } from 'react-native-elements';
import { getArticle } from '../services/ArticleService';
import { img } from '../assets/images';

// Context import
import { ShoppingCartContext } from '../../shoppingCartContext';

const Details = ({ route, navigation }: any, props: any) => {
    const [article, setArticle] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [cart, setCart] = useContext(ShoppingCartContext);
    const { id, imgIndex } = route.params;

    const addToCart = () => {
        return new Promise(async (resolve, reject) => {
            let actualArticle: any = {};

            article.map(async (value: any) => {
                actualArticle.id = await value.id;
                actualArticle.name = await value.name;
                actualArticle.quantity = await quantity === 0 ? 1 : quantity;
                actualArticle.amount = await value.amount;
                actualArticle.imgIndex = await imgIndex;
            });

            await cart.push(actualArticle);
            await setCart(cart);
            resolve(cart);
        });
    };

    const addQuantity = async () => {
        let tempQuantity = quantity + 1;
        await setQuantity(tempQuantity);
    };

    const removeQuantity = async () => {
        if (quantity > 0) {
            let tempQuantity = quantity - 1;
            await setQuantity(tempQuantity);
        }
    };

    const back = () => {
        navigation.goBack();
    };

    useEffect(() => {
        (async () => {
            getArticle(id).then(async (result) => {
                await setArticle(result);
                await article.map((value: any) =>{
                    setQuantity(value.qte);
                });
            }).catch(error => {
                if (error) {
                    console.log(error);
                }
            })
        })();
    }, []);

  return (
    <>
        <ScrollView>
            <SafeAreaView>
                <View style={styles.globalContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>DETAILS</Text>
                    </View>
                    <View style={styles.globalArticleContainer}>
                        {
                            article.map((value: any, index: number) => {
                                return (
                                    <View key={ index } style={ styles.globalArticleContainer }>
                                        <View key='0' style={styles.imgContainer}>
                                            <Image style={styles.img} source={ img[imgIndex] } />
                                        </View>
                                        <View key='1' style={styles.articleTitleContainer}>
                                            <Text style={styles.articleText}>{ value.name }</Text>
                                        </View>
                                        <View key='2' style={styles.articleContainer}>
                                            <Text style={styles.articleText}>{ quantity }</Text>
                                        </View>
                                        <View key='3' style={styles.articleContainer}>
                                            <Text style={styles.articleText}>{ value.amount } $</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }                        
                        <View style={styles.quantityContainer}>
                            <TouchableWithoutFeedback onPress={removeQuantity}>
                                <View style={styles.addQtyContainer}>
                                    <Text style={styles.quantityText}>-</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={addQuantity}>
                                <View style={styles.deleteQtyContainer}>
                                    <Text style={styles.quantityText}>+</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={addToCart}>
                    <View style={styles.addToCartContainer}>
                        <View style={styles.addToCartTextContainer}>
                            <Text style={styles.addToCartText}>Add to cart</Text>
                        </View>
                        <View style={styles.addToCartTextIcon}>
                            <Icon name="shoppingcart" type="antdesign" color="#ffffff" />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={back}>
                    <View style={styles.backContainer}>
                        <Text style={styles.backText}>Back</Text>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </ScrollView>
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
    globalArticleContainer: {
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
    articleTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '90%',
        marginTop: 5,
        borderRadius: 30
    },
    articleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '90%',
        marginTop: 5,
        borderRadius: 30
    },
    imgContainer: {
        marginBottom: 10
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 30,
        marginTop: "5% 0 0 5%",
    },
    addToCartContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        backgroundColor: "#1E293B",
        borderWidth: 1,
        borderRadius: 10,
    },
    addToCartTextContainer: {
        marginRight: 10
    },
    addToCartTextIcon: {
        marginLeft: 10
    },
    backContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderRadius: 10,
    },
    quantityContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    addQtyContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        width: '12%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 30,
    },
    deleteQtyContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        width: '12%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 30,
    },
    quantityText: {
        color: '#000000',
        fontWeight: '900',
        fontSize: 30
    },
    titleText: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 30
    },
    articleText: {
        color: '#ffffff',
        fontSize: 25,
        fontWeight: '700'
    },
    addToCartText: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 20
    },
    backText: {
        color: '#1E293B',
        fontWeight: '900',
        fontSize: 20
    },
});
export default Details;
