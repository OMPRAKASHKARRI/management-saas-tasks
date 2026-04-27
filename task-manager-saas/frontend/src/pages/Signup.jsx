import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">

    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

      {/* 🔥 Logo + Title */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🚀</div>
        <h1 className="text-3xl font-bold text-blue-600">
          Task Manager
        </h1>
        <p className="text-gray-500 text-sm">Create your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Name"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Sign Up
        </button>
      </form>

      {/* 🔁 Login Link */}
      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-600 cursor-pointer font-semibold"
        >
          Login
        </span>
      </p>
    </div>
  </div>
);
}