import * as React from "react";
import * as ReactDOMServer from "react-dom/server"

import { App } from "../app/App";



export default function serverRenderer(){
    return (req, res, next) => {
        res.send( `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>FastSSR</title>
                <link rel="stylesheet" href="/static/app.css">
            </head>
            <body>
                <div id="root">${ ReactDOMServer.renderToString( <App/> ) }</div>
                <script src="/assets/root.dll.js"></script>
                <script type="" src="/static/client.js"></script>
            </body>
            </html>
        ` );
    }
}

