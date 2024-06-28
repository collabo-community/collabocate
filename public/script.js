const getButton = document.getElementById("getButton");
const postButton = document.getElementById("postButton");
const getPRButton = document.getElementById("getPRButton");
const resultDiv = document.getElementById("result");
const prResultDiv = document.getElementById("prResult");
const issueTitleInput = document.getElementById("issueTitle");
const issueBodyInput = document.getElementById("issueBody");
const repoResultDiv = document.getElementById("repoResult");

// Function to make a GET request for issues
function makeGetRequest() {
  fetch("/issues")
    .then((response) => response.json())
    .then((data) => {
      resultDiv.innerHTML = "";
      data.forEach((issue) => {
        const issueLink = document.createElement("a");
        issueLink.href = issue.html_url;
        issueLink.textContent = issue.title;
        issueLink.target = "_blank";
        resultDiv.appendChild(issueLink);
        resultDiv.appendChild(document.createElement("br"));
      });
    })
    .catch((error) => console.error("Error fetching issues:", error));
}

// Function to make a POST request for issues
function makePostRequest() {
  const title = issueTitleInput.value;
  const body = issueBodyInput.value;

  fetch("/issues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to create issue! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      resultDiv.innerText = `New Issue Created: ${data.title}`;
      issueTitleInput.value = "";
      issueBodyInput.value = "";
    })
    .catch((error) => console.error("Error creating issue:", error));
}

// Function to make a GET request for pull requests
function makeGetPRRequest() {
  fetch("/pull-requests")
    .then((response) => response.json())
    .then((data) => {
      prResultDiv.innerHTML = "";

      data.forEach((pr) => {
        const prLink = document.createElement("a");
        prLink.href = pr.html_url;
        prLink.textContent = pr.title;
        prLink.target = "_blank";
        prResultDiv.appendChild(prLink);
        prResultDiv.appendChild(document.createElement("br"));
      });
    })
    .catch((error) => console.error("Error fetching pull requests:", error));
}

// Event listeners for button clicks
getButton.addEventListener("click", makeGetRequest);
postButton.addEventListener("click", makePostRequest);
getPRButton.addEventListener("click", makeGetPRRequest);

// Fetch repositories on page load
window.onload = fetchRepositories;
