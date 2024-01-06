"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const UserMenu = ({ userAvatar, setUserData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleLogOut = () => {
    setUserData(null);
    localStorage.clear();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-[64px] h-[64px] relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={userAvatar} fill className="rounded-full" alt="user logo" />
      </button>

      <div
        ref={dropdownRef}
        className={`${!isOpen && "hidden"
          } absolute mt-2 p-8 bg-c_gray_lighter z-10 w-64 right-0 flex flex-col items-center gap-4 bg-white text-black`}
      >
        <Link href="/add" onClick={() => setIsOpen(false)}>
          Add an article
        </Link>

        <Link href="/my-articles" onClick={() => setIsOpen(false)}>
          My articles
        </Link>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
};
export default UserMenu;
