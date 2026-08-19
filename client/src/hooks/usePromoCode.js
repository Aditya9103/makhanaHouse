import { useState, useEffect } from 'react';

export const usePromoCode = () => {
    const [promoCode, setPromoCode] = useState(() => {
        const saved = localStorage.getItem('makhana_promo');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (promoCode) {
            localStorage.setItem('makhana_promo', JSON.stringify(promoCode));
        } else {
            localStorage.removeItem('makhana_promo');
        }
    }, [promoCode]);

    const applyPromo = (promoData) => {
        setPromoCode(promoData);
    };

    const removePromo = () => {
        setPromoCode(null);
    };

    return {
        promoCode,
        applyPromo,
        removePromo
    };
};
