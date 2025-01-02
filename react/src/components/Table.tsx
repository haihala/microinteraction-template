// ?raw is a vite trick for reading a file as a string
// File is a symlink to the one used for plain
import { useState } from "react";
import csv from "../assets/people-1000.csv?raw";

export function Table() {
  const [sortColumn, setSortColumn] = useState(0);
  const [sortAsc, setSortAsc] = useState(true);

  const rows = csv
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      let cols = line.split(",");
      if (cols.length > 9) {
        // Title, last field, has a comma and is the only thing in quotes
        const quoted = line.match(/"(.*)"/)![1];
        cols = [...cols.slice(0, 8), quoted];
      }

      return cols;
    })
    .sort((row1, row2) => {
      const a = row1[sortColumn];
      const b = row2[sortColumn];

      if (a === b) {
        return 0;
      }

      const lt = sortColumn === 0 ? parseInt(a) < parseInt(b) : a < b;
      const asc = lt ? -1 : 1;

      if (sortAsc) {
        return asc;
      } else {
        return -asc;
      }
    });

  function sortBy(col: number) {
    if (sortColumn === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(col);
      setSortAsc(true);
    }
  }

  return (
    <>
      <h2>Table of people</h2>
      <p>
        Dataset from{" "}
        <a href="https://github.com/datablist/sample-csv-files?tab=readme-ov-file">
          here (people-1000)
        </a>
      </p>
      <table>
        <thead>
          <tr>
            {[
              "Index",
              "User id",
              "First name",
              "Last name",
              "Sex",
              "Email",
              "Phone",
              "Date of birth",
              "Job title",
            ].map((text, index) => (
              <th onClick={() => sortBy(index)} key={"th-" + index}>
                {text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cols, rowIndex) => (
            <tr key={`tr-${rowIndex}`}>
              {cols.map((col, colIndex) => (
                <td key={`td-${rowIndex}-${colIndex}`}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
