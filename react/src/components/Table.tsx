// ?raw is a vite trick for reading a file as a string
// File is a symlink to the one used for plain
import { useEffect, useState } from "react";
import rawData from "../assets/people-1000.csv?raw";

export function Table() {
  const [sortColumn, setSortColumn] = useState(0);
  const [sortAsc, setSortAsc] = useState(true);
  const [likes, setLikes] = useState<string[]>([]);
  const [csv, setCSV] = useState("");

  useEffect(() => {
    // This simulates loading times
    const timeout = setTimeout(() => {
      setCSV(rawData);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

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

      cols.push(likes.includes(cols[0]) ? "♥️" : "♡");

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
      // The hearts sort the wrong way.
      // In a real app you would have a data model that isn't just strings
      const ascSort = sortColumn === 9 ? !sortAsc : sortAsc;

      if (ascSort) {
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
              "Liked",
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
              {cols.slice(0, -1).map((col, colIndex) => (
                <td key={`td-${rowIndex}-${colIndex}`}>{col}</td>
              ))}

              <td
                onClick={() => {
                  const index = cols[0];
                  if (likes.includes(index)) {
                    setLikes([...likes.filter((id) => id !== index)]);
                  } else {
                    setLikes([...likes, index]);
                  }
                }}
              >
                {cols[9]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
