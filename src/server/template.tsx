import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import Header from 'komponenter/header/Header';
import Footer from 'komponenter/footer/Footer';
import MetaTagsServer from 'react-meta-tags/server';
import { MetaTagsContext } from 'react-meta-tags';
import { Request } from 'express';
import { clientEnv, fiveMinutesInSeconds, oneMinuteInSeconds } from './utils';
import { createStore } from 'store';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import { CookiesProvider } from 'react-cookie';
import hash from 'object-hash';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';

// Local environment - import .env
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Resources
const fileEnv = `${process.env.APP_BASE_URL}/env`;

// Loadable components stats files
const statsServer = path.resolve('build/loadable-server.json');
const statsClient = path.resolve('build/loadable-client.json');

const cache = new NodeCache({
    stdTTL: fiveMinutesInSeconds,
    checkperiod: oneMinuteInSeconds,
});

export const template = (req: Request) => {
    // Set environment based on request params
    const universalCookies = (req as any).universalCookies;
    const cookies = universalCookies.cookies;
    const env = clientEnv({ req, cookies });

    const envHash = hash({ env });
    const cachedHtml = cache.get(envHash);

    // Retreive from cache
    if (cachedHtml) {
        return cachedHtml;
    }

    // Create store based on request params
    const metaTags = MetaTagsServer();
    const store = createStore(env, universalCookies);

    // Fetch params and forward to client
    const params = req.query;
    const paramsAsString = Object.keys(req.query).length
        ? `?${req.url.split('?')[1]}`
        : ``;

    // Backward compatibility
    // for simple header and footer
    const headerId = params.header ? `header` : `header-withmenu`;
    const footerId = params.footer ? `footer` : `footer-withmenu`;

    // Chunks
    const extractorServer = new ChunkExtractor({
        statsFile: statsServer,
        entrypoints: ['server'],
    });

    const extractorClient = new ChunkExtractor({
        statsFile: statsClient,
        entrypoints: ['client'],
    });

    const scriptTags = extractorClient.getScriptTags();
    const linkTags = extractorClient.getLinkTags();
    const styleTags = extractorClient.getStyleTags();

    // Render SSR
    const HtmlHeader = ReactDOMServer.renderToString(
        extractorServer.collectChunks(
            <ReduxProvider store={store}>
                <MetaTagsContext extract={metaTags.extract}>
                    <CookiesProvider cookies={universalCookies}>
                        <Header />
                    </CookiesProvider>
                </MetaTagsContext>
            </ReduxProvider>
        )
    );
    const HtmlFooter = ReactDOMServer.renderToString(
        extractorServer.collectChunks(
            <ReduxProvider store={store}>
                <CookiesProvider>
                    <Footer />
                </CookiesProvider>
            </ReduxProvider>
        )
    );

    const HtmlMetaTags = metaTags.renderToString();
    const html = `
    <!DOCTYPE html>
    <html lang="no">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,shrink-to-fit=no"
            />
            <meta name="theme-color" content="#000000" />
            <title>NAV Dekoratør</title>
            ${linkTags}
            <!-- Decorator development styling -->
            <style>
            html, body {  height: 100%; }
            .decorator-dev-container {
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
            }
            .decorator-dummy-app {
                background: #8888;
                height: 100%;
                min-height: 55rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            </style>
            <!-- Styling fetched by apps -->
            <div id="styles">
                ${HtmlMetaTags}
                ${styleTags}
            </div>
        </head>
        <body>
            <div class="decorator-dev-container">
                <!-- Header fetched by apps -->
                <div id="${headerId}">
                    <section id="decorator-header" class="navno-dekorator" role="main">${HtmlHeader}</section>
                </div>
                <div class="decorator-dummy-app">
                </div>
                <!-- Footer fetched by apps -->
                <div id="${footerId}">
                    <section id="decorator-footer" class="navno-dekorator" role="main">${HtmlFooter}</section>
                </div>
            </div>
            <!-- Scripts fetched by apps -->
            <div id="scripts">
                <div id="decorator-env" data-src="${fileEnv}${paramsAsString}"></div>
                ${scriptTags}
            </div>
            <div id="skiplinks"></div>
            <div id="megamenu-resources"></div>
            <div id="webstats-ga-notrack"></div>
        </body>
    </html>`;

    cache.set(envHash, html);
    return html;
};
