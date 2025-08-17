import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

interface type {
  title: string;
  link?: Url;
}

const CardHeading = ({ title, link }: type) => {
  return (
    <div className="flex justify-between items-start">
      <h2 className="text-xl font-bold mb-4 border-b-2 w-fit ">{title}</h2>
      <Link
        href={`${link ? `${link}` : "/"}`}
        className="flex items-center space-x-2 text-gray-400"
      >
        <span>View All</span>
        <FaLongArrowAltRight />
      </Link>
    </div>
  );
};

export default CardHeading;
