import React, { createContext, useContext, useState, useEffect } from "react";

const ResponsiveContext = createContext();

export const AnchoVentanaProvider = ({ children }) => {
    const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);
    console.log('anchoVentanaContenxt', anchoVentana)

    useEffect(() => {
        const handleResize = () => {
            setAnchoVentana(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <ResponsiveContext.Provider value={anchoVentana}>
            {children}
        </ResponsiveContext.Provider>
    );
};

        export const useResponsive = () => {
    return useContext(ResponsiveContext);
};
