import { generateMetadata } from "@/helpers";

export const metadata = generateMetadata({
  title: "Groups",
  description: "List all Groups",
});

export default function Layout({ children }) {
  return children;
}
