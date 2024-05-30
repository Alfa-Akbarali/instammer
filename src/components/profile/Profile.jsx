import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './Style_profile.scss';
import { useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { handleFollow, isFollowed } from '../../functions';
import EditProfile from '../editprofile/EditProfile';
import test_photo from '../../assets/test_photo.jpg';

const Profile = () => {
  const { username } = useParams();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (username === currentUser.displayName) {
      setIsOwnProfile(true);
    }
  }, [username, currentUser]);

  const fetchData = useCallback(async () => {
    if (currentUser && username === currentUser.displayName) {
      setIsOwnProfile(true);
      const docref = doc(db, 'users', currentUser.uid);
      const snapDoc = await getDoc(docref);
      setUser(snapDoc.data());
    } else {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(userQuery);
      const userData = querySnapshot.docs[0].data();
      setUser(userData);
    }
    setLoading(false);
  }, [username, currentUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (user && user.uid) {
        const followingStatus = await isFollowed(user.uid);
        setIsFollowing(followingStatus);
      }
    };
    checkFollowStatus();
  }, [user]);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  console.log(auth);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <div className='container_profile'>
        <div className='profile'>
          <div className='img_box'>
            <img src={user.pfp} alt="Profile" />
          </div>

          <div className='username_box'>
            <div className='name_box'>
              <h2>{user.username}</h2>
              {isOwnProfile ? (
                <EditProfile user={user} />
              ) : (
                <button
                  onClick={() => handleFollow(user.uid, setIsFollowing, setUser)}
                  style={{ width: "100px", height: "30px" }}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <div className='follow_box'>
              <p><b>{user.post}</b> post</p>
              <p><b>{user.followers ? user.followers.length : 0}</b> followers</p>
              <p><b>{user.following ? user.following.length : 0}</b> following</p>
            </div>
            <div>
              <p>{user.fullname}</p>
            </div>
          </div>
        </div>

        <div className='post_box'>
            <div><img src={test_photo} alt="img" /></div>
            <div><img src={test_photo} alt="img" /></div>
            <div><img src={test_photo} alt="img" /></div>
            <div><img src={test_photo} alt="img" /></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
