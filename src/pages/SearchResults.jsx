import React, { useState, useEffect, useRef } from 'react';

const mockData = [
  { id: 1, type: 'course', title: 'React for Beginners' },
  { id: 2, type: 'course', title: 'Advanced JavaScript' },
  { id: 3, type: 'teacher', title: 'John Doe - React Mentor' },
  { id: 4, type: 'blog', title: 'How to Crack Frontend Interviews' },
  { id: 5, type: 'teacher', title: 'Jane Smith - JavaScript Coach' },
  { id: 6, type: 'blog', title: 'Why Learn React in 2025' },
];

const groupByCategory = (items) => {
  return items.reduce((acc, item) => {
    const category = item.type;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});
};

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGrouped, setFilteredGrouped] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredGrouped({});
      return;
    }

    const matched = mockData.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredGrouped(groupByCategory(matched));
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-box col" ref={inputRef}>
      <div className="position-relative">
        {/* 🔍 Search Icon */}
        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"></i>

        {/* Search Input */}
        <input
          type="text"
          className="form-control ps-5"
          placeholder="Search courses, instructors, articles..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {showDropdown && searchTerm.trim() && (
        <div className="dropdown-menu show w-100 mt-1 shadow" style={{ maxHeight: '300px', overflowY: 'auto', maxWidth: '94%' }}>
          {Object.keys(filteredGrouped).length === 0 ? (
            <div className="dropdown-item text-muted">No results found</div>
          ) : (
            Object.entries(filteredGrouped).map(([category, items]) => (
              <div key={category}>
                <div className="dropdown-header text-uppercase fw-bold">{category}</div>
                {items.map(item => (
                  <div
                    key={item.id}
                    className="dropdown-item"
                    onClick={() => {
                      setShowDropdown(false);
                      console.log('Selected item:', item);
                    }}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
