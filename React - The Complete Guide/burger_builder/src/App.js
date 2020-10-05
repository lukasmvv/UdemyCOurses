import React, {Component, useEffect} from 'react';
// import { render } from '@testing-library/react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import {connect} from 'react-redux';
import * as actions from './store/actions/index';

const App = props => {

  // componentDidMount() {
  //   this.props.onTryAutoSignUp();
  // }

  // useEffect replaces componentDidMount for functional components using hooks
  useEffect(() => {
    props.onTryAutoSignUp();
  }, []); // empty dependncy means that the useEffect will only run once

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth}></Route>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/orders" component={Orders}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>
    </Switch>
    );
  }

  return (
    <div>
      <Layout>    
          {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
