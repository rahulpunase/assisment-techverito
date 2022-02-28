import React from 'react';
import "./show-selector.component.scss";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {IStore} from "../../redux/store";

const ShowSelectorComponent = () => {
	const showDetailsReducer = useSelector((store: IStore) => store.showDetailsReducer);

	return (
		<div className="show-selector__component">
			<div className="select-show-holder">
				<div className="select-show-heading">Select the Show</div>
				<div data-testid="options" className="options">
					{
						showDetailsReducer.shows.map(show => <NavLink className="btn btn-light" key={show.id}
							to={`/shows/${show.id}`}>{show.name}</NavLink>)
					}
				</div>
			</div>
		</div>
	);
};

export default ShowSelectorComponent;
