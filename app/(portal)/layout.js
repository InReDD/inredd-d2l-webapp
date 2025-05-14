import { Footer, Header } from "../_template";

export default function PortalLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
