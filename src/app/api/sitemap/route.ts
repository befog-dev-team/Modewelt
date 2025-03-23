import { NextResponse } from "next/server";

export async function GET() {
    const siteUrl = "https://modeweltjob.com";

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${siteUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${siteUrl}/auth</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.9</priority>
    </url>
</urlset>`.trim();

    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
