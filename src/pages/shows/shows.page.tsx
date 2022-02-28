import React from "react";
import "./shows.page.scss";
import ShowSelectorComponent from "../../components/show-selecter/show-selector.component";
import {NavLink} from "react-router-dom";

export const ShowsPage = () => {
	return (
		<div className="shows__page">
			<h2 className="heading">BOOK MY SHOW</h2>
			<div className="action-holder">
				<div className="revenue-holder">
					<NavLink to={"/revenue"} className="btn btn-primary">Revenue</NavLink>
				</div>
				<div className="select-show-holder">
					<ShowSelectorComponent/>
				</div>
			</div>
		</div>
	)
}
