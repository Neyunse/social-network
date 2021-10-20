import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from 'axios';

const backendUrl = process.env.REACT_APP_APIURI;

const LoginRedirect = (props) => {
    const [text, setText] = useState('Loading...');
    const location = useLocation();
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        // Successfully logged with the provider
        // Now logging with strapi by using the access_token (given by the provider) in props.location.search
        fetch(`${backendUrl}/auth/${params.providerName}/callback${location.search}`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
                }
                console.log(res);
                return res;
            })
            .then(res => res.json())
            .then(async (res) => {
                console.log(res);
                // Successfully logged with Strapi
                // Now saving the jwt to use it for future authenticated requests to Strapi

                if (res.user.avatar === null || res.user.picture === null) {
                    await axios.get(`${backendUrl}/avatars/${res.user.username}`).then(async (avatar) => {
                        console.log(avatar.data.url);
                        const config = {
                            picture: avatar.data.url,
                        }
                        const headers = {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${res.jwt}`
                        }
                        await axios.put(`${backendUrl}/users/${res.user.id}`, config, headers)
                        localStorage.setItem('token', res.jwt);
                        localStorage.setItem('username', res.user.username);
                        localStorage.setItem('userID', res.user.id);
                    })
                    // setTimeout(() => history.push(window.location.href), 3000);
                } else {
                    localStorage.setItem('token', res.jwt);
                    localStorage.setItem('username', res.user.username);
                    localStorage.setItem('userID', res.user.id);
                    // localStorage.setItem('avatar', res.user.avatar.url)
                    // localStorage.setItem('avatarID', res.user.avatar.id)
                }

                setText('You have been successfully logged in. You will be redirected in a few seconds...');
                setTimeout(() => history.push('/home'), 3000); // Redirect to homepage after 3 sec
            })
            .catch(err => {
                console.log(err);
                setText('An error occurred, please see the developer console.')
            });
    }, [history, location.search, params.providerName]);

    return <p>{text}aaa</p>
};

export default LoginRedirect;