// src/utils/renderRichText.js

import React from "react"
import { INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const url = node.data.uri
      return (
        <a
          href={url}
          className="text-neon-cyan underline hover:opacity-80 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    },
    // Add more overrides as needed (e.g., headings, images, etc.)
  },
}

export const renderRichText = raw => {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return documentToReactComponents(parsed, options)
  } catch {
    return null
  }
}
