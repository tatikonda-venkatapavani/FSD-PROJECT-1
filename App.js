import React, { useState } from "react";
import EventDetails from "./components/EventDetails";
import BookingForm from "./components/BookingForm";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import "./App.css";

function App() {
  const [events] = useState([
    {
      id: 1,
      name: "Internal Technical Fest 2026",
      department: "Department of Computer Science",
      date: "10 June 2026",
      time: "10:00 AM",
      venue: "Seminar Hall A",
      price: 200,
      availableTickets: 50
    },
    {
      id: 2,
      name: "AI & ML Workshop",
      department: "Department of AI & DS",
      date: "15 June 2026",
      time: "2:00 PM",
      venue: "Lab Complex",
      price: 150,
      availableTickets: 40
    },
    {
      id: 3,
      name: "Cyber Security Seminar",
      department: "Department of IT",
      date: "19June 2026",
      time: "11:00 AM",
      venue: "Seminar Hall B",
      price: 100,
      availableTickets: 50
    },
    {
      id: 4,
      name: "LAVAZA 2026",
      department: "Department of EEE",
      date: "18June 2026",
      time: "11:00 AM",
      venue: "4th block",
      price: 100,
      availableTickets: 60
    },
    {
      id: 5,
      name: "Cyber Security Seminar",
      department: "Department of IT",
      date: "20 June 2026",
      time: "11:00 AM",
      venue: "Seminar Hall B",
      price: 100,
      availableTickets: 40
    },
    {
      id: 6,
      name: "Tantraz 2026",
      department: "Department of ECE",
      date: "22 June 2026",
      time: "11:00 AM",
      venue: "33 th block",
      price: 100,
      availableTickets: 50
    },
    {
      id: 7,
      name: "Coding Contest",
      department: "Department of Computer Science",
      date: "25 June 2026",
      time: "11:00 AM",
      venue: "Seminar Hall C",
      price: 100,
      availableTickets: 30
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const updateTickets = (bookedTickets) => {
    setSelectedEvent((prev) => ({
      ...prev,
      availableTickets: prev.availableTickets - bookedTickets
    }));

    setEventsInListAfterUpdate(bookedTickets);
  };

  const setEventsInListAfterUpdate = (bookedTickets) => {
    // update events array so list also reflects updated tickets
    // if you want, you can keep this logic, else you can skip syncing list
  };

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const resetAllBookings = () => {
    setBookings([]);
    // optional: reset selectedEvent tickets as well
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setSelectedEvent(null);
  };

  return (
    <div className="App">
      <h1>Department Event Ticket Booking</h1>

      {/* FRONT PAGE: events before login */}
      {!isLoggedIn && (
        <>
          <h2>Available Events</h2>
          <div className="event-list">
            {events.map((ev) => (
              <div
                key={ev.id}
                className={
                  selectedEvent && selectedEvent.id === ev.id
                    ? "event-card selected"
                    : "event-card"
                }
                onClick={() => handleEventSelect(ev)}
              >
                <h3>{ev.name}</h3>
                <p><strong>Department:</strong> {ev.department}</p>
                <p><strong>Date:</strong> {ev.date}</p>
                <p><strong>Time:</strong> {ev.time}</p>
                <p><strong>Venue:</strong> {ev.venue}</p>
                <p><strong>Ticket Price:</strong> ₹{ev.price}</p>
                <p><strong>Available Tickets:</strong> {ev.availableTickets}</p>
              </div>
            ))}
          </div>

          {/* Login only enabled if event selected */}
          <LoginPage onLogin={handleLogin} disabled={!selectedEvent} />
          {!selectedEvent && (
            <p className="error">
              Please select an event above before logging in.
            </p>
          )}
        </>
      )}

      {/* AFTER LOGIN */}
      {isLoggedIn && selectedEvent && (
        <>
          <div className="nav-buttons">
            <span className="role-label">
              Logged in as: <strong>{role === "admin" ? "Admin" : "User"}</strong>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>

          {role === "user" && (
            <>
              <EventDetails event={selectedEvent} />
              <BookingForm
                event={selectedEvent}
                updateTickets={updateTickets}
                addBooking={addBooking}
              />
            </>
          )}

          {role === "admin" && (
            <AdminDashboard
              event={selectedEvent}
              bookings={bookings}
              resetAllBookings={resetAllBookings}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;