import React from 'react';
import Input from '../elements/Input';
import InputGroup from '../elements/InputGroup';
import Button from '../elements/Button';
import Showable from '../elements/Showable';
import Alert from '../elements/Alert';

const UserForm = ({onSubmit, error, currentUser, onChange}) => {
  return(
    <form className='container' onSubmit={onSubmit} >
      <h1>Add A New User</h1>
      <Showable show={error}>
        <Alert type='danger'>
          Oops, there was a problem...
        </Alert>
      </Showable>
      <InputGroup name='first_name' labelText='First Name'>
        <Input name="first_name" placeholder={currentUser.first_name} onChange={onChange} />
      </InputGroup>
      <InputGroup name='last_name' labelText='Last Name'>
        <Input name="last_name" placeholder={currentUser.last_name} onChange={onChange} />
      </InputGroup>
      <InputGroup name='avatar' labelText='Photo Link'>
        <Input name="avatar" placeholder={currentUser.avatar} onChange={onChange} />
      </InputGroup>
      <Button type='submit' color='primary'>
        Save User
      </Button>
    </form>
  )
}

export default UserForm;