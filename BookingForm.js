import React, { useState } from "react";
import jsPDF from "jspdf";

function BookingForm({ event, updateTickets, addBooking }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        tickets: ""
    });

    const [errors, setErrors] = useState({});
    const [bookingSummary, setBookingSummary] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [tempBooking, setTempBooking] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.department.trim()) {
            newErrors.department = "Department is required";
        }

        if (!formData.tickets) {
            newErrors.tickets = "Number of tickets is required";
        } else if (parseInt(formData.tickets) <= 0) {
            newErrors.tickets = "Tickets must be a positive number";
        } else if (parseInt(formData.tickets) > event.availableTickets) {
            newErrors.tickets = "Not enough tickets available";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const ticketCount = parseInt(formData.tickets);
        const totalAmount = ticketCount * event.price;

        const booking = {
            bookingId: Date.now(),
            userName: formData.name,
            email: formData.email,
            department: formData.department,
            eventName: event.name,
            ticketsBooked: ticketCount,
            totalAmount: totalAmount,
            paymentStatus: "Pending"
        };

        setTempBooking(booking);
        setShowPayment(true);
        setPaymentSuccess(false);
    };

    const handlePayment = () => {
        if (!tempBooking) return;

        const finalBooking = {
            ...tempBooking,
            paymentStatus: "Paid"
        };

        updateTickets(finalBooking.ticketsBooked);

        if (addBooking) {
            addBooking(finalBooking);
        }

        setBookingSummary(finalBooking);
        setPaymentSuccess(true);
        setShowPayment(false);

        setFormData({
            name: "",
            email: "",
            department: "",
            tickets: ""
        });

        setErrors({});
        setTempBooking(null);
    };

    const handleReset = () => {
        setFormData({
            name: "",
            email: "",
            department: "",
            tickets: ""
        });
        setErrors({});
        setBookingSummary(null);
        setShowPayment(false);
        setTempBooking(null);
        setPaymentSuccess(false);
    };

    const downloadInvoice = () => {
        if (!bookingSummary) return;

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Event Ticket Booking Invoice", 20, 20);

        doc.setFontSize(12);
        doc.text(`Booking ID: ${bookingSummary.bookingId}`, 20, 40);
        doc.text(`Name: ${bookingSummary.userName}`, 20, 50);
        doc.text(`Email: ${bookingSummary.email}`, 20, 60);
        doc.text(`Department: ${bookingSummary.department}`, 20, 70);
        doc.text(`Event Name: ${bookingSummary.eventName}`, 20, 80);
        doc.text(`Tickets Booked: ${bookingSummary.ticketsBooked}`, 20, 90);
        doc.text(`Ticket Price: ₹${event.price}`, 20, 100);
        doc.text(`Total Amount: ₹${bookingSummary.totalAmount}`, 20, 110);
        doc.text(`Payment Status: ${bookingSummary.paymentStatus}`, 20, 120);
        doc.text(`Venue: ${event.venue}`, 20, 130);
        doc.text(`Date: ${event.date}`, 20, 140);
        doc.text(`Time: ${event.time}`, 20, 150);

        doc.save(`Invoice_${bookingSummary.bookingId}.pdf`);
    };

    return (
        <div className="card">
            <h2>Book Tickets</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input
                    type="text"
                    name="department"
                    placeholder="Enter your department"
                    value={formData.department}
                    onChange={handleChange}
                />
                {errors.department && <p className="error">{errors.department}</p>}

                <input
                    type="number"
                    name="tickets"
                    placeholder="Enter number of tickets"
                    value={formData.tickets}
                    onChange={handleChange}
                />
                {errors.tickets && <p className="error">{errors.tickets}</p>}

                <div className="button-group">
                    <button type="submit">Proceed to Payment</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>
            </form>

            {showPayment && tempBooking && (
                <div className="summary-card">
                    <h3>Payment Section</h3>
                    <p><strong>Name:</strong> {tempBooking.userName}</p>
                    <p><strong>Event:</strong> {tempBooking.eventName}</p>
                    <p><strong>Tickets:</strong> {tempBooking.ticketsBooked}</p>
                    <p><strong>Total Amount:</strong> ₹{tempBooking.totalAmount}</p>
                    <button onClick={handlePayment}>Pay Now</button>
                </div>
            )}

            {paymentSuccess && bookingSummary && (
                <div className="summary-card">
                    <h3>Booking Summary</h3>
                    <p className="success">Payment successful and booking confirmed!</p>
                    <p><strong>Booking ID:</strong> {bookingSummary.bookingId}</p>
                    <p><strong>User Name:</strong> {bookingSummary.userName}</p>
                    <p><strong>Email:</strong> {bookingSummary.email}</p>
                    <p><strong>Department:</strong> {bookingSummary.department}</p>
                    <p><strong>Event Name:</strong> {bookingSummary.eventName}</p>
                    <p><strong>Tickets Booked:</strong> {bookingSummary.ticketsBooked}</p>
                    <p><strong>Total Amount:</strong> ₹{bookingSummary.totalAmount}</p>
                    <p><strong>Payment Status:</strong> {bookingSummary.paymentStatus}</p>

                    <button onClick={downloadInvoice}>Download Invoice</button>
                </div>
            )}
        </div>
    );
}

export default BookingForm;