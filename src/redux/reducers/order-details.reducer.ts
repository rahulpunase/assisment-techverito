import {IDictionary, ISeatDetails} from "./show-details.reducer";
import {
	ADD_SEATS_TO_ORDER,
	CREATE_CURRENT_ORDER,
	REMOVE_CURRENT_ORDER_AND_ADD_IT_TO_ORDERS
} from "../actions/order-details.action";
import {IAction} from "../store";
import {calculateKrishiKalyan, calculateServiceTax, calculateSwachhBharat, getTotalPrice} from "../../utils/utils";

export interface ICurrentOrder {
	selectedShows: IDictionary<Array<ISeatDetails>>;
	status: "IN_PROGRESS" | "COMPLETED"
}

export interface IOrders {
	total: string,
	id: number,
	details: ICurrentOrder,
	timeStamp: string;
}

export interface IOrderDetailsReducer {
	currentOrderInProgress: ICurrentOrder | null,
	orders: Array<IOrders>
}

const defaultState: IOrderDetailsReducer = {
	currentOrderInProgress: null,
	orders: []
}

export const OrderDetailsReducer = (state: IOrderDetailsReducer = defaultState, action: IAction<any>) => {
	switch (action.type) {
		case CREATE_CURRENT_ORDER: {
			if (!state.currentOrderInProgress) {
				return {
					...state,
					currentOrderInProgress: action.payload
				};
			} else {
				const alreadyPresentSelectedShow = {...state.currentOrderInProgress.selectedShows, ...action.payload.selectedShows};
				const currentOrder: ICurrentOrder = {
					status: action.payload.status,
					selectedShows: alreadyPresentSelectedShow
				};
				return {
					...state,
					currentOrderInProgress: currentOrder,
				}
			}
		}
		case ADD_SEATS_TO_ORDER: {
			const {showId, seat} = action.payload;
			if (!state.currentOrderInProgress) {
				const selectedShow = {
					[showId]: [seat]
				}
				return {
					...state,
					currentOrderInProgress: {
						selectedShows: selectedShow,
						status: "IN_PROGRESS"
					}
				}
			} else {
				let selectedSeats = state.currentOrderInProgress.selectedShows[showId];
				if (selectedSeats) {
					const seatIndex = selectedSeats.findIndex(_seat => _seat.number === seat.number);
					if (seatIndex > -1) {
						selectedSeats.slice(seatIndex, 1);
					} else {
						selectedSeats.push(seat);
					}
				} else {
					selectedSeats = [seat];
				}
				const selectedShows = {...state.currentOrderInProgress.selectedShows, ...{[showId]: selectedSeats}};
				return {
					...state,
					currentOrderInProgress: {
						selectedShows: selectedShows,
						status: "IN_PROGRESS"
					}
				}
			}
		}
		case REMOVE_CURRENT_ORDER_AND_ADD_IT_TO_ORDERS: {
			const orders = [...state.orders];
			if (state.currentOrderInProgress) {
				const getTotal = getTotalPrice(state.currentOrderInProgress);
				const getTotalWithTax = (calculateServiceTax(getTotal) + calculateKrishiKalyan(getTotal) + calculateSwachhBharat(getTotal)).toFixed(2);
				orders.push({
					details: state.currentOrderInProgress,
					id: Math.random(),
					timeStamp: new Date().toDateString(),
					total: getTotalWithTax
				});
			}
			return {
				...state,
				orders: orders,
				currentOrderInProgress: null,
			}
		}
		default: {
			return state;
		}
	}
}
