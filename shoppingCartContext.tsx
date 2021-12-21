import React, { createContext, useState } from 'react';

// export const ShoppingCartContext = createContext({
//     cart: [] as object[],
//     addArticleToCart: (cart: any, article: any) => {},
//     removeArticleFromCart: (article: any) => {}
// });
export const ShoppingCartContext = createContext([] as any);
export const ShoppingCartProvider = (props: any) => {
    const [cart, setCart] = useState([]);
    return (
        <ShoppingCartContext.Provider value={[cart, setCart]}>
            {props.children}
        </ShoppingCartContext.Provider>
    );
}

