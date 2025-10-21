"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Login
        </button>
        <Link href="/signup" className="mt-3 inline-flex">
          <button className="bg-green-600 text-white py-2 rounded w-100 hover:bg-green-700">
            Sign Up
          </button>
        </Link>
        <Link href="/signup" className="mt-3 inline-flex">
          <button className="bg-green-600 text-white py-2 rounded w-100 hover:bg-green-700">
            forgot password
          </button>
        </Link>
      </form>
    </div>
  );
}
