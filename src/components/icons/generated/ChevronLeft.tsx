import * as React from "react";

function SvgChevronLeft(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
			<path d="M18.355 21.073L9.282 12l9.073-9.073A1.713 1.713 0 1015.931.503L5.646 10.788c-.67.67-.67 1.755 0 2.424l10.285 10.285a1.713 1.713 0 102.424-2.424z" />
		</svg>
	);
}

export default SvgChevronLeft;
