import React from 'react';
import Brand from './components/brand/Brand'
import CTA from './components/brand/Brand'
import Navbar from './components/navbar/Navbar'

import Header from './containers/header/Header'
import Features from './containers/features/Features'
import WhatGPT3 from './containers/whatGPT3/whatGPT3'
import Possibility from './containers/possibility/Possibility'
import Blog from './containers/blog/Blog'
import Footer from './containers/footer/Footer'


import './App.css';

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <WhatGPT3 />
    <Features />
    <Possibility />
    <CTA />
    <Blog />
    <Footer />
  </div>
);

export default App
