"use client";
import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchText) {
      params.set("search", searchText);
    }
    replace(`/blogs?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex w-full items-center"
    >
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="h-10 rounded-l-full border border-muted-foreground/40 pr-10 outline-none ring-0 placeholder:text-muted-foreground/50 focus:border-blue-500 focus-visible:ring-0"
        placeholder="Search"
      />
      {searchText.length > 0 && (
        <button
          onClick={() => setSearchText("")}
          type="button"
          className="absolute right-16 flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted/60"
        >
          <IoCloseOutline className="h-6 w-6" />
        </button>
      )}
      <button
        type="submit"
        className="flex h-10 w-20 items-center justify-center rounded-r-full border border-l-0 bg-muted/50"
      >
        <IoSearchOutline />
      </button>
    </form>
  );
};

export default SearchBox;
