import React, { useEffect, useState, useCallback } from 'react';
import './style_all.scss';
import Sidebar from '../sidebar/Sidebar';
import UserCard from '../usercard/UserCard';
import { auth, db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const SuggestAll = () => {
    const [users, setUsers] = useState([]);

    const isOwnAcc = (user) => {
        return user.username !== auth.currentUser.displayName;
    };

    const fetchUsers = useCallback(async () => {
        const usersCol = collection(db, 'users');
        const userSnapshot = await getDocs(usersCol);
        const usersData = userSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setUsers(usersData.filter(isOwnAcc));
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className='container_all'>
            <Sidebar />
            <div className='main_all'>
                <p className='Suggested'>Suggested</p>
                <div>
                    {users.map((user) => (
                        <UserCard key={user.id} userinfo={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuggestAll;
