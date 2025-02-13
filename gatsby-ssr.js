import React from "react";

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    // CookieYes Consent Banner
    <script
      key="cookieyes"
      id="cookieyes"
      type="text/javascript"
      src="https://cdn-cookieyes.com/client_data/8a1fc6aec17f5166519ee614/script.js"
      defer
    />,
    // Preload Fonts and Styles
    <link key="preload-font" rel="preload" href="/path-to-your-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />,
    <link key="preload-css" rel="preload" href="/styles.css" as="style" />,
    <style key="font-swap">
      {`
        body { font-display: swap; }
      `}
    </style>,
  ]);

  setPostBodyComponents([
    // Cloudflare Email Decode Script
    <script
      key="cloudflare"
      src="https://vlcextreme.com/cloudflare-static/email-decode.min.js"
      type="text/javascript"
      defer
    />,
  ]);
  