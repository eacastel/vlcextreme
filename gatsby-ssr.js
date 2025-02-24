import React from "react";

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'es' });
  setHeadComponents([
    // CookieYes Consent Banner
    <script
      key="cookieyes"
      id="cookieyes"
      type="text/javascript"
      src="https://cdn-cookieyes.com/client_data/8a1fc6aec17f5166519ee614/script.js"
      defer
    />,
  ]);
};