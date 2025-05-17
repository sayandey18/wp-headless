import { getSitemapProps } from '@faustwp/core';

export default function Sitemap() {}

export function getServerSideProps(ctx) {
    return getSitemapProps(ctx, {
        frontendUrl: process.env.FAUST_FRONTEND_URL,
        sitemapIndexPath: 'sitemap_index.xml'
    });
}
