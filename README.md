# SKN React Query Type Extension & Client Library

<img width="150px" src="https://firebasestorage.googleapis.com/v0/b/skn-ultimate-project-la437.appspot.com/o/GitHub%20Library%2F12-TypeScript-SNQ.svg?alt=media&token=45ad0ccf-c07a-4a24-a1e1-70c0f3a00239" alt="next-query" />

> TypeScript Next.js

[![NPM Version](https://img.shields.io/npm/v/%40best-skn%2Fnext-query)](https://www.npmjs.com/package/@best-skn/next-query) [![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit)

&nbsp;

## **_Introduction:_**

### A simple react query type extension & client library for Next.js 14

### I made this library so that I can use it in all of my Next.js 14 projects without writing the same codes over and over again

&nbsp;

## **_Details:_**

### **`getQueryClient` function**

- It creates a query client with proper server & client configurations
- It has all the configurations to handle `Next.js streaming` in `loading.tsx ✅`
- This function can be used in both react server & client components in Next.js
- It is created as the instruction given in the
  official [Tanstack React Query](https://tanstack.com/query/v5/docs/framework/react/guides/advanced-ssr) documentation
  for Next.js
  SSR
- For usage instruction, see `Usage` section

### **`QueryHydrationProps` Type**

- The interface of props for React Server Component as data hydrator from server to client in Next.js
- It has `children`, `queryKey` & `queryFn` properties
- This interface is intended to be used in server side only i.e. only inside server components
- The data hydrator component will hold a react client component as child where the data will be re-fetched
- Inside the child component, use `useSuspenseQuery ✅` instead of `useQuery ❌`
- For usage instruction, see `Usage` section

&nbsp;

## **_Use Case:_**

- Next.js

&nbsp;

## **_Requirements:_**

### This library has peer dependency for React & React DOM of minimum 18.3.1. It may or may not work on 19.x

### This library also has peer dependency for Tanstack React Query of minimum 5.45.0. It may or may not work on 6.x

### This library is intended to be used in Next.js of minimum 14.2.3. It may or may not work on 15.x

### It also has peer dependency for Best SKN React Types of minimum 1.1.1.

- 💀 Minimum [react](https://www.npmjs.com/package/react) Version: `18.3.1`
- 💀 Minimum [@types/react](https://www.npmjs.com/package/@types/react) Version: `18.3.3`
- 💀 Minimum [react-dom](https://www.npmjs.com/package/react-dom) Version: `18.3.1`
- 💀 Minimum [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) Version: `18.3.0`
- 💀 Minimum [next](https://www.npmjs.com/package/next) Version: `14.2.3`
- 💀 Minimum [react query](https://www.npmjs.com/package/@tanstack/react-query) Version: `5.45.0`
- 💀 Minimum [@best-skn/react-types](https://www.npmjs.com/package/@best-skn/react-types) Version: `1.1.1`

&nbsp;

## **_Complementary Libraries:_**

- [@best-skn/react-types](https://www.npmjs.com/package/@best-skn/react-types)
- [@best-skn/next-types](https://www.npmjs.com/package/@best-skn/next-types)

&nbsp;

## **_Usage:_**

### To install the package, type the following in console

> ```zsh
> npm add @best-skn/next-query
> #or
> yarn add @best-skn/next-query
> #or
> pnpm add @best-skn/next-query
> #or
> bun add @best-skn/next-query
> ```

### Create a directory called `types` in the root location of your project, and create a file called `query.d.ts`, then do this

> ```typescript
> import "@best-skn/next-query/types";
> ```

### Check your `tsconfig.json` if `includes` property has `**/*.ts` or not otherwise the type definition file may not work

### Now Inside your Next.js 14 Project, use the package like this (Just an example)

#### **_Create `React Query` Context:_**

> ```typescript jsx
> // * Client side context example in Next.js
> // * Location: `app/layout.tsx`
> import { QueryClientProvider } from "@tanstack/react-query";
> import { getQueryClient } from "@best-skn/next-query";
>
> // * `React.SLC` type comes from another package `@best-skn/react-types`
> const RootLayout: React.SLC = (props) => {
>   const { children } = props;
>
>   const queryClient: QueryClient = getQueryClient();
>
>   return (
>     <html lang="en">
>       <body>
>         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
>       </body>
>     </html>
>   );
> };
>
> export default RootLayout;
> ```

#### **_Create `ReactQueryHydration` Component:_**

##### (1) Next.js Server Component for Query Hydration

> ```typescript jsx
> //* Create a reusable server component in somewhere like `./src/lib/query`
> import { dehydrate, HydrationBoundary, type QueryHydrationProps } from "@tanstack/react-query";
> import { getQueryClient } from "@best-skn/next-query";
>
> // * `React.SFC` type comes from another package `@best-skn/react-types`
> const ReactQueryHydration: React.SFC<QueryHydrationProps> = (props) => {
>   const { children, queryKey, queryFn } = props;
>
>   const queryClient = getQueryClient();
>
>   queryClient.prefetchQuery({
>     queryKey,
>     queryFn,
>   });
>
>   return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
> };
>
> export default ReactQueryHydration;
> ```

##### (2) Next.js Page

> ```typescript jsx
> //* Next.js `page.tsx`
> import ReactQueryHydration from "@/lib/query/ReactQueryHydration";
> import UserPageComponent from "./UserPageComponent"; // location where the component is
> import { getUserData } from "./getUserData";
>
> //* You don't need to use async/await here as `ReactQueryHydration` will handle all
> const Users: React.SFC<unknown> = () => {
>   return (
>     <ReactQueryHydration
>       props={{
>         queryKey: ["users"], // the query id
>         queryFn: getUserData, // the query function that fetches data
>       }}
>     >
>       <UserPageComponent />
>     </ReactQueryHydration>
>   );
> };
>
> export default Users;
> ```

##### (3) Child Component of the Next.js Page

> ```typescript jsx
> //* The child component
> "use client";
>
> const UserPageComponent: React.FC<unknown> = () => {
>   const { data } = useSuspenseQuery({
>     queryKey: ["users"],
>     queryFn: getUserData,
>   });
>
>   //* some codes here...
> };
>
> export default UserPageComponent;
> ```

&nbsp;

## **_Dedicated To:_**

- 👩‍🎨`Prodipta Das Logno` & 🧛‍♀️`Atoshi Sarker Prithula`: The two most special ladies of my life. I
  can't thank them
  enough for always treasuring me a lot. I am lucky that I met with these two amazing ladies. They
  have two special
  places in my heart and no other girl can ever replace them.
- 💯`My Parents`: The greatest treasures of my life ever.

&nbsp;

## **_License:_**

Copyright (C) 2024 SKN Shukhan

Licensed under the MIT License
