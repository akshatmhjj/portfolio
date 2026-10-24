"use client";

import { Button, Column, Flex, Heading, Media, Row, Tag, Text } from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  featured?: boolean;
  year: number;
  title: string;
  content: string;
  description: string;
  image?: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  link: string;
  source: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority,
  featured,
  year,
  title,
  content,
  description,
  image,
  stack,
  metrics,
  link,
  source,
}) => {
  const cover = image && (
    <Media
      priority={priority}
      aspectRatio="16 / 10"
      alt={`${title} screenshot`}
      src={image}
      sizes={featured ? "(max-width: 960px) 100vw, 640px" : "(max-width: 960px) 100vw, 420px"}
    />
  );

  const body = (
    <Column gap="16" padding={featured ? "32" : "24"} flex={1}>
      <Text variant="label-default-s" onBackground="brand-weak">
        Project · {year}
      </Text>
      <Heading as="h2" wrap="balance" variant={featured ? "display-strong-m" : "display-strong-s"}>
        {title}
      </Heading>
      {description?.trim() && (
        <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
          {description}
        </Text>
      )}
      {metrics.length > 0 && (
        <Row gap="24" wrap paddingTop="4">
          {metrics.map((metric) => (
            <Column key={metric.label} gap="4">
              <Text variant="heading-strong-m">{metric.value}</Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {metric.label}
              </Text>
            </Column>
          ))}
        </Row>
      )}
      {stack.length > 0 && (
        <Row gap="8" wrap>
          {stack.map((tech) => (
            <Tag key={tech} size="s">
              {tech}
            </Tag>
          ))}
        </Row>
      )}
      <Row gap="8" wrap paddingTop="8">
        {link && (
          <Button
            href={link}
            target="_blank"
            label="Live site"
            prefixIcon="globe"
            size="s"
            variant="primary"
          />
        )}
        {source && (
          <Button
            href={source}
            target="_blank"
            label="Source"
            prefixIcon="github"
            size="s"
            variant="secondary"
          />
        )}
        {content?.trim() && (
          <Button href={href} label="Case study" suffixIcon="arrowRight" size="s" variant="secondary" />
        )}
      </Row>
    </Column>
  );

  if (featured) {
    return (
      <Flex
        fillWidth
        s={{ direction: "column" }}
        radius="l"
        border="neutral-alpha-weak"
        background="surface"
        style={{ overflow: "hidden" }}
      >
        <Flex flex={11} fillWidth vertical="center" style={{ minWidth: 0 }}>
          {cover}
        </Flex>
        <Flex flex={9} fillWidth style={{ minWidth: 0 }}>
          {body}
        </Flex>
      </Flex>
    );
  }

  return (
    <Column
      fillWidth
      radius="l"
      border="neutral-alpha-weak"
      background="surface"
      style={{ overflow: "hidden" }}
    >
      {cover}
      {body}
    </Column>
  );
};
