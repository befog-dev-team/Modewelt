import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: URLSearchParams;
}): Promise<Metadata> {
  const query = searchParams.get("q") || "";

  return {
    title: `Search results for "${query}"`,
  };
}
