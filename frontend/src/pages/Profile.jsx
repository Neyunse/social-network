import React, { useState, useEffect } from 'react';

import { timeline } from 'assets/css'
import { UserTimeline } from 'components/Timeline';

function Profile(props) {

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

    return (
        <>
            <div className={scroll ? timeline.timeline_title + " " + timeline.fixed : timeline.timeline_title}>
                <div className="banner"></div>
                <h3>{props.match.params.username}</h3>
            </div>
            <section>
                <UserTimeline user={props.match.params.username} />
            </section>
        </>
    )
}

export default Profile;