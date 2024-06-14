import type { Children } from "react";
import type { FetchQueryOptions } from "@tanstack/react-query";

/**
 * SKN React Query Type Extension & Client Library
 *
 * @author SKN Shukhan
 * @version 1.0.2
 * @since 2024-06-14
 * */
declare module "@tanstack/react-query" {
  /**
   * The interface of props for React Server Component as data hydrator from server to client in Next.js
   *
   * Inside the client component where the data will be re-fetched again, use `useSuspenseQuery` instead of `useQuery`
   *
   * Example:
   *
   * ```typescript jsx
   * //* Create a reusable server component in somewhere like `./src/lib/query`
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
   * ```
   *
   * ```typescript jsx
   * //* Next.js `page.tsx`
   * import ReactQueryHydration from "@/lib/query/ReactQueryHydration";
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
   * @since v1.0.0
   * */
  interface QueryHydrationProps extends Children {
    queryKey: FetchQueryOptions["queryKey"];
    queryFn: FetchQueryOptions["queryFn"];
  }
}
