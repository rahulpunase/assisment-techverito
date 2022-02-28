import {combineReducers, createStore} from "redux";
import {IShowDetailsReducer, ShowDetailsReducer} from "./reducers/show-details.reducer";
import {IOrderDetailsReducer, OrderDetailsReducer} from "./reducers/order-details.reducer";
import {AppConfiguration, IAppConfiguration} from "./reducers/app-configurations.reducer";

export interface IStore {
	showDetailsReducer: IShowDetailsReducer;
	orderDetailsReducer: IOrderDetailsReducer,
	appConfigurations: IAppConfiguration
}

export interface IAction<T> {
	type: string,
	payload: T
}

const combinedReducers = combineReducers({
	showDetailsReducer: ShowDetailsReducer,
	orderDetailsReducer: OrderDetailsReducer,
	appConfigurations: AppConfiguration
});


export const store = createStore<IStore, any, any, any>(combinedReducers);
