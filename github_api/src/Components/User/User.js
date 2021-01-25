import React from 'react';
import './User.css';

const user = (props) => {

  let list = <div className="user-card" onClick={() => props.onUserClick(props.user.login)}>
              <div className="user-image">
                <img src={props.user.avatar_url} alt="" />
              </div>
              <div>
                <p className="user-name">{props.user.login}</p>
              </div>
            </div>
  if(props.repos) {
    list = <div className="user-card repo-card" > 
            <div>
              <p className="repo-name">{props.user.full_name}</p>
            </div>
          </div>
  }
  return (
    list
  );
};

export default user;