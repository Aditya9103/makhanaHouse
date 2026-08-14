import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState(() => {
        const saved = localStorage.getItem("makhana_wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("makhana_wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        setWishlistItems(prev => {
            const exists = prev.some(item => item.id === product.id);
            if (exists) return prev;
            return [...prev, {
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image || (product.images ? product.images[0] : "/makhanabowl.png"),
                subtitle: product.subtitle || "Premium Grade"
            }];
        });
    };

    const removeFromWishlist = (id) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    const toggleWishlist = (product) => {
        setWishlistItems(prev => {
            const exists = prev.some(item => item.id === product.id);
            if (exists) {
                return prev.filter(item => item.id !== product.id);
            } else {
                return [...prev, {
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image || (product.images ? product.images[0] : "/makhanabowl.png"),
                    subtitle: product.subtitle || "Premium Grade"
                }];
            }
        });
    };

    const clearWishlist = () => setWishlistItems([]);

    const isInWishlist = (id) => {
        return wishlistItems.some(item => item.id === id);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => useContext(WishlistContext);
