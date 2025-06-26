import { Input } from "@/app/_components/Form";

import "./styles.scss"

export default function AdvancedSearchPage() {
  return (
    <div className="advanced-search-container">
      <div className="search-grid">
        {/* Column 1 */}
        <div className="search-column">
          <h3>Pacients</h3>
          <Input name="search1" placeholder="Search for a pacient..." />
          <Input name="search2" placeholder="Search for a pacient..." />
        </div>

        {/* Column 2 */}
        <div className="search-column">
          <h3>Pacients</h3>
          <Input name="search3" placeholder="Search for a pacient..." />
          <Input name="search4" placeholder="Search for a pacient..." />
        </div>

        {/* Column 3 */}
        <div className="search-column">
          <h3>Pacients</h3>
          <Input name="search5" placeholder="Search for a pacient..." />
          <Input name="search6" placeholder="Search for a pacient..." />
        </div>
      </div>

      {/* Results Table Header */}
      <div className="results-table-header">
        <div className="col-id">ID</div>
        <div className="col-date">Visit date</div>
        <div className="col-register">Register</div>
        <div className="col-actions">Actions</div>
      </div>

      {/* Search results would be rendered here */}
      <div className="results-list-placeholder">
        {/* e.g., <SearchResultItem /> */}
      </div>
    </div>
  );
}