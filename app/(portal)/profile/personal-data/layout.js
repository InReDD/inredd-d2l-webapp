import { generateMetadata } from "@/helpers";

export const metadata = generateMetadata({
  title: "Personal data",
  description: "Edit your Personal data",
});

export default function Layout({ children }) {
  return children;
}
