"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function SearchField() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.currentTarget.query as HTMLInputElement).value.trim();
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl group">
      <div className="relative flex items-center">
        <Input
          name="query"
          placeholder="Search fashion, jobs..."
          className="h-9 md:h-11 w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-2xl pl-3 md:pl-5 pr-10 md:pr-12 text-sm md:text-[15px] shadow-inner transition-all duration-500 ease-out 
                     group-hover:border-[#fc3fb4]/50 group-hover:shadow-sm
                     focus:bg-white focus:border-[#fc3fb4] focus:ring-4 focus:ring-[#fc3fb4]/10 
                     focus:shadow-[0_8px_30px_rgb(252,63,180,0.12)] placeholder:text-gray-500 font-medium"
        />
        <button 
          type="submit"
          className="absolute right-1.5 p-2 md:p-2.5 rounded-xl bg-gradient-to-br from-[#fc3fb4] to-[#ff7eb3] text-white shadow-sm
                     hover:shadow-[#fc3fb4]/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
        >
          <SearchIcon className="size-3.5 md:size-4 stroke-[2.5px]" />
        </button>
      </div>
    </form>
  );
}
