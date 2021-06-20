import * as React from "react";

function SvgCross(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
			<path d="M31.702 25.704L21.998 16l9.704-9.704a.999.999 0 00-.001-1.414L27.117.298a1 1 0 00-1.414-.001v.001l-9.704 9.704L6.295.298V.297a.998.998 0 00-1.414.001L.297 4.882a1 1 0 00-.001 1.414h.001L10.001 16 .297 25.704H.296a.999.999 0 000 1.414l4.584 4.584a1 1 0 001.414.001l9.704-9.704 9.704 9.704a.998.998 0 001.414 0l4.584-4.584a.999.999 0 000-1.414z" />
		</svg>
	);
}

export default SvgCross;
