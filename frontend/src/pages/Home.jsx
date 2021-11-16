import React, { useState, useEffect } from 'react';
import { timeline } from 'assets/css'
import TextInput from 'components/PostInput';
import PublicTimeline from 'components/Timeline';

function Home() {
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
            <div className={scroll ? timeline.timeline_title+" "+timeline.fixed : timeline.timeline_title }>
                <h3>Home</h3>
            </div>
            <TextInput />
            <section>

                <PublicTimeline />

            </section>
        </>
    )
}

export default Home