import { useEffect, useRef } from "react";

const ScrollToTop = ({ location, children }: any) => {
    const prevLocation = useRef(location);

    useEffect(() => {
        if (location !== prevLocation.current) {
            window.scrollTo(0, 0);
        }
        prevLocation.current = location;
    }, [location]);

    return children;
};

export default ScrollToTop;