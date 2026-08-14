import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("makhana_cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("makhana_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, size = "250g") => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id && item.size === size);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images ? product.images[0] : "/makhanabowl.png",
                size: size,
                quantity: quantity
            }];
        });
    };

    const removeFromCart = (id, size) => {
        setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
    };

    const updateQuantity = (id, size, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev => prev.map(item =>
            item.id === id && item.size === size
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
