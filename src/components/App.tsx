import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import State from './State';
import {
	BrowserRouter,
	Route,
	withRouter
} from 'react-router-dom';
import {observer} from 'mobx-react';
import Load from './Load';

@observer
export default class App extends React.Component<null, null> {
	constructor () {
		super();
	}
	render () {
		let state: State = (window as any).state;
		return (
			<MuiThemeProvider>
				<div>
					<AppBar title={"Kangrat - "+state.currentRoute}/>
					<BrowserRouter>
						<div>
							<Route path="/" component={Load}/>
							<Route path="/template" />
							<Route path="/data" />
							<Route path="/build" />
						</div>
					</BrowserRouter>
				</div>
			</MuiThemeProvider>
		);
	}
}