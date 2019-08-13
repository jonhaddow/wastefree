import React from "react";
import Styles from "./footer.module.scss";

interface FooterProps {
	title: string;
}

const Footer = function(props: FooterProps): JSX.Element {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const { title } = props;

	const copyrightMsg = `Copyright © ${year} ${title}`;
	return (
		<footer className={Styles.footer}>
			<p>{copyrightMsg}</p>
		</footer>
	);
};

export default Footer;
