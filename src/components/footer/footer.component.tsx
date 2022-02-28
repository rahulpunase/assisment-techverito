import React from "react";
import "./footer.component.scss";
import {useDispatch} from "react-redux";
import {changeTheme} from "../../redux/actions/app-configuration.action";

export const FooterComponent = () => {
	const dispatch = useDispatch();
	const changeThemeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const root = document.getElementById("root");
		if (!root) return;
		if (event.target.checked) {
			root.classList.remove("light");
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
			root.classList.add("light");
		}
	}
	return (
		<footer className="footer__component">
			<div className="footer-container">
				<label className="switch">
					<input type="checkbox" onChange={changeThemeHandler}/>
					<span className="slider round"/>
				</label>
				<span className="dark-mode-text">Dark Mode</span>
			</div>
		</footer>
	);
}
