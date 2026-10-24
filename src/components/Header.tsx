"use client";

import { usePathname } from "next/navigation";

import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, about, work } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s" />
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/"
                      label={about.label}
                      selected={pathname === "/"}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon="person" href="/" selected={pathname === "/"} />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                // the line below was previously used as a separator between
                // the page toggles and the theme switcher. it made the
                // nav look like it had a stray vertical bar next to the
                // first item (about) when the switcher is enabled, so
                // remove it if you don't need the divider.
                <>
                  {/* <Line background="neutral-alpha-medium" vert maxHeight="24" /> */}
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center" />
      </Row>
    </>
  );
};
