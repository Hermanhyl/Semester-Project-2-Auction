# Semester-Project-2-Auction

## Table of Contents

- [Description](#description)
- [User Stories](#user-stories)
- [Technologies](#technologies)
- [Planing Resources](#planing-resources)
- [Prerequisites](#prerequisites)
- [Steps To Run Locally](#steps-to-run-locally)
- [API](#api)
- [Acknowledgement](#acknowledgement)
- [Author](#authors)
  
---

## Description

Own The Bid is a web-based auction platform where users can:

1. Register an account using a valid `stud.noroff.no` email address.
2. Create listings with titles, descriptions, media galleries, and expiration dates.
3. Bid on items listed by other users.
4. View bids made on their listings.
5. Update their avatar and view their total credits.

### User Stories

This project addresses the following user stories:

1. A user with a `stud.noroff.no` email may register.
2. A registered user may log in.
3. A registered user may log out.
4. A registered user may update their avatar.
5. A registered user may view their total credits.
6. A registered user may create a listing with a title, deadline date, media gallery, and description.
7. A registered user may add a bid to another user's listing.
8. A registered user may view bids made on a listing.
9. An unregistered user may search through listings.

## Technologies

The project is built using:

- **Vanilla JavaScript**
- **HTML**
- **Tailwind CSS**
- **Vite** (as the build tool)
- **Husky** (for Git hooks)
- **Prettier** (for code formatting)

The backend API is provided by Noroff and documented [here](https://docs.noroff.dev/docs/v2/auction-house/listings).

## Planing Resources

- Gantt Chart: https://github.com/users/Hermanhyl/projects/2/views/4
- Figma Design: https://www.figma.com/design/8AhvLrYMu6VoQhHefNQpUz/Semester-Project-2-auction?m=auto&t=dcu6AGc0uhWWBqzU-1
- Kanban Board: https://github.com/users/Hermanhyl/projects/2/views/3

### Prerequisites

Make sure you have **Node.js** installed. You can download it from [nodejs.org](https://nodejs.org/).

## Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Andreasjoa23/Bidify-SemesterProject-2.git

   ```

2. Navigate to the project folder:
   "cd Bidify-SemesterProject-2"

3. Install dependencies:
   npm install

4. Run the development server:
   npm run dev

The application should now be running on http://localhost:5173.

## Live Demo

The live version of the project will be available soon once deployed.

## API

Here is the link for the API used for this project: https://v2.api.noroff.dev/docs/static/index.html#/

You will find the fetch calls used under auction-profiles and auction-listings.

## Acknowledgement

- Images used are taken from Unsplash (free)
- Icons used are taken from Font Awsome (free)

## Author
 - Hermanhyl
