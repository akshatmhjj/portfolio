"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Flex } from "@once-ui-system/core";
import { RouteGuard } from "@/components/RouteGuard";
import { routes } from "@/resources";

/**
 * Decides which chrome wraps a page.
 *  - "/" and "/work/*" → the full-bleed "Request" UI renders on its own (it brings its own header/footer).
 *  - everything else   → the classic layout (background, header, padded content, footer).
 * A route switched off in `routes` falls through to the classic layout so RouteGuard can show the 404.
 */
export function Shell({
  background,
  header,
  footer,
  children,
}: {
  background: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const requestUi =
    (pathname === "/" && routes["/"]) || (pathname.startsWith("/work") && routes["/work"]);

  if (requestUi) return <>{children}</>;

  return (
    <>
      {background}
      <Flex fillWidth minHeight="16" s={{ hide: true }} />
      {header}
      <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
        <Flex horizontal="center" fillWidth minHeight="0">
          <RouteGuard>{children}</RouteGuard>
        </Flex>
      </Flex>
      {footer}
    </>
  );
}
