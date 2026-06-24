import { useState } from "react";
import axios from "axios";

export default function Staff() {
    const [form, setForm] = useState({
        eventName: "",
        eventCollege: "",
        available: "",
        place: "",
        eventdate: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/event/create",
                form
            );

            if (data.success) {
                setMessage("Event created successfully!");
                setForm({
                    eventName: "",
                    eventCollege: "",
                    available: "",
                    place: "",
                    eventdate: "",
                });
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Server error. Is backend running?");
        }

        setLoading(false);
    };

    return (
        <div className="staff-page">
            <h1>Create Event</h1>

            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label>Event Name</label>
                    <input
                        type="text"
                        name="eventName"
                        value={form.eventName}
                        onChange={handleChange}
                        placeholder="Enter event name"
                    />
                </div>

                <div>
                    <label>College</label>
                    <input
                        type="text"
                        name="eventCollege"
                        value={form.eventCollege}
                        onChange={handleChange}
                        placeholder="Enter college name"
                    />
                </div>

                <div>
                    <label>Available Tickets</label>
                    <input
                        type="number"
                        name="available"
                        value={form.available}
                        onChange={handleChange}
                        placeholder="Enter number of tickets"
                        min="1"
                    />
                </div>

                <div>
                    <label>Place</label>
                    <input
                        type="text"
                        name="place"
                        value={form.place}
                        onChange={handleChange}
                        placeholder="Enter venue/location"
                    />
                </div>

                <div>
                    <label>Event Date</label>
                    <input
                        type="date"
                        name="eventdate"
                        value={form.eventdate}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Event"}
                </button>
            </form>

            {message && <p className="status-message">{message}</p>}
        </div>
    );
}