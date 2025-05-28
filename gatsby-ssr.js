import React from "react";

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'es' });
  setHeadComponents([
    <script
      key="cookieyes"
      id="cookieyes"
      type="text/javascript"
      src="https://cdn-cookieyes.com/client_data/8a1fc6aec17f5166519ee614/script.js"
      defer
    />,
    <link key="apple-touch-icon" rel="apple-touch-icon" href="/favicon-512x512.png" />,
    <link key="manifest" rel="manifest" href="/manifest.webmanifest" />,
    <link key="favicon-ico" rel="icon" href="/favicon.ico" sizes="any" />,
    <link key="favicon-16" rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />,
    <link key="favicon-32" rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />,
    <link key="favicon-192" rel="icon" href="/favicon-192x192.png" sizes="192x192" type="image/png" />,
    <link key="favicon-512" rel="icon" href="/favicon-512x512.png" sizes="512x512" type="image/png" />,
    <link key="favicon-svg" rel="icon" href="/favicon.svg" type="image/svg+xml" />,
    <link key="apple-touch-icon" rel="apple-touch-icon" href="/apple-touch-icon.png" />,
  ]);
};