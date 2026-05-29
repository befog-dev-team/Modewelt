
import { Metadata } from "next";
import SearchResults from "./SearchResults";
import Navbar from "@/components/Navbar";

// Page properties
interface PageProps {
  searchParams: Promise<{ query: string }>;
}

// Generate the page metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const searchParams = await props.searchParams;

  const { query } = searchParams;

  return {
    title: `Search results for "${query}"`, // Set the page title
  };
}

// Get the search query from the query string
export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;

  const { query } = searchParams;

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <Navbar unreadNotificationCount={undefined} />
      <main className="flex w-full justify-center gap-5 mt-6 px-4">
        <div className="flex flex-col justify-center min-w-[70vw] max-w-5xl space-y-5">
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-md border dark:border-gray-800 transition-colors">
            <h1 className="line-clamp-2 break-all text-center text-2xl font-bold text-gray-900 dark:text-white transition-colors">
              Search results for &quot;{query}&quot;
            </h1>
          </div>
          <SearchResults query={query} />
        </div>
      </main>
    </div>
  );
}
