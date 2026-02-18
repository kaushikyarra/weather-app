# WeatherStack Glassmorphism App

A React-based weather application with a Glassmorphic design, fetching data from the Weatherstack API.

## Prerequisites

- **Node.js**: You must have Node.js installed to run this application. [Download Here](https://nodejs.org/)

## Setup & Run

1.  **Install Dependencies**:
    Open a terminal in this folder and run:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    The terminal will show a local URL (usually `http://localhost:5173`). Open this in your browser.

## Features

- **Current Weather**: Time, Temperature, Wind, Humidity.
- **Historical Weather**: Data for the previous day.
- **Marine Weather**: Placeholder for marine data (requires Premium API plan).
- **Glassmorphism**: Modern, translucent UI design.

## Important Notes

- **API Key**: The app is pre-configured with the provided API key.
- **HTTP vs HTTPS**: The generic Weatherstack API key (Free Tier) often doesn't support HTTPS. The app is configured to use `http://api.weatherstack.com`.
  - If you deploy this app to an HTTPS domain (e.g., Vercel, Netlify), the API requests will fail due to "Mixed Content".
  - For local development (`http://localhost`), it should work fine.
