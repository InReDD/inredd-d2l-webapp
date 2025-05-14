import { generateMetadata } from "@/helpers";

export const metadata = generateMetadata({
  title: "Collaborators",
  description: "List all Collaborators",
});

export default function Layout({ children }) {
  return children;
}
