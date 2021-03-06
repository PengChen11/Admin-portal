import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import classnames from 'classnames';


// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';

// pages
import Dashboard from '../../pages/dashboard';
import Notifications from '../../pages/notifications';
import Users from '../../pages/users';
import Articles from '../../pages/articles';
import ArticlePost from '../../pages/articlePost';
import Projects from '../../pages/projects';
import ProjectPost from '../../pages/projectPost';


// context
import { useLayoutState } from '../../context/LayoutContext';

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/users" component={Users} />
            <Route path="/app/logs" component={Notifications} />
            <Route path="/app/blog/articles" component={Articles} />
            <Route path="/app/blog/post" component={ArticlePost} />
            <Route path="/app/project/projects" component={Projects} />
            <Route path="/app/project/post" component={ProjectPost} />

          </Switch>
        </div>
      </>
    </div>
  );
}


import PropTypes from 'prop-types';
Layout.propTypes = {
  history: PropTypes.object,
};
export default withRouter(Layout);