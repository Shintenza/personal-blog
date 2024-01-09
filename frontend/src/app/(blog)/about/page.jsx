import Image from "next/image";
import githubAvatar from "@../public/github_avatar.jpg";
import { FaRegCalendar, FaCity } from "react-icons/fa";
import { HiLanguage } from "react-icons/hi2";
import { MdMailOutline } from "react-icons/md";
import { FaDiscord, FaLinkedin, FaGithub, FaReddit } from "react-icons/fa";
const Page = () => {
  const calculateAge = () => {
    const bornDate = new Date("06/18/2002");
    const diff = new Date(Date.now() - bornDate.getTime());
    return Math.abs(diff.getUTCFullYear() - 1970);
  };
  return (
    <div className="mt-24">
      <div className="flex gap-3 items-center flex-col">
        <div className="flex gap-8 flex-col">
          <div className="flex gap-4">
            <Image
              src={githubAvatar}
              width={200}
              height={200}
              alt="author image"
              className="hidden sm:block rounded-full"
            />
            <div>
              <h1 className="text-6xl mb-1">Kamil Kuziora</h1>
              <ul className="flex flex-col gap-2">
                <li className="block">
                  <FaRegCalendar className="inline-block text-2xl" /> Age:{" "}
                  {calculateAge()}
                </li>
                <li className="block">
                  <FaCity className="inline-block text-2xl" /> Current city:
                  Cracow
                </li>
                <li className="block">
                  <HiLanguage className="inline-block text-2xl" />
                  Languages: Polish (native), English
                </li>
                <li className="block ">
                  <MdMailOutline className="inline-block text-2xl" />
                  Email: kam.kuziora@gmail.com
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <a href="github.com" className="text-4xl">
              <FaGithub />
            </a>
            <a href="linkedin.com" className="text-4xl">
              <FaLinkedin />
            </a>
            <a href="discord.com">
              <FaDiscord className="text-4xl" />
            </a>
            <a href="reddit.com">
              <FaReddit className="text-4xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
