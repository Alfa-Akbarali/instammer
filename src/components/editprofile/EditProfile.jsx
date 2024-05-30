import React, { useState, useEffect, useCallback } from 'react';
import './EditProfile.scss';
import { db, storage } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.fullname);
    const [bio, setBio] = useState(user.bio);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(user.pfp);
    const [users, setUsers] = useState([]);
    const [isUserUnique, setIsUserUnique] = useState(true);

    const navigate = useNavigate();

    // Initialize the auth object
    const auth = getAuth();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const uploadImage = async () => {
        if (!image) return null;
        const imageRef = ref(storage, `profileImages/${user.uid}/${image.name}`);
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
    };

    const handleSave = async () => {
        if (!isUserUnique) {
            alert("Username is not unique!");
            return;
        }

        try {
            let newImageURL = imageURL;
            if (image) {
                newImageURL = await uploadImage();
            }
            await updateProfile(auth.currentUser, {
                displayName: username,
            });

            await updateEmail(auth.currentUser, email);

            if (password) {
                await updatePassword(auth.currentUser, password);
            }

            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                username: username,
                fullname: name,
                bio: bio,
                pfp: newImageURL,
                email: email,
            });

            setImageURL(newImageURL);
            setOpen(false);
        } catch (error) {
            console.error("Error updating profile: ", error);
        } finally {
            navigate(`/${username}`);
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            setUsers(querySnapshot.docs.map((doc) => doc.data()));
        }
        getUsers();
    }, []);

    const isUserNameUnique = useCallback((e) => {
        const lowerCaseUsername = e.toLowerCase();
        setIsUserUnique(!(
          users.some((existingUser) => existingUser.username.toLowerCase() === lowerCaseUsername && existingUser.uid !== user.uid)
        ));
      }, [users, user.uid]);

    useEffect(() => {
        isUserNameUnique(username);
    }, [username, isUserNameUnique]);

    return (
        <div className='edit_container'>
            <div className='edit_profile' onClick={handleOpen}>
                EditProfile
            </div>
            {
                open && <div className='main_edit' onClick={handleOpen}>
                    <div className='blur_edit' onClick={stopPropagation}>
                        <div className='edit_box'>
                            <p>Edit your profile</p>
                        </div>
                        <div className='input_box'>
                            <input type="text" placeholder='Username' value={username} onChange={(e) => {
                                setUsername(e.target.value);
                                isUserNameUnique(e.target.value);
                            }} style={{ border: !isUserUnique ? "1px solid red" : "" }} />
                            <input type="text" placeholder='Fullname' value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <textarea type="bio" placeholder='Bio' value={bio} onChange={(e) => setBio(e.target.value)} />
                        </div>
                        <div>
                            <input type="file" id='file' accept='image/*' hidden onChange={handleImageUpload} />
                            <label htmlFor="file">Upload Image</label>
                        </div>
                        <p>{image && image.name}</p>
                        <div className='save_box' onClick={handleSave}>
                            Save
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default EditProfile;
