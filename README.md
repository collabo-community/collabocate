# Collabocate

Collabocate (Collabo~~rate~~ + ~~Communi~~cate) works with the GitHub REST API under the hood to remove the technical huddles associated with directly interacting with project repositories that reside on the GitHub platform, for non-technical users or contributors to your project (and technical users or contributors alike).

A two-way communication enabler for you and your project users and/or contributors to interact and collaborate (on your GitHub project) with no borders or barriers.

Your users and contributors can:
- Seemlessly interact with one or more of your GitHub repositories from the comfort of your application's interface, no new/long learning curve required.
- Other information coming soon

## How to integrate
> Information coming soon. While you wait, you are welcome to contribute to the project.

## How to contribute
See our [Contributing Guide](https://docs.collabocommunity.com) for general information on how to contribute to Collabo Community projects. Any kind of positively impacting contributions welcome!

## Local installation and setup guide for code contributors
- Fork the repository from https://github.com/collabo-community/collabocate
- Clone the forked repository into your local computer

> **Note 1 of 2:** There is migration going on for the API server, therefore there are 2 servers. Reason for retaining the old server for now: we still want to be able to run both the old API server and the new one, for comparison, upgrade and collaboration purposes.

> **Note 2 of 2:** See instructions below for whether you wish to run the older API server or the new API server.

## Running the server: Old API server
- Change directory (cd) into the root of the **collabocate project/repository** cloned
- After changing directory:
    - Install Dependencies: `npm install`
    - Make a copy of the `.env.example` file, then rename the copy to `.env` - it is this renamed copy that you will store your secrets in. Ensure that the .env file is in the *root of the **collabocate project/repository** folder.
    - In the `.env` file, supply:
        - The GitHub API url of your desired/chosen project in the `.env` file like this:
        ````
        GITHUB_API_URL=https://api.github.com/repos/your-own-github-account-user-name-will-be-here-instead/the-name-of-the-repo-you-want-to-interact-with
        ````
        - A GitHub personal access token for the GitHub account you are trying to access the repo for like this: 
        ````
        GITHUB_PERSONAL_ACCESS_TOKEN=add-your-token-here
        ````
        - the port number of your choice (for the API server to run on) in the `.env` file e.g. `PORT=4200`
   - Start the server: `npm start`
   - Open your browser and navigate to `http://localhost:server-port-number-here`

## Running the server: New API server
- Change directory (cd) into the `server` folder of in the root of the collabocate project/repository cloned
- After changing directory:
    - Make a copy of the `.env.example` file, then rename the copy to `.env` - it is this renamed copy that you will store your secrets in. Ensure that the .env file is in the root of the `server` folder.
    - In the `.env` file, supply:
        <!--
        - The GitHub API url of your desired/chosen project in the `.env` file like this:
        ````
        GITHUB_API_URL=https://api.github.com/repos/your-own-github-account-user-name-will-be-here-instead/the-name-of-the-repo-you-want-to-interact-with
        ````
         - A GitHub personal access token for the GitHub account you are trying to access the repo for like this: 
        ````
        GITHUB_PERSONAL_ACCESS_TOKEN=add-your-token-here
        ````
        -->
        - the port number of your choice (for the API server to run on) in the `.env` file e.g. `PORT=8080`
   - Start the server: `npm start`
   - Open your browser and navigate to `http://localhost:server-port-number-here`
