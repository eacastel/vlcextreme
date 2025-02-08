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
      key="ccm19"
      src="https://cloud.ccm19.de/app.js?apiKey=9366fea2036d5a10c5aa3cc29e952b3b2d35aa073de2e93e&amp;domain=67a75db7f438bb3eb40bc7a2"
      referrerPolicy="origin"
    />,
  ]);
};
