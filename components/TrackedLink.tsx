"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type AnalyticsPayload, type PixelDojoEvent } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  eventName: PixelDojoEvent;
  eventPayload?: AnalyticsPayload;
};

export function TrackedLink({
  eventName,
  eventPayload,
  onClick,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        track(eventName, eventPayload);
        onClick?.(event);
      }}
    />
  );
}
