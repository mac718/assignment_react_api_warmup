import React, {Component} from 'react';
import UserCard from './UserCard'

const UserList = ({users, isFetching, onDeleteUser, onEditUser}) => {

    const userList = users.map(user => (
      <UserCard 
        user={user} 
        onDeletUser={(e) => onDeleteUser(e, user.id)} 
        onEditUser={(e) => onEditUser(e, user.id)}
        key={user.id} />
    ))

    return (
      <div className='container'>
        <h1>User List</h1>
        <div className='card-group'>
          {isFetching ? <p>loading...</p> : userList}
        </div>
      </div>
    )

}

export default UserList;