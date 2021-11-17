import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import { aside } from '../../assets/css'

function search({ users }) {
    const [LiveSearch, setLiveSearch] = useState('');

    function handleChange(e) {
        setLiveSearch(e.target.value);
    }

    function ClearInput(){
        setLiveSearch('')
    }
    return (
        <div className={aside.search_box}>
            <input value={LiveSearch} type="text" onChange={(e) => handleChange(e)} placeholder="Search users" maxLength={20} />
            {LiveSearch.length > 0 ? (
                <div className={aside.result}>
                    <ul>
                        {users
                            .filter(user => user.name.includes(LiveSearch.trim().charAt(0).toLowerCase()))
                            .map(user => (
                                <>
                                    <li className={aside.result_item} key={user.id}>
                                        <NavLink onClick={()=>ClearInput()} to={`/profile/${user.name}`} className={aside.result_link}>
                                            <div className={aside.result_item_avatar}>
                                                <img src={user.avatar} alt="" />
                                            </div>
                                            <div className={aside.result_item_user}>
                                                <span>{user.name}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    
                                </>)
                            )
                        }
                    </ul>
                </div>
            ) : null}
        </div>
    );
}

export default search;