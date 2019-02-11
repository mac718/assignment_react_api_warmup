import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import UserList from './UserList';
import UserForm from './UserForm';
import serialize from 'form-serialize'

const App = ({users, currentUser, isFetching, onAddUser, error, onDeleteUser, onEditUser, onChange}) => {

    return (
      <div className="App">
        <UserList users={users} 
          currentUser={currentUser} 
          isFetching={isFetching} 
          onDeleteUser={onDeleteUser} 
          onEditUser={onEditUser} />
        <br />
        <UserForm 
          onSubmit={onAddUser}
          error={error} 
          currentUser={currentUser}
          onChange={onChange}
        />
      </div>
    );
}

export default App;
