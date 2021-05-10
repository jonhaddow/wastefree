import React from "react";
import { footer } from "./footer.module.scss";
import Icon from "../icons";
import Instagram from "../icons/instagram";

interface FooterProps {
	title: string;
	instagramLink: string;
}

const Footer = function (props: FooterProps): JSX.Element {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const { title, instagramLink } = props;

	const copyrightMsg = `Copyright © ${year} ${title}`;
	return (
		<footer className={footer}>
			<a href={instagramLink} target="_blank" rel="noopener noreferrer">
				<Icon width="24" height="24">
					<Instagram />
				</Icon>
			</a>
			<p>{copyrightMsg}</p>
		</footer>
	);
};

export default Footer;
