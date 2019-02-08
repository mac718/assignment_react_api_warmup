import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import UserList from './UserList';
import UserForm from './UserForm';
import serialize from 'form-serialize'

const App = ({users, isFetching, onAddUser, error, onDeleteUser}) => {

    return (
      <div className="App">
        <UserList users={users} isFetching={isFetching} onDeleteUser={onDeleteUser} />
        <br />
        <UserForm 
          onSubmit={onAddUser}
          error={error} 
        />
      </div>
    );
}

export default App;
