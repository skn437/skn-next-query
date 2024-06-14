"use client";

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { QueryClientProvider } from "@tanstack/react-query";
import React, { type ChildrenProps } from "react";
import { getQueryClient } from "..";

/**
 * React query client provider as React Client Component in Next.js
 *
 * This component is meant to use in Next.js `app/layout.tsx` component
 *
 * Example:
 *
 * ```typescript jsx
 * //* Location: app/layout.tsx
 * import { ReactQueryClientProvider } from "@best-skn/next-query/contexts";
 *
 * //* `React.SLC` type is from another package: `@best-skn/react-types`
 * const RootLayout: React.SLC = async (props) => {
 *   const { children } = props;
 *
 *   return (
 *     <html lang="en">
 *       <body>
 *         <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
 *       </body>
 *     </html>
 *   );
 * };
 *
 * export default RootLayout;
 * ```
 *
 * @param props An interface that has `children` property of type `React.JSX.Element | React.ReactNode`
 * @return React.JSX.Element | React.ReactNode
 * @since v1.1.0
 * */
const ReactQueryClientProvider: React.FC<ChildrenProps> = (props) => {
  const { children } = props;

  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryClientProvider;
