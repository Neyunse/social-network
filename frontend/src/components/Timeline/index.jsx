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
                                                <article data-key={post.id} className={timeline.timeline_article} onClick={(e) => console.log('clic')}>
                                                    <NavLink className={timeline.a_header} to={`/profile/${post.user[0].username}`} >
                                                        <div className={timeline.a_header_img}>
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
                                                        </div>
                                                        <div className={timeline.a_header_info}>
                                                            <span>{post.user[0].username} <small>@{post.user[0].name} {moment(post.created_at).fromNow()}</small></span><br />
                                                        </div>
                                                    </NavLink>
                                                    <div className={timeline.a_body}>
                                                        <MarkDown string={post.body} />
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


    sendMG = async (e,pid) => {
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_APIURI}/posts/${pid}`, {
            mgs: +1
        })
        this.getArticles();
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
                                                <article data-key={post.id} className={timeline.timeline_article} onClick={(e) => console.log('clic')}>
                                                    <NavLink to={`/profile/${post.user[0].username}`} className={timeline.a_header}>
                                                        <div className={timeline.a_header_img}>
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
                                                        </div>
                                                        <div className={timeline.a_header_info}>
                                                            <span>{post.user[0].username} <small>@{post.user[0].name} {moment(post.created_at).fromNow()}</small></span><br />
                                                        </div>
                                                    </NavLink>
                                                    <div className={timeline.a_body}>
                                                        <MarkDown string={post.body} />
                                                    </div>
                                                    <div className={timeline.a_footer}>
                                                        <div className="heart">
                                                            <i className="fa-solid fa-heart" onClick={(e) => this.sendMG(e,post.id)} />
                                                            {" "}
                                                            <span>{post.mgs}</span>
                                                        </div>
                                                    </div>
                                                </article>
                                            </>
                                        )
                                    }
                                </>
                            ) : null
                            }
                            {console.log(post.user[0].id)}
                        </>
                    ))
                }
            </>
        );
    }

}

export default PublicTimeline;

export { UserTimeline };