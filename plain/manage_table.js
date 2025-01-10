function formatEmployee(employee) {
  return `Employee ${employee.index} - ${employee.lastName}, ${employee.firstName}`;
}

async function fetchTable(resolve) {
  window.tableData = (await (await fetch("/people-1000.csv")).text())
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      let cols = line.split(",");
      if (cols.length > 9) {
        // Job title has a comma and is in quotes
        // It's the last field
        cols = [...cols.slice(0, 8), line.match(/"(.*)"/)[1]];
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

      return {
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
    });

  window.tableSort = {
    column: 0,
    ascending: true,
  };

  resolve(window.tableData);
}

async function getTable() {
  if (window.tableData) {
    // Table data is stored in window to make sorting easier.
    return Promise.resolve(window.tableData);
  } else {
    // This simulates loading time, time in milliseconds
    return new Promise((resolve) => {
      setTimeout(() => fetchTable(resolve), 0);
    });
  }
}

function toggleLike(index) {
  const row = window.tableData.find((item) => {
    return item.index === index;
  });
  const button = document.querySelector(`#like-button-${index}`);
  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
    row.liked = false;
  } else {
    button.classList.add("liked");
    row.liked = true;
  }
}

function tableRow(dataRow) {
  const { index } = dataRow;

  const details = document.createElement("details");
  details.id = `table-row-${index}`;

  const summary = document.createElement("summary");
  summary.id = `name-${index}`;
  summary.innerHTML = formatEmployee(dataRow);
  details.appendChild(summary);

  const wrapper = document.createElement("div");
  wrapper.classList.add("table-row-wrapper");
  const grid = document.createElement("div");
  grid.classList.add("table-row-data");
  for (const [title, key, embed] of [
    ["User id", "userId"],
    ["Job title", "jobTitle"],
    ["Sex", "sex"],
    ["Email", "email"],
    ["Phone", "phone"],
    [
      "Date of birth",
      "birthDay",
      (d, container) => {
        container.innerHTML = d.toDateString();
      },
    ],
    [
      "Supervisor",
      "supervisor",
      (supervisor, container) => {
        const employee = window.tableData.find((e) => e.index === supervisor);
        if (employee) {
          const button = document.createElement("button");
          button.onclick = () => {
            document.querySelector(`#table-row-${supervisor}`).scrollIntoView();
          };
          button.innerHTML = formatEmployee(employee);
          container.appendChild(button);
        } else {
          container.innerHTML = "Nobody, they are at the top";
        }
      },
    ],
  ]) {
    const label = document.createElement("span");
    label.innerHTML = title;
    grid.appendChild(label);

    const val = document.createElement("span");
    if (!embed) {
      val.innerHTML = dataRow[key];
    } else {
      embed(dataRow[key], val);
    }
    val.id = `${key}-field-${index}`;
    grid.appendChild(val);
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
  editButton.onclick = () => openEditModal(index);
  buttons.appendChild(editButton);

  wrapper.appendChild(grid);
  wrapper.appendChild(buttons);
  details.appendChild(wrapper);

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
    const sortKey = [
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
    ][column];
    let a = row1[sortKey];
    let b = row2[sortKey];

    if (a === b) return 0;

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
  for (const dataRow of table) {
    const tableRow = document.querySelector(`#table-row-${dataRow.index}`);
    domTable.append(tableRow);
  }
}

async function generateTable() {
  const root = document.querySelector("#people-container");
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
