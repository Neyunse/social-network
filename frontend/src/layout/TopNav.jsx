/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";
import Verified from "assets/icons/verified";
import { Link } from "react-router-dom";
/* eslint-disable */
let source;
class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            search: []
        };
        source = axios.CancelToken.source();
    }
    GetUsers = async () => {
        const res = await axios.get(`${process.env.REACT_APP_APIURI}/users`, {
            cancelToken: source.token,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        this.setState({ users: res.data });
    }
    componentDidMount() {
        this.GetUsers();
    }
    searchChanged = (event) => {
        this.setState({ search: event.target.value })
        this.GetUsers();
    }
    componentWillUnmount() {
        if (source) {
            source.cancel("Landing Component got unmounted");
        }
    }
    render() {
        return (
            <header>
                <div className="container_top_nav">
                    <div className="logo">
                        <span>KagariNetwork</span>
                    </div>
                    <div className="searcher">
                        <input type="text" onChange={this.searchChanged} value={this.state.search} placeholder="Search" />
                    </div>
                </div>
                {this.state.search.length > 0 ? (<>
                    <div className="result">
                        <nav>
                            <ul>
                                {this.state.users
                                    .filter(user => user.username.includes(this.state.search))
                                    .map(user => (console.log(user.length),
                                        <>
                                            {user.username.includes(this.state.search) ? (<>
                                                <li key={user.id}>
                                                    <Link to={`/u/${user.username}`} onClick={() => this.setState({ search: "" })} >
                                                        <div className="user_S">
                                                            <div className="user_S_img">
                                                                <img src={`${process.env.REACT_APP_APIURI}${user.avatar.url}`} alt={user.username} />
                                                            </div>
                                                            <div className="user_S_name">
                                                                <span>{user.username}{user.verified ? (
                                                                    <Verified className="verified" />
                                                                ) : null}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </>) : (<li>User not found</li>)}
                                        </>
                                    )
                                    )}

                            </ul>
                        </nav>
                    </div>
                </>) : null}
            </header>
        );
    }
}

export default TopNav;