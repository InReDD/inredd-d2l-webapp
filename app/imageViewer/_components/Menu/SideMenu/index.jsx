import DentalChart from "../dentalChart";
import ModelsMenu from "../ModelsMenu";
import FindingsMenu from "../FindingsMenu";
import AnnotationsMenu from "../AnnotationsMenu";
import ExportMenu from "../ExportMenu";

const SideMenu = () => {
  return (
     <aside className="viewer-sidebar-details">
      <div className="sidebar-title-search">
        <span>Patient's dentition</span>
        <span className="search-icon">🔍</span>
      </div>

      <input type="text" placeholder="Search..." className="sidebar-search-input" />

      <div className="dental-chart-container">
        <DentalChart />
      </div>

      <nav className="sidebar-menu">
        <ul>
          <ModelsMenu />
          <FindingsMenu />
          <AnnotationsMenu />
          <ExportMenu />
        </ul>
      </nav>
    </aside>
  );
};


export default SideMenu;