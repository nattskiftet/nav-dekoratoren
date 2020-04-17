import { MenuValue } from '../../utils/meny-storage-utils';
import { ActionType, Handling } from '../actions';

export interface EnvironmentState {
    XP_BASE_URL: string;
    APP_BASE_URL: string;
    API_VARSELINNBOKS_URL: string;
    MINSIDE_ARBEIDSGIVER_URL: string;
    DITT_NAV_URL: string;
    LOGIN_URL: string;
    LOGOUT_URL: string;

    // Parameters
    PARAMS: {
        LANGUAGE: string;
        CONTEXT: MenuValue;
        SIMPLE: boolean;
        SIMPLE_HEADER: boolean;
        SIMPLE_FOOTER: boolean;
        REDIRECT_TO_APP: boolean;
        LEVEL: string;
    };

    COOKIES: {
        LANGUAGE: string;
        CONTEXT: MenuValue;
    };
}

export const initialState: EnvironmentState = {
    XP_BASE_URL: '',
    APP_BASE_URL: '',
    API_VARSELINNBOKS_URL: '',
    MINSIDE_ARBEIDSGIVER_URL: '',
    DITT_NAV_URL: 'string',
    LOGIN_URL: 'string',
    LOGOUT_URL: 'string',

    // Parameters
    PARAMS: {
        LANGUAGE: 'NORSK',
        CONTEXT: MenuValue.IKKEVALGT,
        SIMPLE: false,
        SIMPLE_HEADER: false,
        SIMPLE_FOOTER: false,
        REDIRECT_TO_APP: false,
        LEVEL: 'string',
    },

    // Cookies
    COOKIES: {
        LANGUAGE: 'NORSK',
        CONTEXT: MenuValue.IKKEVALGT,
    },
};

export const reducer = (
    state: EnvironmentState = initialState,
    action: Handling
): EnvironmentState => {
    switch (action.type) {
        case ActionType.SETT_ENVIRONMENT: {
            return { ...state, ...action.data };
        }
        default:
            return state;
    }
};

export default reducer;
