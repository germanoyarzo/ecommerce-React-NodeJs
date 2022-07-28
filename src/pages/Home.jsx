import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Newsletter from '../components/Newsletter'
import Product from '../components/Product'
import Products from '../components/Products'
import Slider from '../components/Slider'
import Footer from '../components/Footer' 
const Home = () =>{
    return (
        <div>
           
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            <Newsletter/>
            <Footer />
        </div>
    )
}

export default Home