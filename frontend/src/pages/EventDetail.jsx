import React, { Suspense } from "react"
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom"
import EventItem from "../components/EventItem"
import EventsList from "../components/EventsList"

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail")

  return (
    <>
      <Await resolve={event}>
        {(loadedEvent) => <EventItem event={loadedEvent} />}
      </Await>
      <Suspense fallback={<p style={{ textAlign: "center" }}> Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
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

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id)
  if (!response.ok) {
    throw json({ message: "Could not fetch events" }, { status: 500 })
  } else {
    const data = await response.json()
    return data.event
  }
}

export async function loader({ params }) {
  const id = params.eventId
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  })
}

export async function action({ request, params }) {
  const id = params.eventId
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  })
  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 })
  } else {
    return redirect("/events")
  }
}
export default EventDetailPage
