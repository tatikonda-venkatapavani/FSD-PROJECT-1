import React from "react";

function BookingTable({ bookings }) {
    if (!bookings || bookings.length === 0) {
        return <p>No bookings available yet.</p>;
    }

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Event Name</th>
                        <th>Tickets</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.bookingId}>
                            <td>{booking.bookingId}</td>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.department}</td>
                            <td>{booking.eventName}</td>
                            <td>{booking.ticketsBooked}</td>
                            <td>₹{booking.totalAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookingTable;