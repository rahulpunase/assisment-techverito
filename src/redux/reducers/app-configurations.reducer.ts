import {IAction} from "../store";
import {CHANGE_THEME} from "../actions/app-configuration.action";

export interface IAppConfiguration {
	theme: "light" | "dark";
	tax: {
		cess: number
	}
}

export const defaultState: IAppConfiguration = {
	theme: "light",
	tax: {
		cess: 17.3
	}
}

export const AppConfiguration = (state = defaultState, action: IAction<any>): IAppConfiguration => {
	switch (action.type) {
		case CHANGE_THEME: {
			return {
				...state,
				theme: action.payload
			}
		}
		default: {
			return state;
		}
	}
}
