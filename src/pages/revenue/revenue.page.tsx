import React from "react";
import "./revenue.page.scss";
import {useSelector} from "react-redux";
import {IStore} from "../../redux/store";
import {getTotalOfOrders} from "../../utils/utils";

export const RevenuePage = () => {

	const orderDetailsReducer = useSelector((store: IStore) => store.orderDetailsReducer);

	return (
		<div className="revenue__page">
			{!orderDetailsReducer.orders.length && <h2>No orders available</h2>}
			{orderDetailsReducer.orders.length && <div className="revenue-details">
				<div className="row">Total Orders: <span>{orderDetailsReducer.orders.length}</span></div>
				<div className="row">Total Revenue: Rs: {getTotalOfOrders(orderDetailsReducer.orders)}/-</div>
			</div>}
		</div>
	);
}
