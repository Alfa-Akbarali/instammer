import React, { useEffect, useState, useCallback } from "react";
import "./style_suggest.scss";
import UserCard from "../usercard/UserCard";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Suggest = ({ userData }) => {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isOwnAcc = useCallback((e) => {
    return e.username !== auth.currentUser.displayName;
  }, []);

  const fetchUsers = useCallback(async () => {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    const usersdata = userSnapshot.docs.map((userSnapshot) => {
      return { ...userSnapshot.data(), id: userSnapshot.id };
    });
    setUsers(usersdata.filter(isOwnAcc));
  }, [isOwnAcc]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container_suggest">
      <div className="header_suggest">
        <div>
          <img
            onClick={() => nav(`/${auth.currentUser.displayName}`)}
            src={userData.pfp}
            alt=""
          />
        </div>

        <div className="name_header">
          <p
            className="fullname"
            onClick={() => nav(`/${auth.currentUser.displayName}`)}
          >
            {userData.username}
          </p>
          <p className="name">{userData.fullname}</p>
        </div>

        <div className="follow_header">
          <p className="switch_text" style={{ cursor: "pointer" }}>
            switch
          </p>
        </div>
      </div>
      <div className="suggest_section">
        <div>
          <p className="suggest_for">Suggested for you</p>
          <p
            className="sea_all"
            style={{ cursor: "pointer" }}
            onClick={() => nav("/explore/people")}
          >
            See All
          </p>
        </div>
      </div>

      <div className="all_members">
        {users.slice(0, 5).map((user) => (
          <UserCard key={user.id} userinfo={user} />
        ))}
      </div>
    </div>
  );
};

export default Suggest;
