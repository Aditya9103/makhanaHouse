import { useGetWishlistQuery, useToggleWishlistMutation } from '../store/api/usersApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useWishlist = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { data: rawWishlistItems = [] } = useGetWishlistQuery(undefined, { skip: !userInfo });
    const [toggleWishlistMutation] = useToggleWishlistMutation();
    const navigate = useNavigate();

    const toggleWishlist = async (product) => {
        if (!userInfo) {
            navigate('/login?redirect=' + window.location.pathname);
            return;
        }
        await toggleWishlistMutation(product.id);
    };

    const removeFromWishlist = async (id) => {
        if (!userInfo) return;
        // The endpoint is a toggle, so calling it if it's already there will remove it
        const isInWishlist = rawWishlistItems.some(item => (item._id || item) === id);
        if (isInWishlist) {
            await toggleWishlistMutation(id);
        }
    };

    const isInWishlist = (id) => {
        return rawWishlistItems.some(item => (item._id || item) === id);
    };

    // Map the populated backend objects to match exactly what the UI expects
    const mappedWishlistItems = rawWishlistItems.map(item => {
        // Fallbacks in case it's not populated correctly
        const id = item._id || item;
        const price = (item.variations && item.variations.length > 0) ? item.variations[0].price : (item.price || 0);

        return {
            id,
            name: item.name || 'Unknown Product',
            price,
            image: (item.images && item.images.length > 0) ? item.images[0] : "/makhanabowl.png",
        };
    });

    return { 
        wishlistItems: mappedWishlistItems, 
        toggleWishlist, 
        removeFromWishlist, 
        isInWishlist 
    };
};
