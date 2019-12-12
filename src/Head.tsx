import React from 'react';
import { verifyWindowObj } from './utils/environments';
import LanguageProvider from './provider/Language-provider';
import setupMock from './mocks/setup-mock';
import * as es6promise from 'es6-promise';
import Header from './komponenter/header/Header';

if (verifyWindowObj()) {
    es6promise.polyfill();
}

interface Props {
    miljo?: string;
}

function echoDevMode() {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
}

if (process.env.NODE_ENV === 'development') {
    if (verifyWindowObj()) {
        echoDevMode();
        setupMock();
    }
}

if (verifyWindowObj()) {
    if (window.location.origin.toLowerCase().includes('localhost')) {
        echoDevMode();
        setupMock();
    }
}

const Head = (props: Props) => {
    console.log(props.miljo);
    return (
        <LanguageProvider>
            <Header />
        </LanguageProvider>
    );
};

export default Head;
