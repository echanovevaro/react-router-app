import { Form, redirect, useActionData, useNavigate } from "react-router-dom"

import classes from "./EventForm.module.css"

function EventForm({ method, event }) {
  const navigate = useNavigate()
  const data = useActionData()
  function cancelHandler() {
    navigate("..")
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          // required
          defaultValue={event ? event.title : ""}
        />
        {data && data.errors && data.errors.title && (
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {data.errors.title}
          </span>
        )}
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          // required
          defaultValue={event ? event.image : ""}
        />
        {data && data.errors && data.errors.image && (
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {data.errors.image}
          </span>
        )}
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          // required
          defaultValue={event ? event.date : ""}
        />
        {data && data.errors && data.errors.date && (
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {data.errors.date}
          </span>
        )}
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          // required
          defaultValue={event ? event.description : ""}
        />
        {data && data.errors && data.errors.description && (
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {data.errors.description}
          </span>
        )}
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  )
}

export async function action({ request, params }) {
  const data = await request.formData()

  const newEvent = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  }
  console.log(newEvent)
  let url = "http://localhost:8080/events"
  if (request.method === "PATCH") {
    const id = params.eventId
    url = `http://localhost:8080/events/${id}`
  }

  const response = await fetch(url, {
    method: request.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEvent),
  })
  if (response.status === 422) {
    return response
  }
  if (!response.ok) {
    throw response
  }

  return redirect("/events")
}

export default EventForm
