import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { LoggInnKnappProps } from 'komponenter/header/header-regular/meny/logginn/LoggInn';
import LoggInn from 'komponenter/header/header-regular/meny/logginn/LoggInn';

export const LoggInnKnappDesktop = () => {
    const knapp = ({ handleButtonClick, tekst }: LoggInnKnappProps) => (
        <KnappBase
            type="standard"
            className="login-knapp"
            id="desktop-login-knapp"
            onClick={handleButtonClick}
        >
            {tekst}
        </KnappBase>
    );

    return <LoggInn Knapp={knapp} />;
};
