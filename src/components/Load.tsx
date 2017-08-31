import * as React from 'react';
import State from './State';

export default class Load extends React.Component<null, null> {
	constructor () {
		super();
	}
	componentDidMount () {
		let state: State = (window as any).state;
		state.changeRoute('Load');
	}
	render () {
		return (
			<div>
				<h1>Choose a kangratsave.json to load...</h1>
				<h2>...or select a file to load from below</h2>
			</div>
		);
	}
}