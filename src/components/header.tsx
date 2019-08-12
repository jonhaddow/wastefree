import React from "react";

const Header = (props: { headerText: string }): JSX.Element => {
	return <h1>{props.headerText}</h1>;
};

export default Header;
