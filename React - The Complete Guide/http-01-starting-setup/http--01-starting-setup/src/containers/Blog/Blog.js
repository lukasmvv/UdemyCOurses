import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../axios';
import Posts from './Posts/Posts';
//import NewPost from '../NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
// import FullPost from '../Blog/FullPost/FullPost';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './Blog.css';

// this is for so called Lazy Loading
// the import() is imported only when it is called
// idea is that a user might not need/use a large part of app that is imported - this helps to save space and increase performance
// React 16.6 and later has lazy loading built in which can be used
// const Posts = React.lazy(() => import('./containers/Posts'));
const AsyncNewPost = asyncComponent(() => {
    return import('../NewPost/NewPost');
});

class Blog extends Component {
    state = {
       auth: true 
    }
    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts/" exact={true} activeClassName="active">Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post', // this is always an aboslute path - gets appended to root domain
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact={true} render={()=><Posts/>}/> */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}  
                    <Route path="/posts" component={Posts}/>   
                    <Route render={() => <h1>Not found</h1>}></Route>
                    {/* <Redirect from="/" to="/posts"></Redirect>                                                 */}
                    {/* <Route path="/" component={Posts}/>  */}
                </Switch>
            </div>
        );
    }
}

export default Blog;