import React, { useEffect, useState } from 'react'
import './style_home.scss';
import Sidebar from '../sidebar/Sidebar';
import Post from '../post/Post';
import Suggest from '../suggest/Suggest'
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const Home = () => {
  const [userData, setUserData] = useState({})

  const fetchData = async() => {
    const userRef = doc(db, 'users', auth.currentUser.uid)
    const snapshot = await getDoc(userRef)
    setUserData(snapshot.data())
  }

  useEffect(()=> {
    fetchData()
  }, [])

  console.log(userData);

  return (
    <div className='container_home'> 
        <Sidebar/>
        <Post/>
        <Suggest userData={userData} />
    </div>
  )
}

export default Home;