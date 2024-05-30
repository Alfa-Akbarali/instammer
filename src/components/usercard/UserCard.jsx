import React, { useEffect, useState } from 'react'
import './style_user.scss';
import test_photo from '../../assets/test_photo.jpg';
import { isFollowed, handleFollow } from '../../functions'
import { useNavigate } from 'react-router-dom';

const UserCard = ({ userinfo }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [setUserData] = useState(userinfo);
    const nav = useNavigate();

    useEffect(() => {
        const checkFollowStatus = async () => {
            const followingStatus = await isFollowed(userinfo.uid);
            setIsFollowing(followingStatus);
        };
        checkFollowStatus();
    }, [userinfo]);

    return (
        <div className='members_box'  >
            <div onClick={() => nav(`/${userinfo.username}`)} style={{ cursor: "pointer" }} >
                <img src={userinfo.pfp || test_photo} alt="img" />
            </div>
            <div className='name_header' onClick={() => nav(`/${userinfo.username}`)} style={{ cursor: "pointer" }} >
                <p className='fullname'>{userinfo.username}</p>
                <p className='name'>{userinfo.fullname}</p>
            </div>
            <div className='follow_header'>
                <p
                    style={{ cursor: "pointer" }}
                    onClick={() => handleFollow(userinfo.uid, setIsFollowing, setUserData)}
                >
                    {isFollowing ? "unfollow" : "follow"}
                </p>
            </div>
        </div>
    )
}

export default UserCard;
