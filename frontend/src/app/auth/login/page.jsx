"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@styles/auth.css";
import { useRouter } from "next/navigation";

const BACKEND_URL = "http://localhost:8080";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [abortController, setAbortController] = useState(null);

  const { replace } = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (abortController) {
      abortController.abort();
    }

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch(`${BACKEND_URL}/user/login`, {
        method: "POST",
        signal: controller.signal,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      if (response.status == 200) {
        localStorage.setItem("avatar", `${BACKEND_URL}/avatar.jpg`);
        localStorage.setItem("username", responseData.username);
        replace("/", { scroll: false });
      } else {
        setStatus("Worng email or password");
      }
    } catch (error) {
      if (error.name == "AbortError") {
        console.log("aborted login");
      } else {
        setStatus("Server error while login. Try agin later");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  return (
    <div className="page_padding w-full h-[100vh]">
      <form>
        <Link href="/" scroll={false}>
          <h1 className="text-9xl">Blog.</h1>
        </Link>

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
