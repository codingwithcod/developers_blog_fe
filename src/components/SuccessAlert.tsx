import React, { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { IoClose } from "react-icons/io5";

interface IProps {
  onClose: () => void;
  title: string;
  description: string;
}

const SuccessAlert: FC<IProps> = ({ onClose, title, description }) => {
  return (
    <div className="relative">
      <Alert variant={"success"}>
        <RocketIcon className="h-5 w-5" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      <button
        onClick={onClose}
        className="absolute right-4 top-3 rounded-full p-2 duration-300 hover:bg-slate-400/10"
      >
        <IoClose className="text-xl text-green-500/90" />
      </button>
    </div>
  );
};

export default SuccessAlert;
