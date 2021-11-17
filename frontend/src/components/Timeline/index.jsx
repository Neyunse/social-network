import React from "react";
import axios from "axios";
import { timeline } from 'assets/css'
import moment from "moment";
import MarkDown from "./MarkDown";
import { NavLink } from "react-router-dom";

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
                                                <article data-key={post.id.toString()} className={timeline.timeline_article} onClick={() => this.PostStatus(post.user[0].username, post.id)}>
                                                    <div className={timeline.a_header}>
                                                        <NavLink to={`/profile/${post.user[0].username}`} className={timeline.a_header_img}>
                                                            {post.user[0].avatar ? (
                                                                <>
                                                                    <img
                                                                        className="post_image_profile_user"
                                                                        src={`${process.env.REACT_APP_APIURI}${post.user[0].avatar.url}`}
                                                                        alt=""
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img
                                                                        className="post_image_profile_user"
                                                                        src={`${post.user[0].picture}`}
                                                                        alt=""
                                                                    />
                                                                </>
                                                            )}
                                                        </NavLink>
                                                        <div className={timeline.a_header_info}>
                                                            <NavLink to={`/profile/${post.user[0].username}`}>{post.user[0].username}</NavLink> <small>@{post.user[0].name} {moment(post.created_at).fromNow()}</small><br />
                                                        </div>
                                                    </div>
                                                    <div className={timeline.a_body}>
                                                        <MarkDown string={post.body} />
                                                    </div>
                                                    <div className={timeline.a_footer}>
                                                        <div className={timeline.icons}>
                                                            <div className="heart">
                                                                <i className="fa-solid fa-heart" onClick={(e) => this.sendMG(e, data.mgs, data.id)} />
                                                                {" "}
                                                                <span>{post.mgs}</span>
                                                                {" "}
                                                            </div>

                                                            <div className="comments">

                                                                <i className="fa-solid fa-comment" />
                                                                {" "}
                                                                <span>{post.comments.length}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
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
                                                <article data-key={post.id.toString()} className={timeline.timeline_article} onClick={() => this.PostStatus(post.user[0].username, post.id)}>
                                                    <div className={timeline.a_header}>
                                                        <NavLink to={`/profile/${post.user[0].username}`} className={timeline.a_header_img}>
                                                            {post.user[0].avatar ? (
                                                                <>
                                                                    <img
                                                                        className="post_image_profile_user"
                                                                        src={`${process.env.REACT_APP_APIURI}${post.user[0].avatar.url}`}
                                                                        alt=""
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img
                                                                        className="post_image_profile_user"
                                                                        src={`${post.user[0].picture}`}
                                                                        alt=""
                                                                    />
                                                                </>
                                                            )}
                                                        </NavLink>
                                                        <div className={timeline.a_header_info}>
                                                            <NavLink to={`/profile/${post.user[0].username}`}>{post.user[0].username}</NavLink> <small>@{post.user[0].name} {moment(post.created_at).fromNow()}</small><br />
                                                        </div>
                                                    </div>
                                                    <div className={timeline.a_body}>
                                                        <MarkDown string={post.body} />
                                                    </div>
                                                    <div className={timeline.a_footer}>
                                                        <div className={timeline.icons}>
                                                            <div className="heart">
                                                                <i className="fa-solid fa-heart" onClick={(e) => this.sendMG(e, data.mgs, data.id)} />
                                                                {" "}
                                                                <span>{post.mgs}</span>
                                                                {" "}
                                                            </div>

                                                            <div className="comments">

                                                                <i className="fa-solid fa-comment" />
                                                                {" "}
                                                                <span>{post.comments.length}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
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
            data: [],
            userD: [],
            isLoading: true,
        };
    }

    getArticles = async () => {
        await axios.get(`${process.env.REACT_APP_APIURI}/posts/${this.state.pID}`)
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
        await axios.put(`${process.env.REACT_APP_APIURI}/posts/${pid}`, {
            mgs: mgcount + 1
        })
        this.getArticles();
    }

    render() {
        const { data, isLoading, userD } = this.state;

        console.log(data)

        return (
            <>
                {isLoading ? null : (
                    <>
                        {data.user.length > 0 ? (
                            <>
                                {
                                    data.user[0].blocked ? null : (
                                        <>
                                            <article data-key={data.id.toString()} className={timeline.timeline_article} onClick={(e) => console.log('clic')}>
                                                <div className={timeline.a_header}>
                                                    <NavLink to={`/profile/${data.user[0].username}`} className={timeline.a_header_img}>
                                                        {data.user[0].avatar ? (
                                                            <>
                                                                <img
                                                                    className="post_image_profile_user"
                                                                    src={`${process.env.REACT_APP_APIURI}${data.user[0].avatar.url}`}
                                                                    alt=""
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <img
                                                                    className="post_image_profile_user"
                                                                    src={`${data.user[0].picture}`}
                                                                    alt=""
                                                                />
                                                            </>
                                                        )}
                                                    </NavLink>
                                                    <div className={timeline.a_header_info}>
                                                        <NavLink to={`/profile/${data.user[0].username}`}>{data.user[0].username}</NavLink> <small>@{data.user[0].name} {moment(data.created_at).fromNow()}</small><br />
                                                    </div>
                                                </div>
                                                <div className={timeline.a_body}>
                                                    <MarkDown string={data.body} />
                                                </div>
                                                <div className={timeline.a_footer}>
                                                    <div className={timeline.icons}>
                                                        <div className="heart">
                                                            <i className="fa-solid fa-heart" onClick={(e) => this.sendMG(e, data.mgs, data.id)} />
                                                            {" "}
                                                            <span>{data.mgs}</span>
                                                            {" "}
                                                        </div>

                                                        <div className="comments">

                                                            <i className="fa-solid fa-comment" />
                                                            {" "}
                                                            <span>{data.comments.length}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>

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
                                                <article data-key={post.id.toString()} className={timeline.timeline_article} onClick={(e) => console.log('clic')}>
                                                    <div className={timeline.a_header}>
                                                        <NavLink to={`/profile/${post.users[0].username}`} className={timeline.a_header_img}>
                                                            {post.users[0].avatar ? (
                                                                <>
                                                                    <img
                                                                        className="post_image_profile_user"
                                                                        src={`${process.env.REACT_APP_APIURI}${post.users[0].avatar.url}`}
                                                                        alt=""
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img
                                                                        className="post_image_profile_user"
                                                                        src={`${post.users[0].picture}`}
                                                                        alt=""
                                                                    />
                                                                </>
                                                            )}
                                                        </NavLink>
                                                        <div className={timeline.a_header_info}>
                                                            <NavLink to={`/profile/${post.users[0].username}`}>{post.users[0].username}</NavLink> <small>@{post.users[0].name} {moment(post.created_at).fromNow()}</small><br />
                                                        </div>
                                                    </div>
                                                    <div className={timeline.a_body}>
                                                        <MarkDown string={post.body} />
                                                    </div>
                                                    <div className={timeline.a_footer}>
                                                        <div className={timeline.icons}>
                                                            <div className="heart">
                                                                <i className="fa-solid fa-heart" onClick={(e) => this.sendMG(e, post.mg, post.id)} />
                                                                {" "}
                                                                <span>{post.mg}</span>
                                                                {" "}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
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