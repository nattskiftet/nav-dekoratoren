import { MenuValue } from 'utils/meny-storage-utils';
import { arbeidsgiverContextLenke } from './arbeidsflate-lenker';
import { personContextLenke } from './arbeidsflate-lenker';
import { samarbeidspartnerContextLenke } from './arbeidsflate-lenker';
import { EnvironmentState } from 'store/reducers/environment-duck';

type LenkeData = {
    url: string;
    lenkeTekstId: string;
    stikkordId: string;
    key?: MenuValue;
};

export const valgtbedrift = () => {
    const orgnummerFraUrl = new URLSearchParams(window.location.search).get(
        'bedrift'
    );
    return orgnummerFraUrl ? `?bedrift=${orgnummerFraUrl}` : '';
};

const privatpersonLenker = (env: EnvironmentState): LenkeData[] => [
    {
        url: env.DITT_NAV_URL,
        lenkeTekstId: 'person-minside-lenke',
        stikkordId: 'meny-bunnlenke-minside-stikkord',
    },
    arbeidsgiverContextLenke(env.XP_BASE_URL),
    samarbeidspartnerContextLenke(env.XP_BASE_URL),
];

const arbeidsgiverLenker = (env: EnvironmentState): LenkeData[] => [
    {
        url: env.MINSIDE_ARBEIDSGIVER_URL + valgtbedrift(),
        lenkeTekstId: 'arbeidsgiver-minside-lenke',
        stikkordId: 'meny-bunnlenke-arbeidsgiver-stikkord',
    },
    personContextLenke(env.XP_BASE_URL),
    samarbeidspartnerContextLenke(env.XP_BASE_URL),
];

const samarbeidspartnerLenker = (env: EnvironmentState): LenkeData[] => [
    personContextLenke(env.XP_BASE_URL),
    arbeidsgiverContextLenke(env.XP_BASE_URL),
];

const IKKEBESTEMTLenker = (): LenkeData[] => [];

export const bunnLenker = (env: EnvironmentState) => ({
    [MenuValue.PRIVATPERSON]: privatpersonLenker(env),
    [MenuValue.ARBEIDSGIVER]: arbeidsgiverLenker(env),
    [MenuValue.SAMARBEIDSPARTNER]: samarbeidspartnerLenker(env),
    [MenuValue.IKKEBESTEMT]: IKKEBESTEMTLenker(),
});
