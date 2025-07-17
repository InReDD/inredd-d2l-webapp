"use client";

import { useState } from 'react';
import { Input, Select } from "@/app/_components/Form";
import { searchVisits } from "@/services/visit";
import { Button, ButtonLink } from '@/app/_components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import "./styles.scss";

export default function AdvancedSearchPage() {
  const [criteria, setCriteria] = useState({
    patientName: '',
    visitDateStart: '',
    visitDateEnd: '',
    mainComplaintContains: '',
    hasCardiovascularIssue: '',
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await searchVisits(criteria);
      console.log(data)
      setResults(data);
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCriteria({
      patientName: '',
      visitDateStart: '',
      visitDateEnd: '',
      mainComplaintContains: '',
      hasCardiovascularIssue: '',
    });
    setResults(null);
    setError(null);
  };

  const booleanOptions = [
    { value: '', label: 'Any' },
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' }
  ];

  return (
    <div className="advanced-search-container">
      <form onSubmit={handleSearch} className="search-form-card">
        <div className="search-grid">
          <div className="search-column">
            <h3>Patient Details</h3>
            <Input name="patientName" placeholder="Patient Name..." value={criteria.patientName} onChange={handleInputChange} />
          </div>

          <div className="search-column">
            <h3>Visit Details</h3>
            <Input name="visitDateStart" label="From Date" type="date" value={criteria.visitDateStart} onChange={handleInputChange} />
            <Input name="visitDateEnd" label="To Date" type="date" value={criteria.visitDateEnd} onChange={handleInputChange} />
            <Input name="mainComplaintContains" label="Main Complaint Contains" placeholder="e.g., pain, cleaning..." value={criteria.mainComplaintContains} onChange={handleInputChange} />
          </div>

          <div className="search-column">
            <h3>Clinical Data</h3>
            <Select
              name="hasCardiovascularIssue"
              label="Has Cardiovascular Issues?"
              value={criteria.hasCardiovascularIssue}
              onChange={handleInputChange}
              options={booleanOptions}
            />
            <Select
              name="hasAllergies"
              label="Has Allergies?"
              value={criteria.hasAllergies}
              onChange={handleInputChange}
              options={booleanOptions}
            />
            <Select
              name="usesSubstances"
              label="Uses Substances (Drugs)?"
              value={criteria.usesSubstances}
              onChange={handleInputChange}
              options={booleanOptions}
            />
            <Select
              name="hadAnesthesiaReaction"
              label="Had Anesthesia Reaction?"
              value={criteria.hadAnesthesiaReaction}
              onChange={handleInputChange}
              options={booleanOptions}
            />
            <Select
              name="hasExcessiveBleeding"
              label="Has Excessive Bleeding?"
              value={criteria.hasExcessiveBleeding}
              onChange={handleInputChange}
              options={booleanOptions}
            />
          </div>

        </div>
        <div className="search-actions">
          <Button type="button" className="btn-secondary" size="medium" onClick={handleClear}>Clear</Button>
          <Button type="submit" className="btn-primary" size="medium" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form >

      {isLoading && <div className="loading-indicator">Loading Results...</div>
      }
      {error && <div className="error-message">{error}</div>}

      {
        results && (
          <div className="results-container">
            <AnalyticsDashboard stats={results.stats} />

            <h2>Search Results ({results.results.length})</h2>
            <div className="results-table">
              <div className="results-table-header">
                <div className="col-patient">Patient</div>
                <div className="col-date">Visit Date</div>
                <div className="col-register">Main Complaint</div>
                <div className="col-actions">Actions</div>
              </div>
              {results.results.length > 0 ? (
                results.results.map(visit => <SearchResultItem key={visit.id} visit={visit} />)
              ) : (
                <div className="no-results">No visits found matching your criteria.</div>
              )}
            </div>
          </div>
        )
      }
    </div >
  );
}

const AnalyticsDashboard = ({ stats }) => {
  const visitsBySexData = stats.visitsBySex ? Object.entries(stats.visitsBySex).map(([name, value]) => ({ name, visits: value })) : [];

  return (
    <div className="analytics-dashboard">
      <h2>Analytics</h2>
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Visits by Patient Sex</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visitsBySexData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const SearchResultItem = ({ visit }) => {
  return (
    <div className="result-row">
      <div className="col-patient">{visit.patientName || 'N/A'}</div>
      <div className="col-date">{new Date(visit.visitDate).toLocaleDateString()}</div>
      <div className="col-register">{visit.mainComplaint}</div>
      <div className="col-actions">
        <ButtonLink size="small" href={`/patient/${visit.patientId}/recordPage/${visit.id}`}>View Record</ButtonLink>
      </div>
    </div>
  );
}