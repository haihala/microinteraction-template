function sortTable(index) {
  const element = document.querySelector("tbody");
  element.innerHTML = "";

  const ascending =
    window.tableSort?.column === index ? !window.tableSort.ascending : true;

  populateTable(element, index, ascending);
}

async function getTable() {
  if (!window.tableData) {
    const response = await fetch("/data/people-1000.csv");
    const txt = await response.text();

    const rows = [];

    txt.split("\n").forEach((line) => {
      let cols = line.split(",");
      if (cols.length > 9) {
        // Title, last field, has a comma and is the only thing in
        // quotes
        cols = [...cols.slice(0, 8), line.match(/"(.*)"/)[1]];
      }

      rows.push(cols);
    });

    window.tableData = rows;
  }
  return Promise.resolve(window.tableData);
}

function populateTable(bod, sortIndex, ascending) {
  getTable().then((rows) => {
    rows.sort((row1, row2) => {
      let a = row1[sortIndex];
      let b = row2[sortIndex];

      const mappings = {
        0: parseFloat,
      };

      const mapping = mappings[sortIndex];
      if (mapping) {
        a = mapping(a);
        b = mapping(b);
      }

      if (ascending) {
        return a > b;
      } else {
        return a < b;
      }
    });

    window.tableSort = {
      column: sortIndex,
      ascending,
    };

    for (const dataRow of rows) {
      const tableRow = bod.insertRow();
      dataRow.forEach((datapoint, index) => {
        const cell = tableRow.insertCell(index);
        cell.innerHTML = datapoint;
      });
    }
  });
}

const thead = document.createElement("thead");
const headRow = thead.insertRow();

const headings = [
  "Index",
  "User id",
  "First name",
  "Last name",
  "Sex",
  "Email",
  "Phone",
  "Date of birth",
  "Job title",
];

headings.forEach((text, index) => {
  const cell = headRow.insertCell(index);
  cell.outerHTML = `<th onclick="sortTable(${index})">${text}</th>`;
});

const table = document.querySelector("table");
table.appendChild(thead);
const tbody = document.createElement("tbody");
populateTable(tbody, 0, true);
table.appendChild(tbody);
