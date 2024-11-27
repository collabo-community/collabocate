import { getLastIndexOfCharaterInString } from '../@library_external/transform.js';

const submitIssueForm = document.getElementById('submitIssueForm');
const displayToastrMessage = document.getElementById('displayToastrMessage');
const issueTemplatesDropdownSelect = document.getElementById('issueTemplates');
const issueBodyInput = document.getElementById('issueBody');
/* ----------------------------------
    Submit an Issue ticket through UI
---------------------------------- */
submitIssueForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    const issueTitleInput = document.getElementById('issueTitle');
    const title = issueTitleInput.value.trim();
    const body = issueBodyInput.value.trim();
    if (!title || !body) {
      displayToastrMessage.innerHTML = 'Issue Title and Body cannot be empty.';
      return;
    }

    // eslint-disable-next-line no-undef
    const response = await fetch(`${backend_URL}/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

if (response.status === 401){
  displayToastrMessage.innerHTML = 'Unauthorized: Can\'t access this resource';
  return;
}

    const data = await response.json();
    console.log(data);
    issueTitleInput.value = '';
    issueBodyInput.value = '';
    //-------------------------------
    const issueTicketUrl = data.issue.html_url;
    // eslint-disable-next-line no-undef
    const urlLastSlashIndex = getLastIndexOfCharaterInString({ text: issueTicketUrl, char: '/' });
    const issueNumber = issueTicketUrl.slice(urlLastSlashIndex + 1);
    //-------------------------------
    displayToastrMessage.innerHTML = `${data.message} Follow your issue ticket's progress here: <a target="blank" href="${issueTicketUrl}">Issue ticket #${issueNumber} </a>`;
  } catch (error) {
    displayToastrMessage.innerHTML = 'An error occurred. Could not submit issue ticket.';
  }
});

const fetchTemplates = async () => {
  try {
    const response = await fetch(`${backend_URL}/issue-templates`);
    if (!response.ok) {
      throw new Error(`Failed to fetch templates: ${response.statusText}`);
    }
    const templates = await response.json();
    return templates.templates; 
  } catch (error) {
    console.log('Error fetching templates:', error);
    displayToastrMessage.innerHTML = 'Could not load issue templates.';
    return [];
  }
};

const fetchTemplatesDropdown = async () => {
  const templates = await fetchTemplates();
 templates.forEach((template) => {
  const optionTemplate = `<option value=${template.download_url}> 
  ${template.name.replace('.md', '').split('-').join(' ').replace(/^./, char => char.toUpperCase())} 
  </option>`;
  issueTemplatesDropdownSelect.insertAdjacentHTML('beforeend', optionTemplate );
 });
};

issueTemplatesDropdownSelect.addEventListener('change', async (e) => {
  const downloadUrl = e.target.value;

  if (!downloadUrl) {
    issueBodyInput.value = '';
    return ;
  }

  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch template content: ${response.statusText}`);
    }
    const content = await response.text();
    issueBodyInput.value = content;
  } catch (error) {
    console.log('Error fetching template content:', error);
    displayToastrMessage.innerHTML = 'Could not load selected template content.';
  }
});

fetchTemplatesDropdown();



/* --------------------------------
    Fetch repositories on page load
-------------------------------- */
// try {
//   const response = await fetch(`${config.backend_url}/repositories`);
//   const data = await response.json();
//   console.log(data);
//   displayToastrMessage.innerHTML = 'Fetch successful!';
// } catch(error) {
//   displayToastrMessage.innerHTML = `An error occurred. ${error.message}.`;
// }