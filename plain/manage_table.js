async function fetchTable(resolve) {
  const response = await fetch("/people-1000.csv");
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
      cols[0] = parseInt(cols[0]); // Index
      cols[7] = new Date(cols[7]); // Date of birth day

      // Likes
      cols.push(false);

      rows.push(cols);
    });

  window.tableData = rows;

  resolve(window.tableData);
}

async function getTable() {
  if (window.tableData) {
    return Promise.resolve(window.tableData);
  } else {
    // This simulates loading time
    return new Promise((resolve) => {
      setTimeout(() => fetchTable(resolve), 2000);
    });
  }
}

function toggleLike(index) {
  const button = document.querySelector(`#like-button-${index}`);
  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
  } else {
    button.classList.add("liked");
  }

  const row = window.tableData.find((item) => {
    return item[0] === index;
  });
  row[9] = !row[9];
}

function tableRow(dataRow) {
  const [
    index,
    userId,
    firstName,
    lastName,
    sex,
    email,
    phone,
    birthDay,
    jobTitle,
  ] = dataRow;

  const details = document.createElement("details");
  details.id = `table-row-${index}`;

  const summary = document.createElement("summary");
  summary.innerHTML = `${lastName}, ${firstName}`;
  details.appendChild(summary);

  const content = document.createElement("div");
  content.classList.add("table-row-content");
  const headers = document.createElement("div");
  headers.classList.add("table-row-headers");
  const values = document.createElement("div");
  values.classList.add("table-row-values");
  for (const [title, value] of [
    ["User id", userId],
    ["Job title", jobTitle],
    ["Sex", sex],
    ["Email", email],
    ["Phone", phone],
    ["Date of birth", birthDay.toDateString()],
  ]) {
    const label = document.createElement("span");
    label.innerHTML = title;
    headers.appendChild(label);

    const val = document.createElement("span");
    val.innerHTML = value;
    values.appendChild(val);
  }

  const buttons = document.createElement("div");
  buttons.classList.add("table-row-buttons");
  const likeButton = document.createElement("button");
  likeButton.id = `like-button-${index}`;
  likeButton.classList.add("like-button");
  likeButton.onclick = () => toggleLike(index);
  buttons.appendChild(likeButton);
  const editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.onclick = () => alert("todo");
  buttons.appendChild(editButton);

  content.appendChild(headers);
  content.appendChild(values);
  content.appendChild(buttons);
  details.appendChild(content);

  return details;
}

function tableColumn(datapoint) {
  const cell = document.createElement("div");

  const likesColumn = typeof datapoint === "boolean";
  if (likesColumn) {
    cell.innerHTML = datapoint;
    cell.onclick = () => toggleLike(dataRow[0] - 1);
  } else {
    cell.innerHTML = datapoint;
  }

  return cell;
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

  window.tableSort = {
    column,
    ascending,
  };
  window.tableData = table;
  // Update DOM
  const domTable = document.querySelector("#data");
  for (const dataRow of table.reverse()) {
    const tableRow = document.querySelector(`#table-row-${dataRow[0]}`);
    domTable.prepend(tableRow);
  }
}

async function generateTable() {
  const root = document.querySelector("main");
  const sortContainer = document.createElement("div");

  const sortOptions = [
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

  const sortLabel = document.createElement("span");
  sortLabel.innerHTML = "Sort by:";
  sortContainer.appendChild(sortLabel);

  sortOptions.forEach((text, index) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("sort-button");
    button.onclick = () => sortTable(index);
    sortContainer.appendChild(button);
  });
  root.appendChild(sortContainer);

  const content = document.createElement("div");
  content.id = "data";

  for (const dataRow of await getTable()) {
    content.appendChild(tableRow(dataRow));
  }
  root.appendChild(content);
}

generateTable();
