import React, { useEffect, useState } from "react";
import {
  CountrySelect,
  CitySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
export default function Test() {
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [page, setPage] = useState(1);

  const data = {
    1: [
      {
        item: 1,
      },
      {
        item: 2,
      },
    ],
    2: [
      {
        item: 3,
      },
      {
        item: 4,
      },
    ],
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= 2) {
      setPage(newPage);
    }
  };
  useEffect(() => {
    console.log("running use effect");
  }, [page]);

  return (
    <>
      <div
        style={{
          color: "red",
          fontSize: "100px",
          height: "70vh",
        }}
      >
        {data[page].map((item) => {
          return <div>{item.item}</div>;
        })}
        <button onClick={() => handlePageChange(page + 1)}>+</button>
        {page}
        <button onClick={() => handlePageChange(page - 1)}>-</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10vh",
        }}
      ></div>
    </>
  );
}
