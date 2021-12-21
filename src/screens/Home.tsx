import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  Image,
} from 'react-native';

// Components imports
import Article from '../components/Article';


// Services imports 
import { getArticles } from '../services/ArticleService';

const Home = ({ navigation }: any) => {
    const [articles, setArticles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        (async () => {
            getArticles().then(async (result) => {
                await setArticles(result);
            })
        })();
    }, [cart]);
    
  return (
    <>
        <View style={styles.headContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>E-learning</Text>
                <Text style={styles.subTitle}>Choose the right course for you!</Text>
            </View>
            <View>
                <Image style={styles.img} source={require("../assets/learn.png")} />
            </View>
        </View>
        <ScrollView>
            <View style={styles.articlesContainer}>
                {
                    articles.map((article, index) => {
                        return (
                            <Article 
                                key={ index }
                                index={ index }
                                data={ article }
                                navigated={ navigation }
                            />
                        );
                    })
                }
            </View>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
    headContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#1e2023",
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
        color: "#ffffff",
        fontWeight: "900",
        fontSize: 40,
        fontFamily: "Georgia",
    },
    subTitle: {
        marginTop: 30,
        fontSize: 15,
        color: "#ffffff",
        fontFamily: "Georgia",
    },
    img: {
        height: 100,
        width: 100,
        marginTop: 70,
    },
    articlesContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
    },
});
export default Home;