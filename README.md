# su-fsd

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Repository

ou can find the source code in the [GitHub repository](https://github.com/amadebusuyi/su-fsd)

## Description

This application reads a list of items from an external file via an API endpoint and allows users to sort the list in multiple ways. Each item includes the following attributes:

- `createdAt`: A timestamp of when the item was created.
- `filename`: The name of the file.

### Sorting Features

The list can be sorted in three different ways:

1. **Sort by `createdAt` (ascending)**  
   Items are sorted by the date they were created.

2. **Sort by `filename` (ascending)**  
   Items are sorted lexicographically, but **digits in filenames are treated as numbers**.  
   Example: `file2.txt` comes before `file10.txt`.

3. **Sort by `filename` (descending)**  
   Similar to the ascending sort above, but in reverse order.

## API Endpoint

The data powering this application is served from a Next.js API route:

### **`GET /api/data`**

This endpoint returns a JSON array of items with the following structure:

```json
[
  {
    "createdAt": "2024-01-01 12:00",
    "filename": "001aba1c.txt"
  },
  {
    "createdAt": "2024-01-02 12:00",
    "filename": "aab10a.txt"
  }
]
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

For more deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
