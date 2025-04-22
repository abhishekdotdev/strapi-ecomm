import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/login';
import { Toaster } from 'react-hot-toast';
import Product from './pages/Product';
import HomePage from './pages/HomePage';
import CartPage from './components/CartPage';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
