import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {ShowsPage} from "../pages/shows/shows.page";
import {FooterComponent} from "../components/footer/footer.component";
import ShowDetailsPage from "../pages/show-details/show-details.page";
import OrderDetailsPage from "../pages/order-details/order-details.page";
import {RevenuePage} from "../pages/revenue/revenue.page";

export const RouterConfiguration = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact={true}>
					<Redirect to={"/shows"}/>
				</Route>
				<Route path="/shows" exact={true}>
					<ShowsPage/>
				</Route>
				<Route path="/revenue" exact={true}>
					<RevenuePage/>
				</Route>
				<Route path="/shows/:showId">
					<ShowDetailsPage/>
				</Route>
				<Route path="/order-details">
					<OrderDetailsPage/>
				</Route>
			</Switch>
			<FooterComponent/>
		</Router>
	)
}
