import React from 'react';
import people from '../../assets/people.png';
import ai from '/src/assets/ai.png'
import './header.css';
import { RiAlignCenter } from 'react-icons/ri';


const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Let&apos;s Build Something amazing with GPTHome</h1>
      <p>We create and install market-leading home automation systems that let you manage every aspect of your house through a single, easy-to-use app. By adding features like automated blinds, lighting control, and multi-room audio, you can transform your property into a smart home.</p>

      <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>

      <div className="gpt3__header-content__input2">
          <button type="button">Try Now!!!</button>
      </div>
    </div>

    <div className="gpt3__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;