"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Flex } from "@once-ui-system/core";
import { RouteGuard } from "@/components/RouteGuard";

/**
 * Decides which chrome wraps a page.
 *  - "/"  → the full-bleed "Request" UI renders on its own (no Once UI header/footer/background).
 *  - else → the classic layout (background, header, padded content, footer) used by /work pages.
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
  const pathname = usePathname();

  if (pathname === "/") return <>{children}</>;

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
