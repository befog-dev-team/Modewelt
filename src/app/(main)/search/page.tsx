
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
    <div className="bg-[#dcf59d] min-h-screen">
      <Navbar unreadNotificationCount={undefined} />
      <main className="flex w-full justify-center gap-5 mt-6">
        <div className="flex flex-col justify-center min-w-[70vw] space-y-5">
          <div className="rounded-2xl min-w-[50vw] bg-card p-5 shadow-sm border">
            <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
              Search results for &quot;{query}&quot;
            </h1>
          </div>
          <SearchResults query={query} />
        </div>
      </main>
    </div>
  );
}
