"use client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchText) {
      params.set("search", searchText);
    } else {
      params.delete("search");
    }
    replace(`/blogs?${params.toString()}`);
  }, [searchText]);

  return (
    <div className="hidden w-full items-center md:flex">
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="h-10 rounded-l-full border border-muted-foreground/40 pr-10 outline-none ring-0 placeholder:text-muted-foreground/50 focus:border-blue-500 focus-visible:ring-0"
        placeholder="Search"
      />
      <div className="relative flex h-10 w-20 items-center justify-center rounded-r-full border border-l-0 bg-muted/50">
        {searchText.length > 0 && (
          <button
            onClick={() => setSearchText("")}
            className="absolute -left-8 flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted/60"
          >
            <IoCloseOutline className="h-6 w-6" />
          </button>
        )}

        <IoSearchOutline />
      </div>
    </div>
  );
};

export default SearchBox;
