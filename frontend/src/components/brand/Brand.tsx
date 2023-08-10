import React from 'react';
import './brand.css';

import google from '/src/assets/google.png'
import slack from '/src/assets/slack.png'
import atlassian from '/src/assets/atlassian.png'
import dropbox from '/src/assets/dropbox.png'
import shopify from '/src/assets/shopify.png'


const Brand = () => (
  <div className="gpt3__brand section__padding">
    <div>
      <img src={google} />
    </div>
    <div>
      <img src={slack} />
    </div>
    <div>
      <img src={atlassian} />
    </div>
    <div>
      <img src={dropbox} />
    </div>
    <div>
      <img src={shopify} />
    </div>
  </div>
);

export default Brand;