import { notFound } from "next/navigation";
import { generateMetadata } from "@/helpers";

export const metadata = generateMetadata({
  title: "404 - Page not found",
  description:
    "The page you are looking for may have been removed, have its name changed, or be temporarily unavailable",
});

export default function NotFoundDummy() {
  notFound();
}
