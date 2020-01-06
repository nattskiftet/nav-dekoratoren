import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from './../redux/store';
import Head from '../Head';
import Footer from '../komponenter/footer/Footer';

const store = getStore();

export class Test4 extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    render(): React.ReactNode {
        return (
            <ReduxProvider store={store}>
                <Footer />
            </ReduxProvider>
        );
    }
}

export class Test2 extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    render(): React.ReactNode {
        return (
            <div>
                <ReduxProvider store={store}>
                    <Head />
                </ReduxProvider>
            </div>
        );
    }
}
