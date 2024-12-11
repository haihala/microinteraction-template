const el = document.querySelector("tbody");

fetch("/data/people-1000.csv").then(async (response) => {
  const txt = await response.text();

  txt.split("\n").forEach((line) => {
    const row = el.insertRow();

    let cols = line.split(",");
    if (cols.length > 9) {
      // Title, last field, has a comma and is the only thing in quotes
      cols = [...cols.slice(0, 8), line.match(/"(.*)"/)[1]];
    }

    cols.forEach((datapoint, index) => {
      const cell = row.insertCell(index);
      cell.innerHTML = datapoint;
    });
  });
});
