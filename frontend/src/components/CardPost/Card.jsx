import React from "react"
import { timeline } from 'assets/css'
import { NavLink } from "react-router-dom";
import moment from "moment";


function Card(props) {

    var post = props.post

    return (
        <>
            <article data-key={post.id.toString()} className={timeline.timeline_article}>
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
                            <i className="fa-solid fa-heart" onClick={(e) => props.sendMG(e, data.mgs, data.id)} />
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

export default Card