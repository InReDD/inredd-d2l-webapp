// app/dashboard/page.jsx (or your DashboardHome file)
import "./style.scss";
import { generateMetadata as generate } from "@/helpers";
// Navbar and Paragraph2 are now handled by DashboardInteractiveHeader
// Image is also handled by DashboardInteractiveHeader
import SideBar from "./_components/SideBar"; // Adjust path if necessary

export async function generateMetadata() {
  return generate({
    title: "Dashboard Home",
    description: "Dental Second Look",
  });
}

export default async function DashboardHome() {
  return (
    <div id="dashboardhome" className="home">
      <SideBar />
    </div>
  );
}