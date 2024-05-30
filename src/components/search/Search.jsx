import React, { useEffect, useState, useCallback } from 'react'
import './style_search.scss';
import home_search from '../../assets/search.svg';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import UserCard from '../usercard/UserCard';

const Search = () => {
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleToggleSearch = () => {
    setSearch(!search);
  };

  const handleMainBoxClick = (e) => {
    e.stopPropagation();
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const fetchUsers = useCallback(async () => {
    const usersCol = collection(db, 'users')
    const userSnapshot = await getDocs(usersCol)
    const usersdata = userSnapshot.docs.map((userSnapshot) => {
      return { ...userSnapshot.data(), id: userSnapshot.id }
    })
    setUsers(usersdata.filter(isOwnAcc))
  }, []);

  const isOwnAcc = (e) => {
    return (e.username !== auth.currentUser.displayName)
  }

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(searchInput)
      )
    );
  }, [searchInput, users]);

  return (
    <div>
      <div className='container_search search_box' onClick={handleToggleSearch}>
        <img src={home_search} alt="img" /> Search
      </div>
      {search && (
        <div className='searching_box' onClick={handleToggleSearch}>
          <div className="main_box" onClick={handleMainBoxClick}>
            <h1>Searching</h1>

            <div className='search_byname_box'>
              <input type="search" value={searchInput} className="searchInput" onChange={handleSearchChange} />
            </div>

            <div>
              {filteredUsers.map((user) => (
                <UserCard key={user.id} userinfo={user} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search;
