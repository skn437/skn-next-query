import "server-only";

import { dehydrate, HydrationBoundary, type QueryHydrationProps } from "@tanstack/react-query";
import { getQueryClient } from "..";
import React from "react";

/**
 * React server component in Next.js that hydrates data on client from server
 *
 * Inside the client component which will be the child of `ReactQueryHydration`, use `useSuspenseQuery` instead of `useQuery`
 * This server component is only meant to be used in server side
 *
 * Enables `Next.js Streaming in Server Component` i.e. it is perfect for `loading.tsx` file
 *
 * Example:
 *
 * ```typescript jsx
 * //* Next.js `page.tsx`
 * import { ReactQueryHydration } from "@best-skn/next-query/server";
 * import UserPageComponent from "./UserPageComponent"; // location where the component is
 * import { getUserData } from "./getUserData";
 *
 * //* You don't need to use async/await here as `ReactQueryHydration` will handle all
 * const Users: React.SFC<unknown> = () => {
 *   return (
 *     <ReactQueryHydration
 *       props={{
 *         queryKey: ["users"], // the query id
 *         queryFn: getUserData, // the query function that fetches data
 *       }}
 *      >
 *       <UserPageComponent/>
 *     </ReactQueryHydration>
 *   );
 * };
 *
 * export default Users;
 * ```
 *
 * ```typescript jsx
 *  //* The child component
 * "use client"
 *
 * const UserPageComponent: React.FC<unknown> = () => {
 *   const { data } = useSuspenseQuery({
 *     queryKey: ["users"],
 *     queryFn: getUserData,
 *   });
 *
 *   //* some codes here...
 * };
 *
 * export default UserPageComponent;
 * ```
 *
 * @param props An interface that has `children`, `queryKey` & `queryFn` properties
 * @return React.JSX.Element | React.ReactNode
 * @since v1.1.0
 * */
const ReactQueryHydration: React.SFC<QueryHydrationProps> = (props) => {
  const { children, queryKey, queryFn } = props;

  const queryClient = getQueryClient();

  //* No need to use await here as the `getQueryClient` handles configuration to handle that
  queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default ReactQueryHydration;
