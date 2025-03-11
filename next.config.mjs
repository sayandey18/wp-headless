/** @type {import('next').NextConfig} */

import { withFaust, getWpHostname } from '@faustwp/core';

const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: getWpHostname(),
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '0.gravatar.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '1.gravatar.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '2.gravatar.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '3.gravatar.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'secure.gravatar.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'cdn.prod.website-files.com',
                pathname: '/**'
            }
        ]
    }
};

export default withFaust(nextConfig);
