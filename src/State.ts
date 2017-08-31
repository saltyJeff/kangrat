import {observable, action} from 'mobx';
export default class State {
	@observable page: string;
	@action changePage(newPage: string) {
		this.page = newPage;
	}
}