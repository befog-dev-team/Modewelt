"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function SearchField() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.currentTarget.q as HTMLInputElement).value.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="focus:ring-[#a34e83] focus:outline-none">
      <div className="relative">
        <Input
          name="q"
          placeholder="Search"
          className="pr-10 sm:pr-8 md:pr-[4rem] lg:pr-[8rem] xl:pr-[10rem]"
        />
        <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>
    </form>
  );
}
