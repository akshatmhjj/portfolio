"use client";

import React, { JSX } from "react";
import { Heading } from "@once-ui-system/core";

interface HeadingLinkProps extends React.ComponentProps<typeof Heading> {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({ id, level, children, ...props }) => {

  const variantMap = {
    1: "display-strong-xs",
    2: "heading-strong-xl",
    3: "heading-strong-l",
    4: "heading-strong-m",
    5: "heading-strong-s",
    6: "heading-strong-xs",
  } as const;

  const variant = variantMap[level];
  const asTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Heading id={id} variant={variant} as={asTag} {...props}>
      {children}
    </Heading>
  );
};
