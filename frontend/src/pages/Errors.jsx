import React from "react"
import { useRouteError } from "react-router-dom"
import PageContent from "../components/PageContent"
import MainNavigation from "../components/MainNavigation"

export default function Errors() {
  const error = useRouteError()

  let title = "An error occurred"
  let message = "something went wrong"
  console.log(error)
  if (error.status === 500) {
    // message = JSON.parse(error.data).message
    message = error.data.message
  }
  if (error.status === 404) {
    title = "Page not found"
    message = "Sorry, the page you requested could not be found."
  }
  if (error.status === 400) {
    title = "Bad request"
    message = "Sorry, your request is invalid."
  }
  if (error.status === 422) {
    title = "Validation error"
    // message = "Please check your input"
    message = error.data.message
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
}
