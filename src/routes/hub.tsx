import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/hub")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
