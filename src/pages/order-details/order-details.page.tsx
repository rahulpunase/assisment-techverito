import React, {useState} from "react";
import "./order-details.page.scss";
import {useDispatch, useSelector} from "react-redux";
import {IStore} from "../../redux/store";
import {calculateKrishiKalyan, calculateServiceTax, calculateSwachhBharat, getTotalPrice} from "../../utils/utils";
import {useHistory} from "react-router-dom";
import {updateSeats} from "../../redux/actions/show-details.action";
import {removeCurrentOrder} from "../../redux/actions/order-details.action";
import {KRISHI_KALYAN_TAX, SERVICE_TAX, SWACHH_BHARAT_TAX} from "../../utils/constants";

const OrderDetailsPage = () => {
	const store = useSelector((store: IStore) => store);
	const [isOrderCompleted, setIsOrderCompleted] = useState(false);
	const history = useHistory();
	const {orderDetailsReducer} = store;
	const dispatch = useDispatch();
	let getTotalSeatPrice: any;
	if (orderDetailsReducer.currentOrderInProgress) {
		getTotalSeatPrice = getTotalPrice(orderDetailsReducer.currentOrderInProgress);
	}

	const navigateBack = (): void => history.goBack();

	const navigateToRevenue = (): void => history.push("/revenue");

	const payHandler = (): void => {
		if (orderDetailsReducer.currentOrderInProgress) {
			dispatch(updateSeats(orderDetailsReducer.currentOrderInProgress));
			dispatch(removeCurrentOrder());
			setIsOrderCompleted(true);
		}
	}

	const getPricePanel = (getTotalSeatPrice: number) => {
		const serviceTax = calculateServiceTax(getTotalSeatPrice);
		const swachCess = calculateSwachhBharat(getTotalSeatPrice);
		const krishniKalyan = calculateKrishiKalyan(getTotalSeatPrice);

		const total = (getTotalSeatPrice + serviceTax + swachCess + krishniKalyan).toFixed(2);
		return (
			<>
				<div className="row">Total Amount: Rs <span>{getTotalSeatPrice}/-</span></div>
				<div className="row">Service Tax @{SERVICE_TAX}%: Rs <span>{serviceTax}/-</span></div>
				<div className="row">Swach Bharat Cess @{SWACHH_BHARAT_TAX}%: Rs <span>{swachCess}/-</span></div>
				<div className="row">Krishi Kalyan Cess @{KRISHI_KALYAN_TAX}%: Rs <span>{krishniKalyan}/-</span></div>
				<div className="row"><b>Total: Rs <span>{total}/-</span></b></div>
			</>
		)
	}

	return (
		<div className="order-detail__page">
			{orderDetailsReducer.currentOrderInProgress && <React.Fragment>
				<div className="heading">Current Order Details</div>
				<div className="detail-content">
					{getPricePanel(getTotalSeatPrice)}
				</div>
				<div className="actions">
					<button className="btn btn-primary" onClick={navigateBack}>Go back</button>
					<button className="btn btn-primary" onClick={payHandler}>Pay and book</button>
				</div>
			</React.Fragment>}
			{isOrderCompleted && <React.Fragment>
				<div className="heading">Order Completed</div>
				<div className="back-button"><button className="btn btn-primary" onClick={navigateBack}>Go back</button></div>
				<div className="back-button"><button className="btn btn-primary" onClick={navigateToRevenue}>Revenue</button></div>

			</React.Fragment>}
		</div>
	);
};

export default OrderDetailsPage;
