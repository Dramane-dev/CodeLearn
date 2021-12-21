import { firestore } from "../db/firebase";
import { collection, getDocs } from "firebase/firestore"; 

export async function getArticles(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        let articles: any[] = [];
        let articlesRef = await getDocs(collection(firestore, 'articles'));
        await articlesRef.forEach(async (doc) => {
            let article = await {
                id: doc.id,
                name: doc.data().name,
                amount: doc.data().amount,
                img: doc.data().img,
                qte: doc.data().qte
            };
            articles.push(article);
        });
        resolve(articles);
    });
}

export async function getArticle(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        let articles: any[] = [];
        let articlesRef = await getDocs(collection(firestore, 'articles'));
        await articlesRef.forEach(async (doc) => {
            let article = await {
                id: doc.id,
                name: doc.data().name,
                amount: doc.data().amount,
                img: doc.data().img,
                qte: doc.data().qte
            };
            articles.push(article);
        });
        articles = await articles.filter(article => article.id === id);
        resolve(articles);
    });
}

