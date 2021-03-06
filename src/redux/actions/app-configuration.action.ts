export const CHANGE_THEME = "CHANGE_THEME";

export const changeTheme = (theme: "light" | "dark") => ({
	type: CHANGE_THEME,
	payload: theme
});
