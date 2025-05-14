import { generateMetadata } from "@/helpers";

export const metadata = generateMetadata({
  title: "Users",
  description: "List all Users",
});

export default function Layout({ children }) {
  return children;
}
