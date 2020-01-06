import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from './../redux/store';
import Footer from '../komponenter/footer/Footer';

const store = getStore();

const NavFooter = (): React.ReactElement => {
    return (
        <ReduxProvider store={store}>
            <Footer />
        </ReduxProvider>
    );
};

export default NavFooter;
