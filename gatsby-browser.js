/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import './src/styles/globals.css'

import React from "react";

export const onInitialClientRender = () => {
  const script = document.createElement("script");
  script.src = "https://cmp.osano.com/yxyO4yMBFs/b090757f-6ce3-4269-b8c8-73e249743538/osano.js";
  script.async = true;
  document.body.appendChild(script);
};
