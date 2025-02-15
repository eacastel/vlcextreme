/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import './src/styles/globals.css'

// Clear Old Service Workers on Every Update

export const onServiceWorkerUpdateReady = () => {
    window.location.reload();
  };