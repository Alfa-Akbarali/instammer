import { arrayRemove, arrayUnion, doc, writeBatch } from "firebase/firestore";
import { auth, db } from "../firebase";
import { isFollowed } from "./";

export const handleFollow = async (targetUid, setIsFollow, setUserData) => {
  const following = await isFollowed(targetUid);
  if (following) {
    unfollow(targetUid, setUserData).then(() => {
      setIsFollow(false);
    });
  } else {
    follow(targetUid, setUserData).then(() => {
      setIsFollow(true);
    });
  }
};

export const follow = async (targetUid, setUserData) => {
  try {
    const batch = writeBatch(db);
    const targetDocRef = doc(db, "users", targetUid);
    const currentUserDocRef = doc(db, "users", auth.currentUser.uid);

    batch.update(targetDocRef, {
      followers: arrayUnion(auth.currentUser.uid),
    });
    batch.update(currentUserDocRef, {
      following: arrayUnion(targetUid),
    });

    await batch.commit();

    setUserData(prevState => ({
      ...prevState,
      followers: [...prevState.followers, auth.currentUser.uid]
    }));
  } catch (err) {
    console.log(err);
  }
};

export const unfollow = async (targetUid, setUserData) => {
  try {
    const batch = writeBatch(db);
    const targetDocRef = doc(db, "users", targetUid);
    const currentUserDocRef = doc(db, "users", auth.currentUser.uid);

    batch.update(targetDocRef, {
      followers: arrayRemove(auth.currentUser.uid),
    });
    batch.update(currentUserDocRef, {
      following: arrayRemove(targetUid),
    });

    await batch.commit();

    setUserData(prevState => ({
      ...prevState,
      followers: prevState.followers.filter(uid => uid !== auth.currentUser.uid)
    }));
  } catch (err) {
    console.log(err);
  }
};
