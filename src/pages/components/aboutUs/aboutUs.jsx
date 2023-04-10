import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import Hero from './hero'
import Mission from './mission'
import Subscribe from '@/pages/home/subscribe'

function AboutUs() {
  return (
    <div>
        <Header />
        <Hero />
        <Mission />
        <Subscribe />
        <Footer />
    </div>
  )
}

export default AboutUs