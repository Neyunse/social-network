import React, { Component } from 'react';
import axios from 'axios'
import { Link, Redirect } from "react-router-dom";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '' || localStorage.getItem("username"),
      password: '' || localStorage.getItem("password"),
      loggedIn: '' || localStorage.getItem("loggedIn"),
      err: false,
      errmsg: '',
      redirect: false

    };
    this.handleChange = this.handleChange.bind(this);
    this.Auth = this.Auth.bind(this);
  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });

  }

    Auth = async (e) => {
      e.preventDefault();
      const { username, password } = this.state;
      const request = {
        "identifier": username,
        "password": password
      };
      try {
        await axios.post("http://localhost:1337/auth/local", request).then((response) => {
          localStorage.setItem('username', response.data.user.username);
          localStorage.setItem('password', password)
          localStorage.setItem('userID', response.data.user.id)
          localStorage.setItem('token', response.data.jwt)
          // ocalStorage.setItem("email", response.data.user.email)
          if (response.statusCode === 400) {
            console.log("error")
          }
          if (response.data.user.avatar === null) {
            localStorage.setItem('avatar', "undefined")
          } else {
            localStorage.setItem('avatar', response.data.user.avatar.url)
            localStorage.setItem('avatarID', response.data.user.avatar.id)
          }


          localStorage.setItem("loggedIn", "1")

          if (localStorage.getItem('username') !== null) this.setState({ loggedIn: true, redirect: true });;
          this.setState({ err: false })
        }).catch((error) => {
          if (error.response) {
            console.log(error.response.data.message[0].messages[0].id);
            if (error.response.data.message[0].messages[0].id === "Auth.form.error.invalid") {
              this.setState({ err: true, errmsg: "Invalid username or password." })
            } else if (error.response.data.message[0].messages[0].id === "Auth.form.error.blocked") {
              this.setState({ err: true, errmsg: "Your account is blocked." })
            }
          }
          // this.setState({ err: true })
        })


      } catch (error) {
        console.error(error)
        this.setState({ err: true })
      }

    }

    render() {
      const { username, password, loggedIn, err, redirect, errmsg } = this.state;
      let user
      let pass
      if (!username) {
        user = ""
      } else {
        user = username
      }
      if (!password) {
        pass = ""
      } else {
        pass = password
      }
      let error
      if (err) {
        error = (
          <>
            <div className="alert alert-danger" role="alert">
              {errmsg}
            </div>
          </>
        )

      }



      if (redirect || loggedIn) {
        return (<Redirect to={{ pathname: "/home" }} />);
      } else {
        return (
          <>

            <div className="container">
              <div className="form-cont">
                <form onSubmit={e => this.Auth(e)}>
                  {error}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">ID or Username</label>
                    <input required type="text" onChange={this.handleChange} value={user} name="username" placeholder='ID or Username' className="form-control" id="user" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your ID with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input required type="password" onChange={this.handleChange} name="password" value={pass} placeholder='Password' className="form-control" id="password" />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-danger login">Log In</button>
                    <Link to="/register" className="btn btn-primary login">New User</Link>
                  </div>

                </form>


              </div>
            </div>

          </>
        )
      }
    }
}

export default Auth;