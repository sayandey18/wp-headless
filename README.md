# Next.js, Faust.js with GraphQL

This is a Next.js application that integrates Faust.js by WPEngine with GraphQL to build a headless WordPress frontend. Faust.js allows you to fetch data from a WordPress backend and use it in your Next.js app via GraphQL.

## For more information

For more information on this Blueprint please check out the following sources:

- [WP Engine's Atlas Platform](https://wpengine.com/atlas/)
- [Faust.js](https://faustjs.org)
- [WPGraphQL](https://www.wpgraphql.com)
- [Atlas Content Modeler](https://wordpress.org/plugins/atlas-content-modeler/)
- [WP Engine's Atlas developer community](https://developers.wpengine.com)

## Features

- Headless WordPress Integration: Fetch content from a WordPress site using GraphQL.
- GraphQL Queries & Mutations: Use GraphQL to retrieve and manage data.
- Optimized for SEO: Server-side rendering (SSR) with Next.js ensures optimal SEO performance.
- React & Next.js: Build modern, fast, and scalable user interfaces with React and Next.js.

## Prerequisites
- Node.js (>= 18.17)
- Yarn, npm or pnpm
- A WordPress instance with GraphQL enabled (via [WPGraphQL](https://www.wpgraphql.com/) plugin).

## Installation

### 1. Clone the repository

```
git clone https://github.com/sayandey18/wp-headless.git
cd wp-headless
```

### 2. Install dependencies

Install the required dependencies with either Yarn, npm or pnpm.

```
pnpm install
```

### 3. Set up environment variables

- Create a `.env.local` file in the root of the project. 
- Enter the WordPress URL for the GraphQL endpoint.
- Emter Faust plugin secter key, which found in WordPress Settings->Headless.

```
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com

FAUST_SECRET_KEY=
```

### 4. Update WordPress `possibleTypes.json`

```
pnpm generate
```

## Usage

### 1. Run the development server

After setting up the project and environment variables, run the development server.

```
pnpm run dev
```

This will start the app on `http://localhost:3000`.

❤️ Thank you for continue empowering headless WordPress.
