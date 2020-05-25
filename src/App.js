

import React from "react";
import { Router } from 'react-router'
import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { history as browserHistory } from './redux/configureStore';
import configStore, { history } from './redux/configureStore';
// import { syncHistoryWithStore } from 'react-router-redux';
import Layouts from './layouts'
import {
	Home,
	Profile
} from './views';

import { Table, Create, Edit } from './views/TableUser'

const store = configStore();
const loggedIn = localStorage.getItem('auth')
class App extends React.Component {

	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<>
							<Route exact path="/" component={Home} />
							<Route exact path="/users" render={() => <Layouts><Table></Table></Layouts>} ></Route>
							<Route exact path="/users/create" render={() => <Layouts><Create></Create></Layouts>} ></Route>
							<Route exact path="/users/edit" render={() => <Layouts><Edit></Edit></Layouts>} ></Route>
							<Route path="/profile" render={() => <Layouts><Profile></Profile></Layouts>} ></Route>
							{!loggedIn && <Redirect to="/" />}
						</>
					</Switch>
				</Router>
			</Provider >
		)
	}

}

export default App;