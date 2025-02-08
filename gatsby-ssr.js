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
      key="osano-cmp"
      src="https://cmp.osano.com/yxyO4yMBFs/b090757f-6ce3-4269-b8c8-73e249743538/osano.js"
      async
    />,
  ]);
};
