## Development

### Pre-requisites
- Create a Supabase project and update the details in the `.env.local.example`
- In `Supabase`, navigate to the `SQL` editor and create a new table with the **Quick start: User Management Starter** (run the query)
- In `Supabase`, navigate to the `Database` section and add `first_name` and `last_name` to the `profiles` table
- In `Supabase`, navigate to the `Database` section and create a new table `data` that contains the following fields:
```
fruit text null
size text null
price text null
```

1. Run the development server

```bash
npm run dev
# or
yarn dev
```
_If you decide to go for `npm`, remove the `yarn.lock` file, if you decide to go for `yarn`, remove the `package-lock.json` file_

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Supabase documentation](https://supabase.com/docs)


## Deploy on Vercel

[Next.js deployment documentation](https://nextjs.org/docs/deployment).
