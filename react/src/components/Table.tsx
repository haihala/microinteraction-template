// ?raw is a vite trick for reading a file as a string
// File is a symlink to the one used for plain
import React, { useEffect, useState } from "react";
import rawData from "../assets/people-1000.csv?raw";
import { RowData, TableRow } from "./TableRow";

export function Table() {
  const [sortColumn, setSortColumn] = useState(0);
  const [sortAsc, setSortAsc] = useState(true);
  const [likes, setLikes] = useState<number[]>([]);
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

      const index = parseInt(cols[0]);

      const obj: RowData = {
        index,
        userId: cols[1],
        firstName: cols[2],
        lastName: cols[3],
        sex: cols[4],
        email: cols[5],
        phone: cols[6],
        birthDay: new Date(cols[7]),
        jobTitle: cols[8],
        liked: likes.includes(index),
      };

      return obj;
    })
    .sort((row1, row2) => {
      const keys = [
        "index",
        "userId",
        "firstName",
        "lastName",
        "sex",
        "email",
        "phone",
        "birthDay",
        "jobTitle",
        "liked",
      ] as const;
      const sortKey: keyof RowData = keys[sortColumn];

      const a = row1[sortKey];
      const b = row2[sortKey];

      if (a === b) {
        return 0;
      }

      const asc = a < b ? -1 : 1;
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
      <div>
        Sort by:
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
          <button
            onClick={() => sortBy(index)}
            key={text}
            style={{ margin: "0.5rem" }}
          >
            {text}
          </button>
        ))}
      </div>
      <div style={{ maxWidth: "100rem" }}>
        {rows.map((rowProps, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <TableRow
              {...rowProps}
              onLike={() =>
                setLikes(
                  likes.includes(rowProps.index)
                    ? likes.filter((id) => id !== rowProps.index)
                    : [...likes, rowProps.index],
                )
              }
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
