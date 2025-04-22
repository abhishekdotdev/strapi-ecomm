import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const API = 'http://localhost:1337/api';

export default function CartPage() {
  const { auth } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  console.log('CARTITEMS', cartItems);

  const axiosAuth = axios.create({
    baseURL: API,
    headers: {
      Authorization: `Bearer ${auth?.token}`,
    },
  });

  const fetchCart = async () => {
    try {
      const res = await axiosAuth.get(
        `/carts?filters[users_permissions_user][id][$eq]=${auth.user.id}&populate=products`
      );
      setCartItems(res.data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    if (auth?.user?.id) {
      fetchCart();
    }
  }, [auth?.user?.id]);

  const updateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return deleteItem(cartId);
    await axiosAuth.put(`/carts/${cartId}`, {
      data: { quantity },
    });
    fetchCart();
  };

  const deleteItem = async (cartId) => {
    await axiosAuth.delete(`/carts/${cartId}`);
    fetchCart();
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    console.log('ITEM', item.quantity);
    const price = item?.products[0]?.price;
    return sum + item.quantity * price;
  }, 0);

  console.log('TOTAL', totalPrice);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const product = item.products[0];
            console.log('PRODUCT', product);
            console.log('ITEM', item);

            return (
              <div
                key={item.id}
                className="flex items-center gap-4 border p-4 rounded shadow-sm"
              >
                <img
                  src={product.product_image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-600">₹{product.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item?.documentId, item?.quantity - 1)
                    }
                    className="p-2 rounded border"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-[32px] text-center">
                    {item?.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.documentId, item.quantity + 1)
                    }
                    className="p-2 rounded border"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => deleteItem(item.documentId)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}

          <div className="mt-6 text-right">
            <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
}
