import React, {Component} from 'react';
import App from '../components/App';
import serialize from 'form-serialize';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isFetching: false
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
    
    var options = {
      headers,
      method: 'POST',
      body: JSON.stringify(body)
    }

    this.setState({isFetching: true});

    fetch('https://reqres.in/api/users', options)
      .then(response => {
        if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          isFetching: false,
          users: [...this.state.users, json]
        }, () => { form.reset() })
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

  render() {
    return(
      <App onAddUser={this.onAddUser} onDeleteUser={this.onDeleteUser} {...this.state} />
    )
  }
}

export default AppContainer;