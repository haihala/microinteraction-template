function validateForm(evn) {
  const data = new FormData(evn.target);
  console.log(data);
  evn.preventDefault();

  const correctlyFilled =
    data.get("name").trim() !== "" &&
    data.get("birthday").trim() !== "" &&
    data.get("mathTrivia").trim() === "2" &&
    data.get("animalTrivia").trim().toLowerCase() === "white" &&
    data.get("geographyTrivia").trim().toLowerCase() === "rome" &&
    data.get("astronomyTrivia") === "saturn" &&
    data.get("done");

  const status = document.querySelector("#form-status");
  status.classList.value = "";
  if (correctlyFilled) {
    status.classList.add("status-success");
    status.innerHTML = "Success!";
  } else {
    status.classList.add("status-error");
    status.innerHTML = "Error in form";
  }
}

document.querySelector("form").addEventListener("submit", validateForm);
