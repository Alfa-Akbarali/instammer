import React from 'react'
import './Style_post.scss';
import test_photo from '../../assets/test_photo.jpg';
import profile from '../../assets/user.png';
import nolike from '../../assets/nolike.png';
// import likes from '../../assets/likes.png';
import comment from '../../assets/comment.png'

const Post = () => {
  return (
    <div className='container_render'>


      <div className="header">
        <div>
          <img src={profile} alt="img" />
        </div>
        <div>
          <p>Name</p>
        </div>
      </div>

      <div className='main_page'>
        <img src={test_photo} alt="img" />
        <div className="likes_box">
          <img src={nolike} alt="img" />
          <img src={comment} alt="img" />
          <p><b>123,24 likes</b></p>
          <p> <b>Name </b>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <input
          type="text"
          placeholder="Add a comment.." />
        </div>
      </div>
      
      {/* example card 2 */}

      <div className="header">
        <div>
          <img src={profile} alt="img" />
        </div>
        <div>
          <p>Name</p>
        </div>
      </div>

      <div className='main_page'>
        <img src={test_photo} alt="img" />
        <div className="likes_box">
          <img src={nolike} alt="img" />
          <img src={comment} alt="img" />
          <p><b>123,24 likes</b></p>
          <p> <b>Name </b>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <input
          type="text"
          placeholder="Add a comment.." />
        </div>
      </div>

    </div>
  )
}

export default Post;