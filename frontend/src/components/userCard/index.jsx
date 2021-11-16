import React from "react";
import { navv } from 'assets/css'
import axios from "axios";

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.userID,
            user: [],
            isLoading: true,
            userPicLoaded: false
        }
    }

    componentDidMount = async () => {
        await axios.get(`http://localhost:1337/users/${this.state.userID}`).then(res => res.data)
            .then(data => {
                this.setState({
                    user: data,
                    isLoading: false
                })
            })
    }

    render() {
        const { user, isLoading, userPicLoaded } = this.state;
        return (
            <>
                {isLoading ? null : (
                    <>
                        <div className={navv.card_header}
                            style={{
                                backgroundImage: `url(http://localhost:1337${user.banner.url})`
                            }}
                        ></div>
                        <div className={navv.card_body}>
                            <div className={navv.avatar}>
                                <img
                                onLoad={() => this.setState({ userPicLoaded: true })}
                                src={userPicLoaded ? `http://localhost:1337${user.avatar.url}` : "https://via.placeholder.com/150"} 
                                alt="" />
                            </div>
                            <h2 className={navv.name}>{user.username}</h2>
                        </div>
                    </>
                )}
            </>
        )
    }
}

export default UserCard;