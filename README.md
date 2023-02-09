# Willow

## Background

Willow is a full stack clone of the real estate website Zillow. It was built with a Ruby on Rails backend, a PostgreSQL database, and a JavaScript React/Redux frontend. Willow simulates the user experience of a potential homebuyer, providing navigation, search, and exploration to find their perfect home. It features CRUD functionality for appointments and reviews, and partial CRUD for favoriting listings.

# Technologies

* The frontend is coded in JavaScript
* React and Redux were used to render components and manage state
* Ruby was used to code the routes, models, and controllers
* A rails framework tied this code to a PostgreSQL database
* A google map API shows the locations of various listings
* An AWS database houses the image repository for listings

# Selected Features and Development

## Create Appointment

Appointment creation is powered by an intermediary click handler which opens an appointment module, presenting curated selections of available dates and times to the user. The frontend fetches all of the user's appointments and those of the listing's agent, placing them in state. An algorithm then prunes available times for the appointment for the selected date. A user cannot double-book themselves or a specific agent since unavailable times are not offered in the appointment maker. 

### LSPAppointmentsManager.js

```javascript

  const timeAvailabilitySorter = () => {
    const timeSlots = ["08:00", "11:30", "15:00", "18:30"]
    var agentAppointmentsTimes = []
    var userAppointmentsTimes = []

    appointments.forEach((appointment)=>{
      if (appointment.date === date.toISOString().slice(0, 10)) {
        if (appointment.agentId == agentId) {
          agentAppointmentsTimes.push(appointment.time)
        }

        if (appointment.userId == currentUser.id) {
          userAppointmentsTimes.push(appointment.time)
        }
      }
    })

    const availableTimes = []
    timeSlots.forEach((timeSlot) => { 
      if (!agentAppointmentsTimes.includes(timeSlot) && !userAppointmentsTimes.includes(timeSlot)) {
        availableTimes.push(timeSlot)
      }
    })

    return availableTimes
  }

```

Once an appointment exists and is added to state, a listener function evaluates all appointments currently in state seeking appointments between the user and listing that are in the future. If any are present, the appoint-maker module dissapears and the component renders relevant appointment information.

![appointments](https://raw.githubusercontent.com/Marcoshenrich/willow/main/github-images/willow-appointments.gif)


```javascript

  const appointmentExistsChecker = () => {
    appointments.forEach((appointment, i) => {
      if (appointment.userId == currentUser.id 
        && appointment.listingId == listing.id
        && (Date.parse(`${appointment.date}T${appointment.time}:00`) > now.getTime())
        ) {
          setshowAppointmentModule(false)
          setAppointmentIndex(i)
        return
      }
    })
  }

```
## Reviews

The core review section in each listing is responsive to various user and review states. It renders components modularly on the following booleans - whether a user is logged in, whether any reviews exist, and whether a user is writing a review or not. 

![reviews](https://raw.githubusercontent.com/Marcoshenrich/willow/main/github-images/willow-reviews.gif)