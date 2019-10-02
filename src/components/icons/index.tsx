import React from "react";

export default function Icon(props: {
	styling?: React.CSSProperties;
	width: string;
	height: string;
	children: JSX.Element | JSX.Element[];
}): JSX.Element {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			width={props.width}
			height={props.height}
			viewBox="0 0 32 32"
			style={props.styling}
		>
			<title>chevron - left </title>
			{props.children}
		</svg>
	);
}
