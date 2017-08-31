import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export default class App extends React.Component<null, null> {
	constructor () {
		super();
	}
	render () {
		return (
			<MuiThemeProvider>
				<AppBar 
					title="Kangrat Editor"
				/>
			</MuiThemeProvider>
		);
	}
}