import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from './../redux/store';
import Head from '../Head';

const store = getStore();

const NavHeader = (): React.ReactElement => {
    return (
        <ReduxProvider store={store}>
            <Head />
        </ReduxProvider>
    );
};

export default NavHeader;
