"use client";
import Link from "next/link";
import styles from "@styles/Header.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import UserMenu from "./UserMenu";
import { MdClose } from "react-icons/md";

const Header = () => {
  const { replace } = useRouter();
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const returnNavigationItems = (color = "white") => {
    const navigationItems = [
      <Link
        href="/"
        className={`${pathname == "/" ? styles.active : ""} ${styles.link
          } text-${color}`}
        key={0}
        onClick={() => setIsVisible(false)}
      >
        Home
      </Link>,
      <Link
        href="/about"
        className={`${pathname == "/about" ? styles.active : ""} ${styles.link
          } text-${color}`}
        key={1}
        onClick={() => setIsVisible(false)}
      >
        About me
      </Link>,
      <Link
        href="/contact"
        className={`${pathname == "/contact" ? styles.active : ""} ${styles.link
          } text-${color}`}
        key={2}
        onClick={() => setIsVisible(false)}
      >
        Contact
      </Link>,
    ];
    return navigationItems;
  };

  useEffect(() => {
    const getUserData = () => {
      const username = localStorage.getItem("username");
      const avatar = localStorage.getItem("avatar");

      if (username && avatar) {
        setUserData({ username, avatar });
      }
    };
    getUserData();
  }, []);

  return (
    <nav>
      <div className="page_padding flex justify-between items-center mt-8 mb-10">
        <Link href="/">
          <h1 className="text-9xl font-bold">Blog.</h1>
        </Link>
        <div className="">
          <ul className="peer gap-4 hidden active md:flex items-center">
            {returnNavigationItems()}

            {userData ? (
              <UserMenu
                userAvatar={userData.avatar}
                setUserData={setUserData}
              />
            ) : (
              <button
                className="border-2 border-white border-solid py-2 px-6 hover:bg-white hover:text-black"
                onClick={() => replace("/auth/login", { scroll: false })}
              >
                Sign In
              </button>
            )}
          </ul>
          <FiMenu
            className="block md:hidden text-4xl"
            onClick={() => setIsVisible(!isVisible)}
          />
          <div
            className={`${!isVisible && "hidden"
              } absolute right-0 w-[60vw] h-[100vh] bg-white top-0 z-10 mobile_menu p-4`}
          >
            <MdClose
              className="text-black text-5xl ml-auto"
              onClick={() => setIsVisible(false)}
            />
            <ul className="flex flex-col gap-4">
              {returnNavigationItems("black")}

              {userData ? (
                <>
                  <Link
                    href="/add"
                    className="text-black"
                    onClick={() => setIsVisible(false)}
                  >
                    Add an article
                  </Link>
                  <Link
                    href="/my-articles"
                    className="text-black"
                    onClick={() => setIsVisible(false)}
                  >
                    My Articles
                  </Link>
                  <button
                    onClick={() => {
                      setUserData(null);
                      localStorage.clear();
                    }}
                    className="border-2 text-black border-black border-solid py-2 px-6 hover:bg-black hover:text-white"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <button
                  className="border-2 text-black border-black border-solid py-2 px-6 hover:bg-black hover:text-white"
                  onClick={() => replace("/auth/login", { scroll: false })}
                >
                  Sign In
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
