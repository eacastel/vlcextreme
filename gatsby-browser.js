/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import './src/styles/globals.css'

export const onClientEntry = () => {
    window.addEventListener("load", () => {
      // Inject CookieYes script AFTER page loads to avoid blocking render
      const script = document.createElement("script");
      script.src = "https://cdn-cookieyes.com/client_data/8a1fc6aec17f5166519ee614/script.js";
      script.type = "text/javascript";
      script.defer = true;
      document.body.appendChild(script);
    });
  
    console.log("Gatsby client entry complete.");
  };