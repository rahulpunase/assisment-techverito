import {IShowDetails} from "../reducers/show-details.reducer";
import {IAction} from "../store";
import {ICurrentOrder} from "../reducers/order-details.reducer";

export const ADD_SHOW_DETAILS = "ADD_SHOW_DETAILS";
export const UPDATE_SEATS = "UPDATE_SEATS";

export const addShowDetails = (showDetails: Array<IShowDetails>): IAction<Array<IShowDetails>> => ({
	type: ADD_SHOW_DETAILS,
	payload: showDetails
});

export const updateSeats = (currentShowDetails: ICurrentOrder):IAction<any> => ({
	type: UPDATE_SEATS,
	payload: currentShowDetails
});

