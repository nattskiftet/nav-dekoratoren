import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import { Status } from 'api/api';
import { AppState } from 'store/reducers';
import { getHovedmenyNode } from 'utils/meny-storage-utils';
import Tekst from 'tekster/finn-tekst';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import EkspanderbarMeny from '../ekspanderbar-meny/EkspanderbarMeny';
import { HovedmenyDropdown } from './hovedmeny-dropdown/HovedmenyDropdown';
import MenySpinner from '../meny-spinner/MenySpinner';
import HamburgerIkon from '../meny-knapper/ikoner/hamburger-ikon/HamburgerIkon';
import MenylinjeKnapp from '../meny-knapper/MenylinjeKnapp';
import './HovedmenyDesktop.less';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    menyPunkter: state.menypunkt,
    language: state.language.language,
    isOpen: state.dropdownToggles.hovedmeny,
    sokIsOpen: state.dropdownToggles.sok,
});

const classname = 'desktop-hovedmeny';
export const desktopHovedmenyKnappId = `${classname}-knapp-id`;

export const HovedmenyDesktop = () => {
    const { arbeidsflate, menyPunkter, language, isOpen } = useSelector(
        stateSelector
    );
    const dispatch = useDispatch();

    const hovedmenyPunkter = getHovedmenyNode(
        menyPunkter.data,
        language,
        arbeidsflate
    );

    const toggleMenu = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleHovedmeny());
    };

    const knapp = (
        <MenylinjeKnapp
            toggleMenu={toggleMenu}
            isOpen={isOpen}
            classname={classname}
            id={desktopHovedmenyKnappId}
            ariaLabel={'Hovedmenyknapp'}
        >
            <HamburgerIkon isOpen={isOpen} />
            <Undertittel>
                <Tekst id="meny-knapp" />
            </Undertittel>
        </MenylinjeKnapp>
    );

    // Hide empty menues
    if (menyPunkter.status === Status.OK && !hovedmenyPunkter?.hasChildren) {
        return null;
    }

    return (
        <EkspanderbarMeny
            isOpen={isOpen}
            menyKnapp={knapp}
            classname={classname}
            id={classname}
        >
            {menyPunkter.status === Status.OK ? (
                <HovedmenyDropdown
                    classname={classname}
                    arbeidsflate={arbeidsflate}
                    language={language}
                    menyLenker={hovedmenyPunkter}
                    isOpen={isOpen}
                />
            ) : (
                <MenySpinner />
            )}
        </EkspanderbarMeny>
    );
};

export default HovedmenyDesktop;
