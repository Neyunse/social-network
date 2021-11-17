import React, { useState, useEffect } from 'react';
import { timeline } from 'assets/css'
import TextInput from 'components/PostInput';
import { PostTimeline, CommentsTimeline } from 'components/Timeline';
import { useParams, Redirect } from "react-router-dom";


function Post(props) {
    const [scroll, setScroll] = useState(false);

    useEffect(
        () => {
            const handleScroll = () => {
                if (window.pageYOffset > 0) {
                    if (!scroll) {
                        setScroll(true)
                    }
                } else if (scroll) {
                    setScroll(false)
                }
            }

            window.addEventListener("scroll", handleScroll)
            return () => {
                window.removeEventListener("scroll", handleScroll)
            }
        },
        [scroll],
    )


    const { username, id } = useParams()

    console.log(username, id)

    return (
        <>
            <div className={scroll ? timeline.timeline_title + " " + timeline.fixed : timeline.timeline_title}>
                <h3>Thread</h3>
            </div>
            <section>
                <PostTimeline username={username} postID={id} />
            </section>
            <TextInput type="reply" postID={id} />
            <section>
                <CommentsTimeline postID={id} />
            </section>
        </>
    )
}

export default Post