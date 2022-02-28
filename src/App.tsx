import React, {useEffect} from "react";
import "./App.scss";
import {RouterConfiguration} from "./router-configurations/router-configuration";
import {useDispatch} from "react-redux";
import {addShowDetails} from "./redux/actions/show-details.action";
import mockedJsonData from "./data/show-details.json";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(addShowDetails(mockedJsonData));
	}, [])
	return (
		<div className="app__component">
			<div className="container">
				<div className="centralized-container">
					<RouterConfiguration/>
				</div>
			</div>
		</div>
	);
}

export default App;
