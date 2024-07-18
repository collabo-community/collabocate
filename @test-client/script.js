import config from "./lib/load.config.js";

const submitIssueForm = document.getElementById("submitIssueForm");
// const submitIssueButton = document.getElementById("submitIssueButton");

const displayToastrMessage = document.getElementById("displayToastrMessage");

/* ------------------------------
  Fetch repositories on page load
------------------------------ */
try {
  const response = await fetch(`${config.backend_url}/repositories`);
  const data = await response.json();
  console.log(data);
  displayToastrMessage.innerHTML = "Fetch successful!";
} catch (error) {
  displayToastrMessage.innerHTML = `An error occurred. ${error.message}.`;
}

/* --------------------------------
  Submit an Issue ticket through UI
-------------------------------- */
submitIssueForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    console.log(e);
    const issueTitleInput = document.getElementById("issueTitle");
    const issueBodyInput = document.getElementById("issueBody");
    const title = issueTitleInput.value;
    const body = issueBodyInput.value;
    const response = await fetch(`${config.backend_url}/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const data = await response.json();
    console.log(data);
    issueTitleInput.value = "";
    issueBodyInput.value = "";
    displayToastrMessage.innerHTML = `${data.message} Follow your issue ticket's progress here: ${data.issue.html_url}`;
  } catch (error) {
    displayToastrMessage.innerHTML =
      "An error occurred. Could not submit issue ticket.";
  }
});
