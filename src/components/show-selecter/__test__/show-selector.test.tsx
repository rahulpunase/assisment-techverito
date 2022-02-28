import React from "react";
import {render, RenderResult} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../../../redux/store";
import {BrowserRouter as Router} from "react-router-dom";
import ShowSelectorComponent from "../show-selector.component";

let wrapper: RenderResult;
beforeEach(() => {
	wrapper = render(
		<Provider store={store}>
			<Router>
				<ShowSelectorComponent/>
			</Router>
		</Provider>);
});

describe("<ShowSelectorComponent>", () => {

	it("...should render correctly", () => {
		expect(wrapper).toBeTruthy();
	});

	it("...should render correct number of links", async () => {
		const data = ['show-1', 'show-2', 'show-3'];
		const {findAllByRole} = wrapper;
		const getLinks = await findAllByRole("a");
		expect(getLinks).toBe(3);
	});
})
