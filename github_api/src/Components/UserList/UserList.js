import React from 'react';
import User from '../User/User';
import './UserList.css';

const usersList =  (props) => {
    return (
      <div className="users-list">
        {
          props.usersInfo.map((user)=>{
            return <User key={user.id} repos={props.repos} user={user} onUserClick={(userName)=>props.getUser(userName)}/>
          })
        }
      </div>
    );
  
}

export default usersList;
