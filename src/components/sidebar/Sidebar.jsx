import React from 'react';
import './style_sidebar.scss';
import home_icon from '../../assets/home.svg';
import Search from '../search/Search';
import home_add from '../../assets/add.png';
import home_profile from '../../assets/user.png';
import LogOut from '../../assets/logout_icon.svg';
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const nav = useNavigate();
  return (
    <div className='container_sidebar'>
      <div>
        <div className='img_box' onClick={() => nav('/')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="img" />
        </div>
        <div className='bgn'>
          <div className='home_box' onClick={() => nav('/')}>
            <img className='images_box' src={home_icon} alt="img" /> Home
          </div>
            <Search />
          <div className='create_box'>
            <img className='images_box' src={home_add} alt="img" /> Create
          </div>
          <div className='profile_box' onClick={() => nav(`/${auth.currentUser.displayName}`)}>
            <img className='images_box' src={home_profile} alt="img" /> Profile
          </div>
        </div>
      </div>
      <div className='logout_box'>
        <Link onClick={() => signOut(auth)}>
          <img className='images_box' src={LogOut} alt="img" />Sign Out
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;