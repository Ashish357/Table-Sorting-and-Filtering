import React, { useState, useMemo } from "react";
import "./styles.css";

// Separate component for table rows
const TableRow = ({ row, headers }) => (
  <tr key={row.ID}>
    {headers.map((header) => (
      <td key={header.id}>{row[header.KEY]}</td>
    ))}
  </tr>
);

export function App(props) {
  const [sort, setSort] = useState({ keyToSort: "MAKE", direction: "asc" });
  const [filter, setFilter] = useState("");

  const headers = [
    {
      id: 1,
      KEY: "MAKE",
      LABEL: "Make",
    },
    {
      id: 2,
      KEY: "MODEL",
      LABEL: "Model",
    },
    {
      id: 3,
      KEY: "YEAR",
      LABEL: "Year",
    },
    {
      id: 4,
      KEY: "HORSEPOWER",
      LABEL: "HorsePower",
    },
    {
      id: 5,
      KEY: "COLOR",
      LABEL: "Color",
    },
  ];
  const data = [
    {
      ID: 1,
      MAKE: "Honda",
      MODEL: "Civic",
      YEAR: 1998,
      HORSEPOWER: 195,
      COLOR: "Yellow",
    },
    {
      ID: 2,
      MAKE: "Toyota",
      MODEL: "Corolla",
      YEAR: 2012,
      HORSEPOWER: 140,
      COLOR: "Blue",
    },
    {
      ID: 3,
      MAKE: "Ford",
      MODEL: "Mustang",
      YEAR: 2018,
      HORSEPOWER: 310,
      COLOR: "Red",
    },
    {
      ID: 4,
      MAKE: "Chevrolet",
      MODEL: "Camaro",
      YEAR: 2015,
      HORSEPOWER: 400,
      COLOR: "Black",
    },
    {
      ID: 5,
      MAKE: "Volkswagen",
      MODEL: "Golf",
      YEAR: 2010,
      HORSEPOWER: 120,
      COLOR: "Silver",
    },
    {
      ID: 6,
      MAKE: "Subaru",
      MODEL: "Impreza",
      YEAR: 2019,
      HORSEPOWER: 152,
      COLOR: "Gray",
    },
    {
      ID: 7,
      MAKE: "Nissan",
      MODEL: "Altima",
      YEAR: 2016,
      HORSEPOWER: 182,
      COLOR: "White",
    },
    {
      ID: 8,
      MAKE: "BMW",
      MODEL: "3 Series",
      YEAR: 2014,
      HORSEPOWER: 240,
      COLOR: "Black",
    },
    {
      ID: 9,
      MAKE: "Mercedes-Benz",
      MODEL: "C-Class",
      YEAR: 2009,
      HORSEPOWER: 200,
      COLOR: "Silver",
    },
    {
      ID: 10,
      MAKE: "Audi",
      MODEL: "A4",
      YEAR: 2017,
      HORSEPOWER: 190,
      COLOR: "Blue",
    },
    {
      ID: 11,
      MAKE: "Lexus",
      MODEL: "RX",
      YEAR: 2022,
      HORSEPOWER: 300,
      COLOR: "White",
    },
  ];

  const handleHeaderClick = (header) => {
    setSort({
      keyToSort: header.KEY,
      direction:
        header.KEY === sort.keyToSort
          ? sort.direction === "asc"
            ? "desc"
            : "asc"
          : "desc",
    });
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      row.MAKE.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  const sortedData = useMemo(() => {
    return getSortedArray(filteredData);
  }, [filteredData]);

  function getSortedArray(arrayToSort) {
    if (sort.direction === "asc") {
      return arrayToSort.sort((a, b) =>
        a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1
      );
    }
    return arrayToSort.sort((a, b) =>
      a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1
    );
  }

  return (
    <>
      <h1>Cars Collection</h1>
      <label htmlFor="filterInput">Filter by any column:</label>
      <input
        id="filterInput"
        type="text"
        placeholder="Enter a car name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.id} onClick={() => handleHeaderClick(header)} aria-label={`Sort by ${header.LABEL}`}>
                {header.LABEL}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <TableRow key={row.ID} row={row} headers={headers} />
          ))}
        </tbody>
      </table>
    </>
  );
}
