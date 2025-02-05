import React, { useEffect, useState } from "react";

export default function Test() {
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
    <div style={{ color: "red", fontSize: "100px", height: "100vh" }}>
      {data[page].map((item) => {
        return <div>{item.item}</div>;
      })}
      <button onClick={() => handlePageChange(page + 1)}>+</button>
      {page}
      <button onClick={() => handlePageChange(page - 1)}>-</button>
    </div>
  );
}
