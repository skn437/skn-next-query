import { isServer, QueryClient, defaultShouldDehydrateQuery } from "@tanstack/react-query";

/**
 * The main configuration for React Query Client
 *
 * @return QueryClient React query client object
 * @since v1.0.0
 * */
const makeQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid re-fetching immediately on the client
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // per default, only successful Queries are included,
        // this includes pending Queries as well
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
};

/**
 * Browser query client configuration for `getQueryClient` function
 *
 * @since v1.0.0
 * */
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Creates a query client with proper server & client configurations
 *
 * It has all the configurations to handle Next.js streaming in `loading.tsx`
 *
 * Example:
 *
 * ```typescript jsx
 * // * Client side context example in Next.js
 * // * Location: `app/layout.tsx`
 * import { QueryClientProvider } from "@tanstack/react-query";
 * import { getQueryClient } from "@best-skn/next-query";
 *
 * // * `React.SLC` type comes from another package `@best-skn/react-types`
 * const RootLayout: React.SLC = (props) => {
 *   const { children } = props;
 *
 *   const queryClient: QueryClient = getQueryClient();
 *
 *   return (
 *     <html lang="en">
 *       <body>
 *         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
 *       </body>
 *     </html>
 *   );
 * };
 *
 * export default RootLayout;
 * ```
 *
 *```typescript jsx
 * // * react server component example in Next.js
 * import { dehydrate, HydrationBoundary, type QueryHydrationProps } from "@tanstack/react-query";
 * import { getQueryClient } from "@best-skn/next-query";
 *
 * const ReactQueryHydration: React.SFC<QueryHydrationProps> = (props) => {
 *   const { children, queryKey, queryFn } = props;
 *
 *   const queryClient = getQueryClient();
 *
 *   queryClient.prefetchQuery({
 *     queryKey,
 *     queryFn,
 *   });
 *
 *   return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
 * };
 *
 * export default ReactQueryHydration;
 *```
 *
 * @return QueryClient React query client object
 * @since v1.0.0
 * */
export const getQueryClient = (): QueryClient => {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
