/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="cookieyes"
      id="cookieyes"
      type="text/javascript"
      src="https://cdn-cookieyes.com/client_data/8a1fc6aec17f5166519ee614/script.js"
    />,
  ]);
};

