async function getTable() {
  if (!window.tableData) {
    const response = await fetch("/data/people-1000.csv");
    const txt = await response.text();

    const rows = [];

    txt
      .split("\n")
      .filter((line) => line.length > 0)
      .forEach((line) => {
        let cols = line.split(",");
        if (cols.length > 9) {
          // Title, last field, has a comma and is the only thing in quotes
          cols = [...cols.slice(0, 8), line.match(/"(.*)"/)[1]];
        }

        // Likes
        cols.push(false);

        rows.push(cols);
      });

    window.tableData = rows;
  }

  return Promise.resolve(window.tableData);
}

async function toggleLike(index) {
  window.tableData[index][9] = !window.tableData[index][9];
  await renderTable();
}

async function renderTable() {
  const table = document.querySelector("tbody");
  table.innerText = "";

  for (const dataRow of await getTable()) {
    const tableRow = table.insertRow();
    dataRow.forEach((datapoint, index) => {
      const cell = tableRow.insertCell(index);

      const likesColumn = typeof datapoint === "boolean";
      if (likesColumn) {
        cell.innerHTML = datapoint ? "♥️" : "♡";
        cell.onclick = () => toggleLike(dataRow[0] - 1);
      } else {
        cell.innerHTML = datapoint;
      }
    });
  }
}

async function sortTable(column) {
  const ascending =
    window.tableSort?.column === column ? !window.tableSort.ascending : true;

  const table = await getTable();

  table.sort((row1, row2) => {
    let a = row1[column];
    let b = row2[column];

    if (a === b) return 0;

    const mappings = {
      0: parseFloat,
      9: (liked) => !liked,
    };

    const mapping = mappings[column];
    if (mapping) {
      a = mapping(a);
      b = mapping(b);
    }

    const ord = a < b ? -1 : 1;

    if (ascending) {
      return ord;
    } else {
      return -ord;
    }
  });

  window.tableData = table;
  window.tableSort = {
    column,
    ascending,
  };

  await renderTable();
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
  "Liked",
];

headings.forEach((text, index) => {
  const cell = headRow.insertCell(index);
  cell.outerHTML = `<th onclick="sortTable(${index})">${text}</th>`;
});

const table = document.querySelector("table");
table.appendChild(thead);
table.appendChild(document.createElement("tbody"));
renderTable();
