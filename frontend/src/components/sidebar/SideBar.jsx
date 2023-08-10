import React from 'react'
// import '../sidebar/Sidebar.css'
import Logo from '../../imgs/logo.png'
import './Sidebar.css'
import * as Unicons from '@iconscout/react-unicons';
import {SideBarData} from './Data/data'

const SideBar = () => {
  return (
   <div className="Sidebars">
    
     <div className="logo">
     <img src={Logo} />
     <span>Sm<span>a</span>rt</span>
     </div>

    {/* menu */}
<div className="menu">
{SideBarData.map((item,index)=>{
  return(
    <div className="menuitem">
  {/* <item.icon/>*/}

<span>{item.heading}</span>
</div>
  )  
})}
<div className="menuItem">
 
</div>
</div>


   </div>
  )
}

export default SideBar