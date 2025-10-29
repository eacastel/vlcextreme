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

  // gatsby-browser.js
export const onRouteUpdate = ({ location, prevLocation }) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "gatsby_route_change",
      page_location: window.location.href,
      page_path: location?.pathname,
      page_title: document.title,
      page_referrer: prevLocation ? window.origin + prevLocation.pathname : document.referrer || "",
    });
  }
};