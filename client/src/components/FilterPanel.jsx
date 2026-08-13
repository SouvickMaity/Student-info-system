import React from 'react';

const FilterPanel = ({ search, setSearch, department, setDepartment, semester, setSemester, onFilter }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter();
  };

  return (
    <form className="filter-panel" onSubmit={handleSubmit}>
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search by name, ID or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filter-group">
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="IT">IT</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
        </select>
      </div>
      
      <div className="filter-group">
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="All">All Semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
            <option key={sem} value={sem}>Semester {sem}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default FilterPanel;
