# GET and POST Requests from GitHub

Post and Get issue of GitHub from the web app using GitHub REST API

### Overview

This project is a web application that allows users to fetch and create GitHub issues and view pull requests. It consists of an HTML frontend for user interaction and an Express.js backend to communicate with the GitHub API.

## Installation and Setup

1. Fork this repository https://github.com/collabo-community/collabocate
2. git clone the forked repository into your local machine
3. cd your-repository
4. Install Dependencies: npm install

### Security and Authentication

The project uses GitHub tokens for authentication. The token is stored in the .env file and is used to authenticate API requests.

#### Create .env file

GITHUB_TOKEN=your_github_token

#### User Interface

Buttons

- GET Issues: Retrieves a list of issues from GitHub
- POST Issue: Creates a new issue on GitHub
- GET Pull Requests: Retrieves a list of pull requests from GitHub

Input Title

- Issue Title: Input field for the issue title
- Issue Body: Input field for the issue body

## Run the Server

node server.js

#### Open your browser and navigate to

http://localhost:3000

## Conclusion

This project demonstrates a basic web application that interacts with the GitHub API. It showcases how to retrieve and create issues and pull requests using the GitHub API.
