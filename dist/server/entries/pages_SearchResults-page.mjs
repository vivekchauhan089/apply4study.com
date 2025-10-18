import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
const mockData = [
  { id: 1, type: "course", title: "React for Beginners" },
  { id: 2, type: "course", title: "Advanced JavaScript" },
  { id: 3, type: "teacher", title: "John Doe - React Mentor" },
  { id: 4, type: "blog", title: "How to Crack Frontend Interviews" },
  { id: 5, type: "teacher", title: "Jane Smith - JavaScript Coach" },
  { id: 6, type: "blog", title: "Why Learn React in 2025" }
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
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGrouped, setFilteredGrouped] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredGrouped({});
      return;
    }
    const matched = mockData.filter(
      (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGrouped(groupByCategory(matched));
  }, [searchTerm]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "search-box col", ref: inputRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "position-relative", children: [
      /* @__PURE__ */ jsx("i", { className: "bi bi-search position-absolute top-50 start-0 translate-middle-y ps-2 text-muted" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "form-control",
          style: { padding: ".250rem .75rem 0.1rem 2rem" },
          placeholder: isMobile ? "Search Universities Courses & More..." : "Search...",
          value: searchTerm,
          onChange: (e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          },
          onFocus: () => setShowDropdown(true)
        }
      )
    ] }),
    showDropdown && searchTerm.trim() && /* @__PURE__ */ jsx("div", { className: "dropdown-menu show w-100 mt-1 shadow", style: { maxHeight: "300px", overflowY: "auto", maxWidth: "94%" }, children: Object.keys(filteredGrouped).length === 0 ? /* @__PURE__ */ jsx("div", { className: "dropdown-item text-muted", children: "No results found" }) : Object.entries(filteredGrouped).map(([category, items]) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dropdown-header text-uppercase fw-bold", children: category }),
      items.map((item) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "dropdown-item",
          onClick: () => {
            setShowDropdown(false);
            console.log("Selected item:", item);
          },
          children: item.title
        },
        item.id
      ))
    ] }, category)) })
  ] });
};
const documentProps = {
  title: "SearchResults | Apply4Study",
  description: "SearchResults page"
};
function Page() {
  return /* @__PURE__ */ jsx(SearchResults, {});
}
export {
  Page,
  documentProps
};
