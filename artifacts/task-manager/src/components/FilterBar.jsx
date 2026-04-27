const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

function FilterBar({ currentFilter, onChange, counts }) {
  return (
    <div className="filter-bar">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`filter-bar__button ${
            currentFilter === filter.value ? "filter-bar__button--active" : ""
          }`}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}{" "}
          <span className="filter-bar__count">({counts[filter.value]})</span>
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
