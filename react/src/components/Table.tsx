import React, { useEffect, useMemo, useState } from "react";
// ?raw is a vite trick for reading a file as a string
// File is a symlink to the one used for plain
import rawData from "../assets/people-1000.csv?raw";
import { RowData, TableRow } from "./TableRow";
import { EditModal } from "./EditModal";

const sortKeys = [
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

export function Table() {
  const [sortKey, setSortColumn] = useState<keyof RowData>("index");
  const [sortAsc, setSortAsc] = useState(true);
  const [editing, setEditing] = useState<RowData>();
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    // This simulates loading times
    const timeout = setTimeout(() => {
      setRows(
        rawData
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
            let supervisor = null;
            // This is a chain.
            // 1000 is the highest level of the organization and has no supervisor
            // X00 are upper management, their supervisor is 1000, for example 500 -> 1000
            // YX0 are lower management, their supervisor is (Y+1)00, for example 30 -> 100
            // The rest are regular employees, their supervisor is the next lower manager, for example 32 -> 40
            if (index === 1000) {
              supervisor = null;
            } else if (index % 100 === 0) {
              supervisor = 1000;
            } else if (index % 10 === 0) {
              supervisor = index - (index % 100) + 100;
            } else {
              supervisor = index - (index % 10) + 10;
            }

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
              liked: false,
              supervisor,
            };

            return obj;
          }),
      );
      // Time in milliseconds
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const sortedRows = useMemo(() => {
    return rows.sort((row1, row2) => {
      const a = row1[sortKey];
      const b = row2[sortKey];

      if (a === b) {
        return 0;
      }

      const asc = a < b ? -1 : 1;

      if (sortAsc) {
        return asc;
      } else {
        return -asc;
      }
    });
  }, [sortKey, sortAsc, rows]);

  function sortBy(col: keyof RowData) {
    if (sortKey === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(col);
      setSortAsc(true);
    }
  }

  function openEdit(index: number) {
    setEditing(rows.find((row) => row.index === index));
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
            onClick={() => sortBy(sortKeys[index])}
            key={text}
            style={{ margin: "0.5rem" }}
          >
            {text}
          </button>
        ))}
      </div>
      <div style={{ maxWidth: "80rem" }}>
        {sortedRows.map((rowProps) => (
          <React.Fragment key={rowProps.index}>
            <TableRow
              {...rowProps}
              onLike={() =>
                setRows(
                  rows.map((row) => {
                    return row.index === rowProps.index
                      ? { ...row, liked: !row.liked }
                      : row;
                  }),
                )
              }
              onEdit={() => openEdit(rowProps.index)}
              employees={rows}
            />
          </React.Fragment>
        ))}
      </div>
      <EditModal
        user={editing}
        onClose={() => setEditing(undefined)}
        onSave={(newRow) => {
          setRows(
            rows.map((row) => {
              return row.index === newRow.index ? newRow : row;
            }),
          );
          setEditing(undefined);
        }}
      />
    </>
  );
}
