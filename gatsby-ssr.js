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
      src="https://cmp.osano.com/yxyO4yMBFs/65f27da8-1bdd-4673-b5db-6963d9c87630/osano.js"
    />,
  ]);
};