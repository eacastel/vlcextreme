/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import './src/styles/globals.css'

export const onClientEntry = () => {
    const script = document.createElement("script");
    script.src = "https://cmp.osano.com/yxyO4yMBFs/65f27da8-1bdd-4673-b5db-6963d9c87630/osano.js";
    document.head.appendChild(script);
  };