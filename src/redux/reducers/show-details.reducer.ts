import {ADD_SHOW_DETAILS, UPDATE_SEATS} from "../actions/show-details.action";
import {IAction} from "../store";
import {ICurrentOrder} from "./order-details.reducer";

export interface IDictionary<TValue> {
	[key: string]: TValue
}

export interface ISeatDetails {
	number: string;
	class: string;
	price: number;
	isAvailable: boolean;
}

export interface IShowDetails {
	id: string,
	name: string,
	rows: IDictionary<Array<ISeatDetails>>
}

export interface IShowDetailsReducer {
	shows: Array<IShowDetails>;
	isCached: boolean;
}

const defaultState: IShowDetailsReducer = {
	shows: [],
	isCached: false
}

export const ShowDetailsReducer = (state: IShowDetailsReducer = defaultState, action: IAction<any>): IShowDetailsReducer => {
	switch (action.type) {
		case ADD_SHOW_DETAILS: {
			return {...state, shows: action.payload, isCached: true}
		}
		case UPDATE_SEATS: {
			const shows = [...state.shows];

			const currentOrder = action.payload as ICurrentOrder;
			const selectedShows = currentOrder.selectedShows;

			Object.keys(selectedShows).forEach(key => {
				const getShow = shows.find(_show => _show.id === key);
				if (getShow) {
					const selectedShowToUpdateFrom = selectedShows[key];
					selectedShowToUpdateFrom.forEach(seat => {
						const getClass = seat.class;
						if (getShow.rows[getClass]) {
							getShow.rows[getClass] = [...getShow.rows[getClass]].map(seatToUpdate => {
								return {
									...seatToUpdate,
									isAvailable: seatToUpdate.isAvailable ? seatToUpdate.number !== seat.number : false
								}
							});
						}
					});
				}
			});
			return {
				...state,
				shows: shows
			};
		}
		default: {
			return state
		}
	}
}
