import {observable, action} from 'mobx';
export default class State {
	@observable currentRoute: string;
	@observable kangrat: string;
	@observable dataDir: string;
	@observable basePage: string;
	@observable otherPages: Map<string, string>;
	@action changeRoute(newRoute: string) {
		this.currentRoute = newRoute;
	}
}