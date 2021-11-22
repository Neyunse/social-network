import React from "react";
import axios from "axios";
import { timeline } from 'assets/css'
import moment from "moment";
import MarkDown from "./MarkDown";
import { NavLink } from "react-router-dom";


import { Card } from "../CardPost";

class UserTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user.toLowerCase(),
            data: [],
            isLoading: true,
        };
    }

    getArticles() {
        axios.get(`${process.env.REACT_APP_APIURI}/posts?_sort=created_at:desc&_where[user.name]=${this.state.user}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    isLoading: false
                })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getArticles();
    }


    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }

    sendMG = async (e, mgcount, pid) => {
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_APIURI}/posts/${pid}`, {
            mgs: mgcount + 1
        })
        this.getArticles();
    }

    PostStatus(user, id) {
        location.replace(`/status/${user}/${id}`)
    }

    render() {
        const { data, isLoading } = this.state;

        return (
            <>
                {
                    data.map(post => (
                        <>
                            {post.user.length > 0 ? (
                                <>
                                    {
                                        post.user[0].blocked ? null : (
                                            <>
                                                <Card post={post} onClick={() => this.PostStatus(post.user[0].username, post.id)} sendMG={this.sendMG} />
                                            </>
                                        )
                                    }
                                </>
                            ) : null
                            }
                        </>
                    ))
                }
            </>
        );
    }
}

class PublicTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        };
    }

    getArticles() {
        axios.get(`${process.env.REACT_APP_APIURI}/posts?_sort=created_at:desc`)
            .then(res => {
                this.setState({
                    data: res.data,
                    isLoading: false
                })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getArticles();
    }


    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }


    sendMG = async (e, mgcount, pid) => {
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_APIURI}/posts/${pid}`, {
            mgs: mgcount + 1
        })
        this.getArticles();
    }

    PostStatus(user, id) {
        location.replace(`/status/${user}/${id}`)
    }

    render() {
        const { data, isLoading } = this.state;

        return (
            <>
                {
                    data.map(post => (
                        <>
                            {post.user.length > 0 ? (
                                <>
                                    {
                                        post.user[0].blocked ? null : (
                                            <>
                                                <Card post={post} onClick={() => this.PostStatus(post.user[0].username, post.id)} sendMG={this.sendMG} />
                                            </>
                                        )
                                    }
                                </>
                            ) : null
                            }
                        </>
                    ))
                }
            </>
        );
    }

}


// Post page

class PostTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.username,
            pID: props.postID,
            post: [],
            userD: [],
            isLoading: true,
        };
    }

    getArticles = async () => {
        await axios.get(`${process.env.REACT_APP_APIURI}/posts/${this.state.pID}`)
            .then(res => res.data)
            .then(data => {

                this.setState({
                    post: data,
                    isLoading: false
                })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getArticles();
    }


    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }


    sendMG = async (e, mgcount, pid) => {
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_APIURI}/posts/${pid}`, {
            mgs: mgcount + 1
        })
        this.getArticles();
    }

    render() {
        const { post, isLoading, userD } = this.state;

    
        return (
            <>
                {isLoading ? null : (
                    <>
                        {post.user.length > 0 ? (
                            <>
                                {
                                    post.user[0].blocked ? null : (
                                        <>
                                            <Card post={post} sendMG={this.sendMG} />
                                        </>
                                    )
                                }
                            </>
                        ) : null
                        }
                    </>
                )}
            </>
        );
    }

}


class CommentsTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pID: props.postID,
            data: [],
            isLoading: true,
        };
    }

    getArticles = async () => {
        await axios.get(`http://localhost:1337/comments?_where[posts.id]=${this.state.pID}&_sort=created_at:desc`)
            .then(res => res.data)
            .then(data => {

                this.setState({
                    data: data,
                    isLoading: false
                })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getArticles();
    }


    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }


    sendMG = async (e, mgcount, pid) => {
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_APIURI}/comments/${pid}`, {
            mg: mgcount + 1
        })
        this.getArticles();
    }

    render() {
        const { data, isLoading, userD } = this.state;

        console.log(data)

        return (
            <>
                {
                    data.map(post => (
                        <>
                            {post.users.length > 0 ? (
                                <>
                                    {
                                        post.users[0].blocked ? null : (
                                            <>
                                                <Card post={post} sendMG={this.sendMG} />
                                            </>
                                        )
                                    }
                                </>
                            ) : null
                            }
                        </>
                    ))
                }
            </>
        );
    }

}

export default PublicTimeline;

export { UserTimeline, PostTimeline, CommentsTimeline };