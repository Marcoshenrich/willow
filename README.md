# Willow

## Background

Willow is a full stack clone of the real estate website Zillow. It was built with a Ruby on Rails backend, a PostgreSQL database, and a JavaScript React/Redux frontend. Willow simulates the user experience of a potential homebuyer, providing navigation, search, and exploration to find their perfect home. It features CRUD functionality for appointments and reviews, and partial CRUD for favoriting listings.

# Technologies

* The frontend is coded in JavaScript
* React and Redux were used to render components and manage state
* Ruby was used to code the routes, models, and controllers
* A rails framework tied this code to a PostgreSQL database
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
## Ride Show

All this data, but what to do with it? Render it handsomely, of course! The ride show page displays (if input by the user) a beautiful and interactive map with a polyline representing the route, an elevation profile area chart allowing inspection of points anywhere along the route, relevant ride data such as duration and distance, and a selection of user-uploaded photos that can be clicked to access a dynamic modal.

Here is the code for the elevation chart, powered by Recharts.js.

### RideShow index.js
```javascript

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

<div className="ride-show-elevation">
    <ResponsiveContainer width="100%" >
      <AreaChart data={elevationData} margin={{top: 10, right: 30}}>
          <CartesianGrid />
          <XAxis tick={false}/>
          <YAxis padding={{ top: 50 }}/>
          <Tooltip />
          <Area type="monotone" dataKey="elevation" fill="gray" stroke="gray"
              activeDot={{ r: 8 }} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
      
```

The custom modal allows infinite rolodexing through a modulo that wraps the current photo index.

### RideShow index.js

```javascript

  const showPhotoModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setOpenModal(false)
  }
  
  ...
  
  return (
    <div className="page-container-show">
      {openModal && < PhotoModal ride={ride} closeModal={closeModal}/>}
      <div className="ride-show-header">
      
  ...
  
  <div className="show-main-img">
    {ride.photoUrls?.slice(0, 5).map((photoUrl, i) => (
      <div key={i} className='small-square-thumb-box'>
        <img onClick={showPhotoModal} className='photo-thumb' alt='Ride' src={photoUrl}/>
      </div>
    ))}
  </div>
  
  ```