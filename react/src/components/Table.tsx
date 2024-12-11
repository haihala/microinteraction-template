// ?raw is a vite trick for reading a file as a string
// File is a symlink to the one used for plain
import csv from "../assets/people-1000.csv?raw";

export function Table() {
  const rows = csv.split("\n").map((line) => {
    let cols = line.split(",");
    if (cols.length > 9) {
      // Title, last field, has a comma and is the only thing in quotes
      const quoted = line.match(/"(.*)"/)![1];
      cols = [...cols.slice(0, 8), quoted];
    }

    return (
      <tr>
        {cols.map((col) => (
          <td>{col}</td>
        ))}
      </tr>
    );
  });
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
            <th>Index</th>
            <th>User id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Sex</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of birth</th>
            <th>Job title</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}
