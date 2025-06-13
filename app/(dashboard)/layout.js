import SideBar from "./_components/SideBar";

export default function PortalLayout({ children }) {
  return (
      <div id="D2L-dashboard">
        <SideBar />
        {children}
      </div>
  );
}
