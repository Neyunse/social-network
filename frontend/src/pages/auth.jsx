import React from 'react';
import { common, auth } from 'assets/css'
import axios from 'axios';
import world from 'assets/img/undraw_social_interaction_re_dyjh.svg'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false || JSON.parse(localStorage.getItem('isLoggedIn')),
            onLogin: false,
        };
    }

    componentDidMount() {
        if (localStorage.getItem('isLoggedIn') !== null) {

            localStorage.setItem('isLoggedIn', false);

        }
        this.redirectToHome();

    }

    componentWillUnmount() {
        this.redirectToHome();
    }

    redirectToHome() {
        console.log(this.state.isLoggedIn);
        if (this.state.isLoggedIn) {
            location.replace('/home');
        }
    }

    Login = async (e) => {
        e.preventDefault();
        this.setState({ onLogin: true });
        await axios.post('http://localhost:1337/auth/local', {
            // add your strapi login data
            identifier: "",
            password: ""
        }).then(res => res.data).then(data => {
            console.log(data);
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('username', data.user.username);
            localStorage.setItem("userID", data.user.id)
            localStorage.setItem('isLoggedIn', true);

            this.setState({ isLoggedIn: true });
            this.redirectToHome();
        }).catch(err => {
            console.log(err);
            this.setState({ onLogin: false });
        })
    }

    render() {
        return (
            <div className={common.row}>
                <div className={common.column + " " + auth.left_panel}>
                    <div className={auth.img_content}>
                        <img src={world} alt="" />
                    </div>
                </div>
                <div className={common.column + " " + auth.right_panel}>
                    <form autoComplete={false} onSubmit={(e) => this.Login(e)}>
                        <h1>Login to the community</h1>
                        <div className="input_name">
                            <label htmlFor="name"><i className="fas fa-user" /></label>
                            <input type="text" name="" id="name" />
                        </div>
                        <div className="input_pass">
                            <label htmlFor="pass"><i className="fas fa-key" /></label>
                            <input type="password" name="" id="pass" />
                        </div>
                        {this.state.onLogin ? (
                            <div className={auth.login}>
                                <input disabled tabIndex="0" type="submit" value="Login" />
                            </div>
                        ) : (
                            <div className={auth.login}>
                                <input type="submit" value="Login" />
                            </div>
                        )}

                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;
