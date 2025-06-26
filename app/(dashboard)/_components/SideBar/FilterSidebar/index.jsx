// app/(dashboard)/_components/FiltersSidebar.jsx

import { Input } from "@/app/_components/Form";
import Dropdown from "@/app/_components/Dropdown";
import Image from "next/image";

export default function FiltersSidebar() {
  return (
    <div id="advanced-search-sidebar">
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
        <div className="filter-item">
        </div>
      </div>
    </div>
  );
}