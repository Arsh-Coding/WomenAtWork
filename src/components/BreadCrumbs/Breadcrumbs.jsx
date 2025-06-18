import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css"; // Add styles if needed

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x)
    .map((value) => decodeURIComponent(value));

  return (
    <nav className="breadcrumbs">
      <div className="breadcrumb-container">
        <Link to="/">Home</Link> {/* Always show Home link */}
        {pathnames.map((value, index) => {
          const pathTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const formattedValue = value.replace(/\b\w/g, (char) =>
            char.toUpperCase()
          );
          return isLast ? (
            <span key={pathTo} className="breadcrumb-item">
              {" / "}
              {formattedValue}
            </span>
          ) : (
            <Link key={pathTo} to={pathTo} className="breadcrumb-link">
              {" / "}
              {formattedValue}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
