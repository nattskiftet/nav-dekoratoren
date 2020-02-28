import React, { createRef, ReactNode } from 'react';
import { AppState } from '../../../../reducer/reducer';
import { Dispatch } from '../../../../redux/dispatch-type';
import { connect } from 'react-redux';
import { settVarslerSomLest } from '../../../../reducer/varsel-lest-duck';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import './Varselbjelle.less';
import { GACategory, triggerGaEvent } from '../../../../utils/google-analytics';
import { toggleVarselVisning } from '../../../../reducer/dropdown-toggle-duck';

interface Props {
    tabindex: boolean;
}

interface StateProps {
    antallVarsler: number;
    antallUlesteVarsler: number;
    erInnlogget: boolean;
    nyesteId: number;
    arbeidsflate: MenuValue;
    visvarsel: boolean;
}

interface FunctionProps {
    children: (clicked?: boolean, handleClick?: () => void) => ReactNode | any;
}

interface DispatchProps {
    doSettVarslerSomLest: (nyesteId: number) => void;
    toggleVarsel: () => void;
}

interface State {
    clicked: boolean;
    classname: string;
}

type VarselbjelleProps = StateProps & DispatchProps & Props;

class Varselbjelle extends React.Component<VarselbjelleProps, State> {
    private varselbjelleRef = createRef<HTMLDivElement>();

    constructor(props: VarselbjelleProps) {
        super(props);
        this.state = {
            clicked: false,
            classname:
                this.props.antallUlesteVarsler > 0
                    ? 'toggle-varsler-container har-nye-varsler'
                    : 'toggle-varsler-container',
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    public handleClick = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: this.props.visvarsel ? 'varsler-close' : 'varsler-open',
        });

        this.props.toggleVarsel();
        /*
        this.setState({
            clicked: !this.state.clicked,
        });
*/
        if (this.props.antallUlesteVarsler > 0) {
            this.setState({ classname: 'toggle-varsler-container' });
            this.props.doSettVarslerSomLest(this.props.nyesteId);
        }
    };

    handleOutsideClick: { (event: MouseEvent): void } = (e: MouseEvent) => {
        const node = this.varselbjelleRef.current;
        if (node && node.contains(e.target as HTMLElement)) {
            return;
        }
        if (this.props.visvarsel) {
            triggerGaEvent({
                category: GACategory.Header,
                action: 'varsler-close',
            });
        }
        this.props.toggleVarsel();
        // this.setState({ clicked: false });
    };

    render() {
        const {
            erInnlogget,
            antallVarsler,
            arbeidsflate,
            tabindex,
            children,
        } = this.props;
        const { clicked, classname } = this.state;
        return (
            <div ref={this.varselbjelleRef} className="varselbjelle">
                {erInnlogget && arbeidsflate === MenuValue.PRIVATPERSON ? (
                    <>
                        <div
                            id="toggle-varsler-container"
                            className={classname}
                        >
                            <button
                                onClick={this.handleClick}
                                className="toggle-varsler"
                                tabIndex={tabindex ? 0 : -1}
                                title="Varsler"
                                aria-label={`Varsler. Du har ${
                                    antallVarsler > 0 ? antallVarsler : 'ingen'
                                } varsler.`}
                                aria-pressed={clicked}
                                aria-haspopup="true"
                                aria-controls="varsler-display"
                                aria-expanded={clicked}
                            />
                        </div>
                        <div className="min-varsel-wrapper">
                            {
                                // children(clicked, this.handleClick)}
                            }
                        </div>
                    </>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    antallVarsler: state.varsler.data.antall,
    antallUlesteVarsler: state.varsler.data.uleste,
    erInnlogget:
        state.innloggingsstatus.data.authenticated &&
        (state.innloggingsstatus.data.securityLevel === '3' ||
            state.innloggingsstatus.data.securityLevel === '4'),
    nyesteId: state.varsler.data.nyesteId,
    arbeidsflate: state.arbeidsflate.status,
    visvarsel: state.dropdownToggles.varsel,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettVarslerSomLest: (nyesteId: number) =>
        settVarslerSomLest(nyesteId)(dispatch),
    toggleVarsel: () => dispatch(toggleVarselVisning()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Varselbjelle);
