import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './UserInfo.css';
import UsersList from '../../../Components/UserList/UserList';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class UserInfo extends Component {

    state = {
        userInfo : {},
        userFollowersInfo: null,
        userReposInfo: null,
        loading : false,
        error : false
    }

    componentDidMount () {
        const user = this.props.match.params.user;
        axios.get('https://api.github.com/users/'+ user)
        .then((res) =>{
          this.setState({userInfo : res.data})
        })
        .catch((error)=>{
            this.setState ({error: true})
            console.log(error)
        })

    }
    getUserInfo = (url) => {
        this.setState({ loading : true})
        axios.get(url)
        .then (res=>{
            if(url.includes('repos')){
                this.setState({userReposInfo : res.data , userFollowersInfo: null})
            }
            else {
                this.setState({userFollowersInfo : res.data , userReposInfo: null})
            }
            this.setState ({loading: false})
        })
        .catch (err =>{
            this.setState ({error: true , loading: false})
        })
    }
    getUser = (userName) => {
        this.props.history.push('/' + userName)
    }
    componentDidUpdate (prevProps) {
        const user = this.props.match.params.user;
        if (prevProps.match.params.user !== user) {
            axios.get('https://api.github.com/users/'+ user)
            .then((res) =>{
              this.setState({userInfo : res.data, userFollowersInfo: []})
            })
            .catch((error)=>{
                this.setState ({error: true})
                console.log(error)
            })        }
    }

  render() {
    return (
        <Fragment>
            <div className="user-info-card" >
                <div className="user-info">
                    <div className="user-info-image">
                        <img src={this.state.userInfo.avatar_url} alt="" />
                    </div>
                    <div>
                        <p className="user-info-name">{this.state.userInfo.login}</p>
                    </div>
                    <div className="additional-info">
                    <div className="user-followers" onClick={()=>this.getUserInfo(this.state.userInfo.followers_url)}>
                        <b>{this.state.userInfo.followers}</b>
                        <p>Followers</p>
                    </div>
                    <div className="user-repos" onClick= {()=>this.getUserInfo(this.state.userInfo.repos_url)}>
                        <b>{this.state.userInfo.public_repos}</b>
                        <p>Repos</p>
                    </div>
                </div>
                </div>
            
            {
                this.state.loading ? (
                    <Spinner/>
                ) : ''
            }
            {
                this.state.userFollowersInfo ? ( <div className="user-info-userlist">
                    <UsersList usersInfo={this.state.userFollowersInfo} 
                    repos={false}
                    getUser ={(userName)=>this.getUser(userName)}/>
                    </div>
                ) : ''
            }  
            {
                this.state.userReposInfo ? (
                    <UsersList usersInfo={this.state.userReposInfo} repos={true}/>
                ) : ''
            }   
            </div> 
        </Fragment>
    );
  } 
}

export default UserInfo;
