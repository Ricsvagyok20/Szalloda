# Szalloda

Szalloda is a web application for managing hotel bookings, programs and user profiles.  
This project was created in Node.js using Ejs for the views and a MySQL database.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [Installation](#installation)
- [Running the Web Application](#running-the-web-application)
  - [Using an IDE](#using-an-ide-eg-webstorm)
  - [Without an IDE](#without-an-ide)
- [Usage](#usage)

## Features
- Check out the programs you can enjoy during your stay
  - See how many days our other guest's have reserved for each program
- Browse the reservations and the room selection
- Log into profile to see all personal information and the programs available during the stay

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your computer
- MySQL server installed and running

## Database Setup

1. Ensure MySQL Server is installed and running.
2. Import the database schema from the SQL file located at `src/Database/kotprog.sql`:

```sh
mysql -u your_username -p your_database_name < src/Database/database.sql
```

- Replace your_username and your_database_name with your MySQL username and desired database name.  
- You can also use the MySQL Workbench to run the script after importing it from the above stated location

## Installation

1. Clone the repository:

```sh
git clone https://github.com/Ricsvagyok20/Szalloda.git
cd Szalloda
```

2. Install the dependencies:

```sh
npm install
```

## Running the Web Application

Before running the app make sure to edit the `password` field under connection in the `src/Database/db.js` file to be able to connect to your MySQL Server.

### Using an IDE (e.g., WebStorm)

1. Open the project in your IDE.
2. Ensure your MySQL server is running.
3. Start the server from your IDE.

### Without an IDE

1. Ensure your MySQL server is running.
2. Start the application using the command line:

```sh
node src/index.js
```

## Usage

- Access the application in your web browser at `http://localhost:8080`.
- To view the admin interface, log in with the following credentials on the **Profile** page:
  - **ID:** 11111111 
  - **Password:** admin123