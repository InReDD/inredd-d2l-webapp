import { generateMetadata } from "@/helpers";

export const metadata = generateMetadata({
  title: "Papers",
  description: "List all Papers",
});

export default function Layout({ children }) {
  return children;
}
