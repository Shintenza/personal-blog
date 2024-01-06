"use client";
import Link from "next/link";
import styles from "@styles/Header.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null);
  const { replace } = useRouter();
  const pathname = usePathname();
  return (
    <nav>
      <div className="page_padding flex justify-between items-center mt-8 mb-10">
        <h1 className="text-9xl font-bold">Blog.</h1>
        <div className="flex gap-6 text-lg items-center">
          <Link
            href="/"
            className={`${pathname == "/" ? styles.active : ""} ${styles.link}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${pathname == "/about" ? styles.active : ""} ${styles.link
              }`}
          >
            About me
          </Link>
          <Link
            href="/contact"
            className={`${pathname == "/contact" ? styles.active : ""} ${styles.link
              }`}
          >
            Contact
          </Link>
          <button
            className="border-2 border-white border-solid py-2 px-6 hover:bg-white hover:text-black"
            onClick={() => replace("/auth/login", { scroll: false })}
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
