import * as React from "react"
import * as ReactDOM from "react-dom";
import { App } from "../app/App";
// import { hot } from "react-hot-loader";
// import * as AppCreator from "./creator";

ReactDOM.hydrate( <App/>, document.getElementById('root') );



// AppCreator.create( creator => {
//     creator.getStore( creator.getPreloadState() )
//         .then( store => {
//             creator.getRenderer()
//                 .then(renderer=>{
//                     if (process.env.NODE_ENV === 'development' && module.hot) {
//                         let AppHot = hot( module )( App );
//
//
//                         renderer.render( AppHot, store );
//                     }else{
//                         renderer.render( App, store );
//                     }
//                 })
//         } )
//         .catch( error => {
//             if ( process.env.NODE_ENV === "development" ) {
//                 console.error( error );
//             }
//         } );
// } );