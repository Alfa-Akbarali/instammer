import './Style_signup.scss';
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from "../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [isUserUnique, setIsUserUnique] = useState(true);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!isUserUnique) {
      alert("Username is already taken.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        fullname: fullname,
        username: username,
        uid: user.uid,
        post: 0,
        followers: [],
        following: [],
        bio: null,
        pfp: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs.map((doc) => doc.data()));
    };
    getUsers();
  }, []);

  const isUserNameUnique = useCallback((username) => {
    const lowerUsername = username.toLowerCase();
    setIsUserUnique(!users.some((user) => user.username.toLowerCase() === lowerUsername));
  }, [users]);

  useEffect(() => {
    isUserNameUnique(username);
  }, [isUserNameUnique, username]);

  return (
    <div className="container_of_signup">
      <div className="signup_box">
        <div className="img_box">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram Logo" />
        </div>
        <form onSubmit={handleSignUp}>
          <div className="input_box">
            <input type="text" name="email" required placeholder="Mobile Number or Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" name="fullname" required placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ border: !isUserUnique ? "1px solid red" : "" }}
            />
            <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="btn">
              <button type="submit" name="submit" disabled={!isUserUnique}>Sign up</button>
            </div>
          </div>
        </form>
      </div>
      <div className="login_box">
        <p>Have an account? <Link className="link" to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
