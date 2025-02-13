import prisma from '@/lib/prisma';
import { formatNumber } from '@/lib/utils';
import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import React from 'react'

const getTrendingTopics = unstable_cache( //unstable_cache is used to cache the data for a specific time
    async () => {
        // Get the top 10 most used hashtags
        const result = await prisma.$queryRaw < { hashtag: string; count: bigint }[]> ` 
            SELECT LOWER(unnest(regexp_matches(content, '#\[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) as count -- Get the hashtags from the posts and count them 
            FROM posts -- Get the hashtags from the posts
            GROUP BY (hashtag) -- Group by the hashtag
            ORDER BY count DESC, hashtag ASC -- Order by the count in descending order and the hashtag in ascending order
            LIMIT 10 -- Limit the result to 10
        `;

        // The result is an array of objects with the following shape:
        return result.map(row => ({
            hashtag: row.hashtag, // The hashtag
            count: Number(row.count) // The count
        }))
    },
    ["trending_topics"], // cache key
    {
        revalidate: 1 * 60, // 1 minute
    },
);

export default async function Index() {
    const trendingTopics = await getTrendingTopics(); // Get the trending topics

    return (
        (<div>
            <div className="bg-white min-h-[265px] p-4 mb-3 rounded-[4px]">
                <p className="font-[600] text-[12px] uppercase leading-[11.48px] font-[Gotham]">Trending Hashtags</p>

                {/* Divider */}
                <hr className="border-t border-[#F4F4F4] mt-4" />
                <div className="flex flex-wrap items-center w-[240px] mt-4 gap-[0.5rem]">
                    {trendingTopics.map(({ hashtag, count }) => { // Map over the trending topics
                        const title = hashtag.split("#")[1]; // Get the title of the hashtag without the #

                        return (
                            // Link to the hashtag page
                            (<Link key={title} href={`/hashtag/${title}`} className="block">
                                <div
                                    title={`${formatNumber(count)} ${count === 1 ? "post" : "posts"}`}
                                    className="bg-[#ffb7a3] min-w-[64px] h-[32px] flex justify-center rounded-[4px] items-center my-[0.1rem] text-[12px] px-2 font-[Gotham] leading-[18px]"
                                >
                                    {hashtag}
                                </div>
                            </Link>)
                        );
                    })}
                </div>
            </div>
        </div>)
    );
}
