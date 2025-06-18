// app/(dashboard)/_components/FiltersSidebar.jsx

import { Input } from "@/app/_components/Form";
import Dropdown from "@/app/_components/Dropdown";
import Image from "next/image";

export default function FiltersSidebar() {
  return (
    <aside id="D2L-sidebar">
      <div className="sidebar-content">
        <div className="filters-section">
          <div className="filters-header">
            <h2>Filters</h2>
            <a href="#">add new +</a>
          </div>
          <Input placeholder="Search for a pacient..." />
          <div className="pagination-controls">
            <span>1-10 of 200</span>
            <div className="page-selector">
              <span>Page:</span>
              <Dropdown />
            </div>
          </div>
          <div className="filter-items">
            {/* Placeholder for filter items */}
            <div className="filter-item">
              <Image src="/icons/placeholder-icon.png" width={40} height={40} alt="filter" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}