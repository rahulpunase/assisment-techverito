import {IAction} from "../store";
import {ICurrentOrder} from "../reducers/order-details.reducer";
import {ISeatDetails} from "../reducers/show-details.reducer";

export const CREATE_CURRENT_ORDER = 'CREATE_CURRENT_ORDER';
export const ADD_SEATS_TO_ORDER = 'ADD_SEATS_TO_ORDER';
export const REMOVE_CURRENT_ORDER_AND_ADD_IT_TO_ORDERS = 'REMOVE_CURRENT_ORDER_AND_ADD_IT_TO_ORDERS';

export const createInProgressOrder = (currentOrder: ICurrentOrder): IAction<any> => ({
	type: CREATE_CURRENT_ORDER,
	payload: currentOrder
});

export const addSeatsToOrder = (showId: string, seat: ISeatDetails): IAction<any> => ({
	type: ADD_SEATS_TO_ORDER,
	payload: {
		showId: showId,
		seat: seat
	}
});

export const removeCurrentOrder = (): IAction<any> => ({
	type: REMOVE_CURRENT_ORDER_AND_ADD_IT_TO_ORDERS,
	payload: null,
});
