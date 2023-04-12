import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Category from '../pages/Category'
import Login from '../pages/Login'
import User from '../pages/User'
import Register from '../pages/Register'
import ProductDetail from '../pages/ProductDetail'

export default function AppRoutes() {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-products' element={<Category />} />
        <Route path='/:categoryId' element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product-detail' element={<ProductDetail />} />
    </Routes>
}