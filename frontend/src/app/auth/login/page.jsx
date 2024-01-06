"use client";
import { useState } from "react";
import "@styles/auth.css";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseData = await response.json();
    if (response.status == 200) {
      console.log(responseData);
    } else {
      setStatus("Worng email or password");
    }
  };

  return (
    <div className="page_padding">
      <form>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="e.g. johndoe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="your very secure password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
          className={`text-red-500 ${status.length > 0 ? "opacity-1" : "opacity-0"
            }`}
        >
          {status}
        </p>
        <button type="submit" className="submit_btn" onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </div>
  );
};
export default Page;
