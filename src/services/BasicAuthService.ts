import { getAuth } from 'firebase/auth';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserInfo, signOut } from '@firebase/auth';

export async function getActualUser(): Promise<Auth> {
    return new Promise(async (resolve, reject) => {
        let actualUser: Auth = await getAuth();
        
        if (actualUser) {
            resolve(actualUser);
        } else {
            reject('Not user exist');
        }
    });
}

export async function signin(email: string, password: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        let actualUser: Auth = await getActualUser();
        signInWithEmailAndPassword(actualUser, email, password)
        .then(result => {
            const user: UserInfo = result.user.providerData[0];
            if (email === user.email) {
                resolve(true);
            }
        })
        .catch(error => {
           reject(error.message);
        });
    });
}

export async function signup(email: string, password: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        let actualUser: Auth = await getActualUser();
        createUserWithEmailAndPassword(actualUser, email, password)
         .then(result => {
             console.log(result);
             resolve(true);
         })
         .catch(error => {
            reject(error.message);
         });
    });
}

export async function signout(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        let actualUser: Auth = await getActualUser();
        await signOut(actualUser)
         .then(() => {
             resolve(true);
         })
         .catch(error => {
             reject(error);
         });
    });
}