import React from "react";
import Styles from "./footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

interface FooterProps {
	title: string;
	instagramLink: string;
}

const Footer = function(props: FooterProps): JSX.Element {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const { title, instagramLink } = props;

	const copyrightMsg = `Copyright © ${year} ${title}`;
	return (
		<footer className={Styles.footer}>
			<a href={instagramLink} target="_blank" rel="noopener noreferrer">
				<FontAwesomeIcon icon={faInstagram} size="2x" />
			</a>
			<p>{copyrightMsg}</p>
		</footer>
	);
};

export default Footer;
