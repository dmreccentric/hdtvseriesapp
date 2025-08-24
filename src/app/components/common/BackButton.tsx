"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // go back if possible
    } else {
      router.push("/"); // fallback to home if no history
    }
  };
  return (
    <button
      onClick={handleBack}
      className="text-3xl font-light p-1 hover:text-gray-300 hover:border-1 active:border-1 hover:border-white active:border-white"
    >
      <FaChevronLeft />
    </button>
  );
};

export default BackButton;
