import _ from "lodash";
import {ISeatDetails} from "../redux/reducers/show-details.reducer";
import {ICurrentOrder, IOrders} from "../redux/reducers/order-details.reducer";
import {KRISHI_KALYAN_TAX, SERVICE_TAX, SWACHH_BHARAT_TAX} from "./constants";
export const rectifyTheSeats = (seats: Array<ISeatDetails>) => {
	return _.uniq(_.map(seats, 'class'));
}

/**
 * Returns class name for the selected seats
 */
export const getClassOnSelected = (currentOrder: ICurrentOrder | null, showId: string, seatId: string): string => {
	if (!currentOrder) {
		return "";
	}
	return _.map(currentOrder.selectedShows[showId], 'number').includes(seatId) ? 'is-selected' : '';
}

export const getTotalPrice = (currentOrder:ICurrentOrder | null): number => {
	if (!currentOrder) {
		return 0;
	}
	const showIds = Object.keys(currentOrder.selectedShows);
	let seatsOfAllCategories: Array<ISeatDetails> = [];
	showIds.forEach(id => {
		const seats = currentOrder.selectedShows[id];
		seatsOfAllCategories = [...seatsOfAllCategories, ...seats];
	});
	return seatsOfAllCategories.map(seat => seat.price).reduce((sum, price) => sum + price, 0);
}

export const getTotalOfOrders = (orders: Array<IOrders>): number => {
	return orders.map(order => Number(order.total)).reduce((a, b) => a + b, 0);
}

export const calculateServiceTax = (total: number): number => {
	return (total * SERVICE_TAX) / 100;
}

export const calculateSwachhBharat = (total: number): number => {
	return (total * SWACHH_BHARAT_TAX) / 100;
}

export const calculateKrishiKalyan = (total: number): number => {
	return (total * KRISHI_KALYAN_TAX) / 100;
}


