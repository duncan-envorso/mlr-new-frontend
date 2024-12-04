import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useCart } from '../cart/cart-context';

const CartModal = dynamic(() => import('../cart/modal'), {
    ssr: false
});

const HeaderCart = () => {
    const { cart } = useCart();
    const quantity = cart?.totalQuantity || 0;

    return (
        <div>
            <CartModal />
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center cursor-pointer ml-4"
            >

                {quantity > 0 && (
                    <div className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-accent text-white rounded-full text-xs font-bold">
                        {quantity}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default HeaderCart;