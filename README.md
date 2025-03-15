# Speech-to-Text Transcription App

## Overview

The Speech-to-Text Transcription App is a full-stack web application that allows users to record or upload audio files, convert them into text using a Speech-to-Text API, and store the transcriptions in a database.

## Key Features

- Audio Upload & Recording
- Speech-to-Text Conversion
- Real-Time Transcription Display
- Database Storage
- User Authentication (Optional)
- Responsive & Modern UI
- Error Handling & Validation

## Technology Stack

- Frontend: React.js (Vite) + Tailwind CSS
- Backend: Node.js + Express.js
- Database: Supabase 
- API: Deepinfra - openai/whisper-large-v3

## Project Setup

1.  **Clone the repository:**

    ```
    git clone https://github.com/Anwesha27/speech-to-text
    cd speech-to-text
    ```

2.  **Install dependencies:**

    For the frontend:

    ```
    cd frontend/speech-to-text
    npm install
    ```

    For the backend:

    ```
    cd backend
    npm install
    ```

3.  **Configuration:**

    - Create a `.env` file in both the `frontend` and `backend` directories with the necessary environment variables.

4.  **Run the application:**

    For the frontend:

    ```
    cd speech-to-text
    npm run dev
    ```

    For the backend:

    ```
    cd backend
    npm start
    ```

## API Usage

- The backend provides the following API endpoints:

    -   `/api/transcribe`: Accepts audio files and returns the transcription.

## Deployment

1.  **Frontend:**

    -   Deploy the frontend to Vercel.

2.  **Backend:**

    -   Deploy the backend to Vercel.

3.  **Environment Variables:**

    -   Make sure to set the necessary environment variables in your deployment platform (e.g., API keys, database URLs).

## Contributors

-   [Anwesha](https://github.com/Anwesha27)
