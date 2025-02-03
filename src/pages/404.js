import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const NotFoundPage = () => (
  <Layout>
    <h1>404 No Existe</h1>
    <p>Lo sentimos en este enchufe no hay corriente...</p>
  </Layout>
)
export const Head = () => (
  <Seo
      title="404 No Existe | VLC Extreme"
  />
)
export default NotFoundPage
