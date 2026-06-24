import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", role: "user" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setMessage("");

            const body = isRegister
                ? { name: form.name, email: form.email, role: form.role }
                : { email: form.email };

            try {
                const res = await fetch("http://localhost:5000/api/auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                const data = await res.json();

                if (data.success) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    setMessage(`Welcome ${data.user.name}! Role: ${data.user.role}`);

                    // Navigate based on role
                    if (data.user.role === "staff") {
                        navigate("/staff");
                    } else {
                        navigate("/user");
                    }
                } else {
                    setMessage(data.message);
                }
            } catch (err) {
                setMessage("Server error. Is backend running?");
            }

            setLoading(false);
        };

    return (
        <div className="login-page">
            <div className="left-half">
                <h1>College Events Booking and Creating Platform</h1>
                <h2>Staff Role</h2>
                <p>Can create the events</p>
                <h2>User Role</h2>
                <p>Can book the events</p>
            </div>

            <div className="right-half">
                <h1>{isRegister ? "Register" : "Login"}</h1>

                <form className="form" onSubmit={handleSubmit}>
                    {isRegister && (
                        <>
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label>Role</label>
                                <select name="role" value={form.role} onChange={handleChange}>
                                    <option value="user">User</option>
                                    <option value="staff">Staff</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
                    </button>
                </form>

                {message && <p>{message}</p>}

                <p>
                    {isRegister ? "Already have an account?" : "Don't have an account?"}
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setMessage("");
                        }}
                    >
                        {isRegister ? "Login" : "Register"}
                    </button>
                </p>
            </div>
        </div>
    );
}