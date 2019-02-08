import React from 'react';

const UserCard = ({user, onDeletUser}) => {
  const {first_name, last_name, avatar} = user;
  console.log(user)

  return (
    <div
      className="UserCard card"
      style={{maxWidth: '128px'}} 
    >
      <img
        className="card-img-top img-fluid"
        src={user.avatar}
        alt="user avatar"
      />
      <div className="card-block">
        <h4>{first_name} {last_name}</h4>
      </div>
      <a href='#' onClick={onDeletUser}>Delete User</a>
    </div>
  )
}

export default UserCard;