import React, {useEffect, useState} from "react";
import "./show-details.page.scss";
import {useHistory, useRouteMatch} from "react-router-dom";
import {ISeatDetails, IShowDetails} from "../../redux/reducers/show-details.reducer";
import {useDispatch, useSelector} from "react-redux";
import {IStore} from "../../redux/store";
import {getClassOnSelected} from "../../utils/utils";
import {addSeatsToOrder} from "../../redux/actions/order-details.action";
import ShowSelectorComponent from "../../components/show-selecter/show-selector.component";

export interface IShowParams {
	showId: string;
}

const ShowDetailsPage = () => {
	const routeMatch = useRouteMatch<IShowParams>();
	const store = useSelector((store: IStore) => store);
	const {showDetailsReducer, orderDetailsReducer} = store;
	const {currentOrderInProgress} = orderDetailsReducer;
	const [selectedShow, setSelectedShow] = useState<IShowDetails | null>(null);
	const history = useHistory();
	const currentShowId = routeMatch.params["showId"];
	const dispatch = useDispatch();

	useEffect(() => {
		const showId = routeMatch.params["showId"];
		const isShowAvailable = showDetailsReducer.shows.find(show => show.id === showId);
		if (isShowAvailable) {
			setSelectedShow(isShowAvailable);
		}
		if (orderDetailsReducer.currentOrderInProgress) {
			// setSelectedSeats(orderDetailsReducer.currentOrderInProgress.seats);
		}
		// return () => setSelectedSeats([]);
	}, [showDetailsReducer.isCached, currentShowId]);

	const toggleSeatStatus = (seat: ISeatDetails) => {
		dispatch(addSeatsToOrder(currentShowId, seat));
	}

	const createCurrentOrder = () => {
		history.push("/order-details");
	}

	const seatClass = (seat: ISeatDetails) => {
		return `seat ${getClassOnSelected(currentOrderInProgress, currentShowId, seat.number)} ${seat.isAvailable ? "" : "disabled"}`;
	}

	return (
		<div className="show-details__component">
			<div className="go-back"><button className="btn btn-primary"
			                                 onClick={ev => history.push("/shows")}>Go back</button></div>
			<div className="shows">
				<ShowSelectorComponent/>
			</div>
			{selectedShow && <div className="container">
				<div className="current-show-heading">{selectedShow.name}</div>
				<div className="ort-heading">Select seats and Proceed for Payments</div>
				<div className="seats">
					{Object.keys(selectedShow.rows).map(key => <div className="row" key={key}>
						{selectedShow.rows[key].map(seat => <div key={seat.number}
							onClick={() => seat.isAvailable ? toggleSeatStatus(seat) : {}}
							className={seatClass(seat)}>{seat.number}</div>)}
					</div>)}
				</div>
				<div className="proceed">
					<button className="btn btn-primary" onClick={createCurrentOrder}>Next</button>
				</div>
			</div>}
		</div>
	);
};

export default ShowDetailsPage;
