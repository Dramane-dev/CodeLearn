import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'react-native-elements';
import { img } from '../assets/images';

const Article = (props: any) => {

  return (
    <>
    <TouchableWithoutFeedback 
      onPress={ 
      () => props.navigated.navigate('Details', {
          id: props.data.id,
          imgIndex: props.index.toString()
      })
     }>
            <View style={styles.card}>
                <Image style={styles.img} source={ img[props.index] } />
                <Text style={styles.text} 
                >{ props.data.name }</Text>
                <Text style={styles.text}>{ props.data.amount }</Text>
                {/* <View style={styles.qteContainer}>
                    <Text style={styles.plusAndMinus} onPress={ () => { console.log('remove qte') } }>-</Text>
                    <Text style={styles.qte}>{ props.data.qte }</Text>
                    <Text style={styles.plusAndMinus} onPress={ () => { console.log('add qte') } }>+</Text>
                </View>
                <View style={styles.addToShoppingCart}>
                    <Text style={styles.addToShoppingCartText} onPress={ () => { console.log('add to cart') } }>Add to cart</Text>
                    <Icon name="shoppingcart" type="antdesign" color="#ffffff" onPress={ () => {  } } />
                </View> */}
            </View>
        </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "40%",
        borderRadius: 10,
        backgroundColor: "#1e2023",
        margin: "5% 0 0 5%",
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    text: {
        color: "#ffffff",
        fontFamily: "Arial",
        margin: "5% 0 0 5%",
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "700",
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 30,
        marginTop: "5% 0 0 5%",
    },
    addToShoppingCart: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        height: 30,
        width: 110,
        margin: "5% 0 0 5%",
        backgroundColor: "#1E293B",
        alignItems: "center",
        textAlign: "center",
    },
    addToShoppingCartText: {
        fontFamily: "Arial",
        marginTop: "auto",
        marginBottom: "auto",
        color: "#ffffff",
    },
    icon: {
        backgroundColor: "#ffffff",
    },
    qteContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        margin: 10
    },
    qte: {
        color: "#ffffff",
        fontFamily: "Arial",
        margin: 15,
        fontSize: 17,
        fontWeight: "700",
    },
    plusAndMinus: {
        color: '#ffffff',
        fontSize: 40,
        margin: 5,
    }
});
export default Article;
