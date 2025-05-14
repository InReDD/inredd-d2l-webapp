import { generateMetadata } from "@/helpers";

export const metadata = generateMetadata({
  title: "Access Requests",
  description: "List all Access Requests",
});

export default function Layout({ children }) {
  return children;
}
