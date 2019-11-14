import { verifyWindowObj } from './utils/environments';

export function windowSupportObjectAssignNeeded() {
    return window.Promise && window.fetch && window.Symbol;
}

if (verifyWindowObj()) {
    if (windowSupportObjectAssignNeeded() || !(window as any)._babelPolyfill) {
        require('@babel/polyfill');
        require('react-app-polyfill/ie11');
        require('react-app-polyfill/stable');
    }
}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import './index.less';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
    gtmId: 'GTM-PM9RP3',
    dataLayerName: 'datalayer'
}
TagManager.initialize(tagManagerArgs)

ReactDOM.render(<App />, document.getElementById('decorator-header'));

// serviceWorker.unregister();
