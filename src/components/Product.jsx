import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';
import CartPage from './CartPage';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('AUTH', auth?.user?.id);

  const API = 'http://localhost:1337/api';

  const toggleCart = () => {
    // setIsCartVisible(!isCartVisible);
    navigate('/cart');
    if (!loading) {
      fetchCartCount();
    }
  };
  const fetchCartCount = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API}/carts?filters[users_permissions_user][id][$eq]=${auth.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setCartCount(res.data.data.length);
    } catch (error) {
      console.error('Error fetching cart count', error);
    }
    setLoading(false);
  };

  console.log('CATEGORIES', categories);
  console.log('SELECTED', selectedCategory?.id);
  console.log('PRODUCTS', products);

  useEffect(() => {
    axios.get('/categories').then((res) => {
      setCategories(res?.data?.data);
    });
  }, []);

  useEffect(() => {
    if (auth?.user?.id) {
      console.log('auth loaded, fetching cart...');
      fetchCartCount();
    }
  }, [auth?.user?.id]);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`/products?category=${selectedCategory.id}`)
        .then((res) => setProducts(res?.data?.data));
    }
  }, [selectedCategory]);

  const handleAddToCart = async (productId) => {
    const axiosAuth = axios.create({
      baseURL: API,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    try {
      // 1. Check if the cart item already exists for the user and product
      const res = await axiosAuth.get(
        `/carts?filters[users_permissions_user][id][$eq]=${auth.user.id}&filters[products][id][$eq]=${productId}`
      );

      if (res.data.data.length > 0) {
        // 2. Product already in cart, update quantity
        const cartItem = res.data.data[0];
        const newQty = cartItem.attributes.quantity + 1;

        await axiosAuth.put(`/carts/${cartItem.id}`, {
          data: {
            quantity: newQty,
          },
        });
      } else {
        // 3. Product not in cart, create new cart item
        await axiosAuth.post(`/carts`, {
          data: {
            quantity: '1',
            users_permissions_user: auth.user.id,
            products: productId,
          },
        });
      }

      // ✅ Optionally re-fetch cart count here, if needed
      console.log('Product added to cart successfully');
    } catch (err) {
      console.error('Error handling cart:', err);
    }
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 shadow bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold">My E-Commerce</h1>
        <div className="relative">
          <button onClick={toggleCart} className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 rounded-full bg-red-600 text-white text-xs px-2 py-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4 border-r">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`cursor-pointer p-2 ${
                  selectedCategory?.id === cat?.id ? 'bg-gray-200' : ''
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid */}
        <div className="w-3/4 p-4 grid grid-cols-3 gap-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="border rounded-lg p-4 shadow hover:shadow-md"
            >
              <img
                src={prod.product_image}
                alt={prod.name}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="font-semibold">{prod.name}</h3>
              <p className="text-sm text-gray-600">{prod.price} ₹</p>
              <button
                onClick={() => handleAddToCart(prod.id)}
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
