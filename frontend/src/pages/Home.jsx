import React from "react"

import PageContent from "../components/PageContent"

function HomePage() {
  const title = "Welcome to the Events App"
  const message = "This is the home page"
  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
}

export default HomePage
