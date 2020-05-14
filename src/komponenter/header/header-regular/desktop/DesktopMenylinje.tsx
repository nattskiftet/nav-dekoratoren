import React from 'react';
import BEMHelper from 'utils/bem';
import NavLogoRod from 'ikoner/meny/NavLogoRod';
import { SokDropdown } from './sok/SokDropdown';
import { HovedmenyDesktop } from './hovedmeny/HovedmenyDesktop';
import { MinsideMeny } from './minside-meny/MinsideMeny';
import { VarslerDropdown } from './varsler/VarslerDropdown';
import { useKbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { MenuValue } from 'utils/meny-storage-utils';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import LoggInnKnapp from 'komponenter/header/header-regular/common/logg-inn-knapp/LoggInnKnapp';
import './DesktopMenylinje.less';

export const desktopHeaderLogoId = 'desktop-header-logo-id';
export const desktopLoginKnappId = 'desktop-login-knapp';

const DesktopMenylinje = () => {
    const cls = BEMHelper('desktopmeny');
    const kbNavMainState = useKbNavMain();
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status,
    );

    const innlogga = useSelector(
        (state: AppState) => state.innloggingsstatus.data.authenticated,
    );

    const visVarslerDropdown =
        innlogga && arbeidsflate === MenuValue.PRIVATPERSON;

    return (
        <nav className={cls.className} aria-label="Hovedmeny" id="hovedmeny">
            <div className={cls.element('elementer')}>
                <NavLogoRod
                    width="88"
                    height="80"
                    classname={cls.element('nav-brand')}
                    id={desktopHeaderLogoId}
                />
                <HovedmenyDesktop kbNavMainState={kbNavMainState} />
                <SokDropdown kbNavMainState={kbNavMainState} />
                <span className={cls.element('spacer')} />
                {visVarslerDropdown && (
                    <VarslerDropdown kbNavMainState={kbNavMainState} />
                )}
                <MinsideMeny kbNavMainState={kbNavMainState} />
                <LoggInnKnapp id={desktopLoginKnappId} />
            </div>
        </nav>
    );
};

export default DesktopMenylinje;
