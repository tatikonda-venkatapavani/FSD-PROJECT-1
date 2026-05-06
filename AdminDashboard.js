// src/components/AdminDashboard.js
import React from "react";

function AdminDashboard({ event, bookings, resetAllBookings }) {
    const totalTicketsBooked = bookings.reduce(
        (sum, b) => sum + b.ticketsBooked,
        0
    );

    const totalRevenue = bookings.reduce(
        (sum, b) => sum + b.totalAmount,
        0
    );

    return (
        <div className="card">
            <h2>Admin Dashboard</h2>

            <h3>Event: {event.name}</h3>
            <p><strong>Department:</strong> {event.department}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Available Tickets:</strong> {event.availableTickets}</p>

            <hr />

            <h3>Booking Summary</h3>
            <p><strong>Total Tickets Booked:</strong> {totalTicketsBooked}</p>
            <p><strong>Total Revenue:</strong> ₹{totalRevenue}</p>

            <button onClick={resetAllBookings} style={{ marginTop: "10px" }}>
                Reset All Bookings
            </button>

            <hr />

            <h3>All Bookings</h3>
            {bookings.length === 0 && <p>No bookings yet.</p>}

            {bookings.length > 0 && (
                <table border="1" width="100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Tickets</th>
                            <th>Total Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.bookingId}>
                                <td>{b.bookingId}</td>
                                <td>{b.name}</td>
                                <td>{b.email}</td>
                                <td>{b.department}</td>
                                <td>{b.ticketsBooked}</td>
                                <td>{b.totalAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminDashboard;