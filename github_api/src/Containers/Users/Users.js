import React, { Component } from 'react';
import './Users.css';
import axios from 'axios';
import UsersList from '../../Components/UserList/UserList';
import Spinner from '../../Components/UI/Spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

class Users extends Component {
  state = {
    users: null,
    searchName: '',
    error: false,
    hasMore: true,
    since: 1,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`https://api.github.com/users?since=${this.state.since}`)
      .then((res) => {
        this.setState({ users: res.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: true, loading: false, hasMore: false });
      });
  }

  fetchMoreData = () => {
    let nextData = this.state.users
      ? this.state.users[this.state.users.length - 1].id
      : 1;

    if (this.state.hasMore) {
      try {
        axios
          .get(`https://api.github.com/users?since=${nextData}`)
          .then((res) => {
            if (res.data.length > 0) {
              this.setState((state) => ({
                hasMore: true,
                since: nextData,
                users: [...state.users, ...res.data],
              }));
            } else {
              this.setState({
                hasMore: false,
              });
            }
          });
      } catch (error) {
        this.setState({
          hasMore: false,
        });
      }
    }
  };
  onChangeHandler = (event) => {
    this.setState({
      searchName: event.target.value,
    });
  };

  getUser = (userName) => {
    this.props.history.push('/' + userName);
  };

  render() {
    const filteredList = this.state.users ? this.state.users.filter((user) =>
      this.state.searchName
        ? user.login.includes(this.state.searchName)
        : user
    ) : [];
    
    return (
      <div className="users-container">
        <div className="flex search-nav">
          <input
            type="text"
            placeholder="Search.."
            name="search"
            value={this.state.searchName}
            onChange={this.onChangeHandler}
          />
        </div>

        <div className="users-list">
          {this.state.searchName ? (
            <UsersList
            repos={false}
            usersInfo={filteredList}
              getUser={(userName) => this.getUser(userName)}
            />
          ) : (
            <InfiniteScroll
              dataLength={this.state.users ? this.state.users.length : 0}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={!this.state.searchName ? <Spinner /> : ''}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>End of the users list</b>
                </p>
              }
            >
                <UsersList
                repos={false}
                  usersInfo={filteredList}
                  getUser={(userName) => this.getUser(userName)}
                />
            </InfiniteScroll>
          )}
        </div>
      </div>
    );
  }
}

export default Users;