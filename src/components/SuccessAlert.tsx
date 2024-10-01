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
      <Alert
        variant={"success"}
        className="relative pr-20"
      >
        <RocketIcon className="h-5 w-5" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <div className="absolute right-3 top-0 flex h-full items-center justify-center">
          <button
            onClick={onClose}
            className="rounded-full p-2 duration-300 hover:bg-slate-400/10"
          >
            <IoClose className="text-xl text-green-500/90" />
          </button>
        </div>
      </Alert>
    </div>
  );
};

export default SuccessAlert;
