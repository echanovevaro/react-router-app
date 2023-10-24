import { Await, defer, json, useLoaderData } from "react-router-dom"

import EventsList from "../components/EventsList"
import { Suspense } from "react"

function EventsPage() {
  const { events } = useLoaderData()

  // console.log(events)
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(resolved) => <EventsList events={resolved} />}
      </Await>
    </Suspense>
  )
}
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events")
  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events" }
    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // })
    throw json({ message: "Could not fetch events" }, { status: 500 })
  } else {
    const data = await response.json()
    return data.events
  }
}
export function loader() {
  return defer({
    events: loadEvents(),
  })
}

export default EventsPage
