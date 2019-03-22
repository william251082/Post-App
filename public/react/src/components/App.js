import React from 'react';
import LoginForm from "./LoginForm";
import {Route, Switch} from "react-router";
import PostListContainer from "./PostListContainer";
import Header from "./Header";
import PostContainer from "./PostContainer";
import {requests} from "../agent";
import {connect} from "react-redux";
import {userProfileFetch} from "../actions/actions";

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userProfileFetch
};

class App extends React.Component
{
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');

        if (token) {
            requests.setToken(token);
        }
    }

    componentDidUpdate(prevProps) {
        const {userId, userProfileFetch} = this.props;

        if (prevProps.userId !== userId && userId !== null) {
            console.log(`Old user id ${prevProps.userId}`);
            console.log(`New user id ${userId}`);
            userProfileFetch(userId);
        }
    }

    render() {
        const {isAuthenticated} = this.props;

        return(
            <div>
                <Header isAuthenticated={isAuthenticated}/>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/post/:id" component={PostContainer}/>
                    <Route path="/" component={PostListContainer}/>
                </Switch>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
