import Link from "next/link";
import { LiaTelegram } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className="bg-[#2d0202] text-white p-4 ">
      <div className="">
        <h3 className="font-bold text-2xl text-left mb-2">HDTVSERIES</h3>
        <p className="text-left font-light mb-3">
          This site does not store any files on its server. it only links to
          media files hosted on Telegram.
        </p>
        <Link
          href="https://t.me/+2nzEWqvZAaMyNjk0"
          className="flex text-gray-500 items-center mb-7 space-x-3"
        >
          <LiaTelegram />
          <span>Join us on Telegram</span>
        </Link>
      </div>
      <div className="mb-4">
        <h3 className="border-b-1 pb-1 mb-3 w-fit">Quick Menu</h3>
        <div className="flex flex-col">
          <Link href="/" className="text-gray-500 w-fit focus-visible:  mb-1 ">
            Home
          </Link>
          <Link href="/Movies" className="w-fit text-gray-500  mb-1 ">
            Movies
          </Link>
          <Link href="/series" className="w-fit text-gray-500  mb-1 ">
            Series
          </Link>
          <Link href="/trailers" className="text-gray-500  w-fit ">
            Trailers
          </Link>
        </div>
      </div>
      <p className="text-center border-t-1 pt-3">
        {" "}
        &copy; {new Date().getFullYear()} HDTvSeries * ALL RIGHTS RESERVED
      </p>
    </footer>
  );
};

export default Footer;
