import React, {Component} from 'react';
import App from '../components/App';
import serialize from 'form-serialize';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isFetching: false,
      currentUser: {
        id: '',
        first_name: '',
        last_name: '',
        avatar: ''
      }
    }
  }

  componentDidMount() {
    this.setState({isFetching: true})

    fetch('https://reqres.in/api/users?delay=3')
      .then(response => response.json())
      .then(json => {
        this.setState({
          users: json.data,
          isFetching: false
        })
      })
  }

  onAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    var body = serialize(form, {hash: true});

    const headers = new Headers();
    headers.append('content-type', 'application/json');

    var method;
    var url;
    var userIndex;

    if(this.state.currentUser.id) {
      method = 'PATCH'
      url = `https://reqres.in/api/users/${this.state.currentUser.id}`
      userIndex = this.state.users.findIndex(user => {
        return user.id == this.state.currentUser.id
      })
    } else {
      method = 'POST'
      url = `https://reqres.in/api/users`
    }
    
    var options = {
      headers,
      method: method,
      body: JSON.stringify(body)
    }

    this.setState({isFetching: true});

    fetch(url, options)
      .then(response => {
        if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(json => {
        if(method == 'POST'){
          this.setState({
            isFetching: false,
            users: [...this.state.users, json]
          }, () => { form.reset() })
        } else {
          let users = this.state.users;
          users[userIndex].id = json.id || this.state.currentUser.id
          users[userIndex].first_name = json.first_name || this.state.currentUser.first_name 
          users[userIndex].last_name = json.last_name || this.state.currentUser.last_name
          users[userIndex].avatar = json.avatar || this.state.currentUser.avatar
          users[userIndex].updatedAt = json.updatedAt 
          this.setState({
            isFetching: false,
            users: [...users]
          }, () => { form.reset() })
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isFetching: false, 
          error
        })
      })
  }

  onDeleteUser = (e, userId) => {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    
    var options = {
      headers,
      method: 'DELETE',
    }

    var updatedUsers = this.state.users.filter(user => (
      user.id != userId
    ))

    this.setState({isFetching: true});

    fetch(`https://reqres.in/api/users/${userId}`, options)
      .then(response => {
        if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
      })
      .then(() => {
        this.setState({
          isFetching: false,
          users: [...updatedUsers]
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isFetching: false, 
          error
        })
      })
  }

  onEditUser = (e, userId) => {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    
    var options = {
      headers,
      method: 'PATCH',
    }

    var currentUser = this.state.users.filter(user => (
      user.id == userId
    ))

    this.setState({currentUser: currentUser[0]})
    console.log(this.state.currentUser)

    this.setState({isFetching: true});

    fetch(`https://reqres.in/api/users/${userId}`, options)
      .then(response => {
        if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => {
        this.setState({
          isFetching: false,
          //currentUser: JSON.stringify(json)
        })
        //console.log(this.state.currentUser)
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isFetching: false, 
          error
        })
      })
  }

  onChange = (e) => {
    this.setState({
      currentUser: {
        [e.target.name]: [e.target.value],
        ...this.state.currentUser,
      }
    }, console.log(this.state.currentUser.first_name))
  } 

  render() {
    return(
      <App onAddUser={this.onAddUser} 
           onDeleteUser={this.onDeleteUser} 
           onEditUser={this.onEditUser} 
           onChange={this.onChange} 
           {...this.state} />
    )
  }
}

export default AppContainer;