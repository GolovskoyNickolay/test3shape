# Task: Make Appointment

The sidebar already has a **Make appointment** menu item — but the route is empty. Your job is to build that page.

The user is a doctor scheduling a visit for a patient. They fill in:

- patient name
- patient phone number
- patient email
- date & time of the visit
- reason for the visit

When they submit the form, the appointment is saved through the API and the user stays on the page, ready to schedule the next one.

The visual design is up to you — there are no mockups. Angular Material is set up in the project; make the page feel at home next to the rest of the app.

Treat this as a real production screen — what would you want to handle if this shipped tomorrow?

Have fun.

## API

Base URL: `http://localhost:3000`

### `GET /appointments`

Returns all appointments (scheduled, completed, cancelled).

```json
[
  {
    "id": 3,
    "patientName": "Michael Brown",
    "patientPhone": "+1 (555) 456-7890",
    "patientEmail": "michael.brown@example.com",
    "scheduledAt": "2026-06-03T14:00:00Z",
    "reason": "Crown placement",
    "status": "scheduled"
  }
]
```

`status` is one of `"scheduled"`, `"completed"`, `"cancelled"`. `scheduledAt` is ISO 8601 UTC.

### `POST /appointments`

Creates a new appointment. The server assigns the `id` and returns the full record.

Request body:

```json
{
  "patientName": "Sara Connor",
  "patientPhone": "+1 (555) 111-2222",
  "patientEmail": "sara@example.com",
  "scheduledAt": "2026-06-20T10:00:00Z",
  "reason": "Cavity filling",
  "status": "scheduled"
}
```

Response:

```json
{
  "id": 7,
  "patientName": "Sara Connor",
  "patientPhone": "+1 (555) 111-2222",
  "patientEmail": "sara@example.com",
  "scheduledAt": "2026-06-20T10:00:00Z",
  "reason": "Cavity filling",
  "status": "scheduled"
}
```
