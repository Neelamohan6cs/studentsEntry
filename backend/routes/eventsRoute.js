const express = require("express");
const router = express.Router();
const Events = require("../models/events");
const authRouter = require("./auth");
const authenticate = authRouter.authenticate;
const crypto = require("crypto");

// ─── POST /api/event/create ─────────────────────────────────────────────────
router.post("/create", async (req, res) => {
    try {
        const { eventName, eventCollege, available, place, eventdate } = req.body;

        if (!eventName || !eventCollege || !available || !place || !eventdate) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const createEvent = await Events.create({
            eventName, eventCollege, available, place, eventdate
        });

        res.status(201).json({ success: true, message: "Successfully created", event: createEvent });

    } catch (error) {
        console.error("Create event error:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

router.get("/all", async (req, res) => {
    try {
        const events = await Events.find();
        // Empty array is a normal, successful result — not an error
        res.status(200).json({ success: true, events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
   
      
        
router.post("/book/:id", authenticate, async (req, res) => {
    try {
        // Only "user" role can book
        if (req.user.role !== "user") {
            return res.status(403).json({
                success: false,
                message: "Only users can book tickets. Staff are not allowed."
            });
        }

        const userEmail = req.user.email;
        const eventId = req.params.id;

        // Find the event
        const event = await Events.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found." });
        }

        // Check if already booked
        if (event.bookedemail.includes(userEmail)) {
            return res.status(400).json({
                success: false,
                message: "You have already booked a ticket for this event."
            });
        }

        // Check availability
        if (event.available <= 0) {
            return res.status(400).json({
                success: false,
                message: "No tickets available for this event."
            });
        }

        // Book the ticket
        event.bookedemail.push(userEmail);
        event.available -= 1;
        await event.save();

        // Generate unique booking ID
        const bookingId = "BK-" + crypto.randomBytes(6).toString("hex").toUpperCase();

        return res.status(200).json({
            success: true,
            message: "Ticket booked successfully!",
            bookingId,
            details: {
                eventName: event.eventName,
                eventCollege: event.eventCollege,
                place: event.place,
                eventdate: event.eventdate,
                bookedEmail: userEmail,
                remainingTickets: event.available
            }
        });

    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

module.exports = router;