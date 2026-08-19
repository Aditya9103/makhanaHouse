import { useGetCartQuery, useUpdateCartMutation } from '../store/api/usersApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useCart = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { data: cartItems = [] } = useGetCartQuery(undefined, { skip: !userInfo });
    const [updateCart] = useUpdateCartMutation();
    const navigate = useNavigate();

    const addToCart = async (product, quantity = 1, size = "250g") => {
        if (!userInfo) {
            navigate('/login?redirect=' + window.location.pathname);
            return;
        }

        // We only send the IDs back to the server for update
        let newCart = cartItems.map(item => ({
            product: item.product._id || item.product,
            quantity: item.quantity,
            size: item.size
        }));

        const existingItemIndex = newCart.findIndex(item => item.product === product.id && item.size === size);
        
        if (existingItemIndex >= 0) {
            newCart[existingItemIndex].quantity += quantity;
        } else {
            newCart.push({ product: product.id, quantity, size });
        }
        
        try {
            await updateCart(newCart).unwrap();
            toast.success(`Added ${quantity} to cart`);
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    const removeFromCart = async (id, size) => {
        if (!userInfo) return;
        const newCart = cartItems
            .filter(item => !(item.product._id === id && item.size === size))
            .map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                size: item.size
            }));
        await updateCart(newCart);
    };

    const updateQuantity = async (id, size, newQuantity) => {
        if (!userInfo || newQuantity < 1) return;
        const newCart = cartItems.map(item =>
            item.product._id === id && item.size === size
                ? { product: item.product._id, quantity: newQuantity, size: item.size }
                : { product: item.product._id, quantity: item.quantity, size: item.size }
        );
        await updateCart(newCart);
    };

    const clearCart = async () => {
        if (!userInfo) return;
        await updateCart([]);
    };

    // Map the populated backend objects to match exactly what the UI expects
    const mappedCartItems = cartItems.map(item => {
        // If population failed for some reason, provide defaults
        const prod = item.product || {};
        
        // Find price based on size if variations exist
        let price = 0;
        if (prod.variations && prod.variations.length > 0) {
            const v = prod.variations.find(v => v.weight === item.size);
            price = v ? v.price : prod.variations[0].price;
        } else if (prod.price) {
            price = prod.price; // fallback
        }

        return {
            id: prod._id,
            name: prod.name || 'Unknown Product',
            price: price,
            image: (prod.images && prod.images.length > 0) ? prod.images[0] : "/makhanabowl.png",
            size: item.size,
            quantity: item.quantity
        };
    });

    return { 
        cartItems: mappedCartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
    };
};
