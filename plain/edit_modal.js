function openEditModal(index) {
  const modal = document.querySelector("dialog");
  modal.showModal();
  const user = window.tableData.find((row) => row.index === index);

  for (const [key, val] of Object.entries(user)) {
    const field = document.querySelector(`dialog form input[name=${key}]`);
    if (!field) {
      continue;
    }

    if (key === "birthDay") {
      field.value = val.toISOString().slice(0, 10);
    } else {
      field.value = val;
    }
  }

  document.querySelector("dialog h1").innerHTML = `Editing user ${index}`;

  document
    .querySelector("dialog form")
    .addEventListener("submit", onEditModalSubmit(index));
}

function setupModal() {
  const modal = document.querySelector("dialog");
  modal.addEventListener("click", function (event) {
    const rect = modal.getBoundingClientRect();
    const inBounds =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!inBounds) {
      modal.close();
    }
  });
}

function onEditModalSubmit(index) {
  return (evn) => {
    evn.preventDefault();
    evn.target.parentElement.close();

    // Save based on index
    const user = window.tableData.find((row) => row.index === index);

    for (const key of Object.keys(user)) {
      const formField = document.querySelector(
        `dialog form input[name=${key}]`,
      );
      if (!formField) {
        continue;
      }

      const rowField = document.querySelector(`#${key}-field-${index}`);

      user[key] = formField.value;
      if (key === "birthDay") {
        user[key] = new Date(formField.value);
      } else if (key === "supervisor") {
        user[key] = parseInt(user[key]);
      }

      if (rowField) {
        if (key === "birthDay") {
          rowField.innerHTML = user[key].toDateString();
        } else if (key === "supervisor") {
          embedSupervisorButton(user[key], rowField);
        } else {
          rowField.innerHTML = user[key];
        }
      }
    }

    document.querySelector(`#name-${index}`).innerHTML = formatEmployee(user);
  };
}

setupModal();
