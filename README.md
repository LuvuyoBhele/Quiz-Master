# Quiz-Master

## Overview

**Quiz Master** is a web-based application designed to help a quiz master manage and run quizzes efficiently. The project was created to provide all the essential tools for hosting a quiz, including question management, answer tracking, scoring, and memo generation. It also serves as a showcase of SQL skills and demonstrates how to integrate a database into a modern web app.  

*Note: This is the MVP version of Quiz Master, focused on demonstrating core functionality and SQL integration.*

## Features

- **Question Management:** Supports multiple question types (MCQ, True/False, Riddle, Open Ended, etc.).
- **Answer Tracking:** Stores correct answers and allows for answer validation.
- **Point System:** Assigns points per round and question for flexible scoring.
- **Memo Generation:** Displays a summary of questions and correct answers after each round.
- **MCQ Shuffling:** Randomizes MCQ options and tracks the correct answer letter.
- **Timer:** Built-in timer for each question.
- **Navigation:** NEXT/PREV controls for moving through questions and rounds.
- **Database Integration:** All quiz data is stored and managed using PostgreSQL.

## Technologies Used

- **Node.js** with **Express** for the backend server
- **EJS** for server-side rendering of views
- **PostgreSQL** for the database
- **HTML/CSS/JavaScript** for the frontend
- **jQuery** for some client-side interactions

## Project Structure

## Project Structure

```
Quiz Master/
├── public/
│   ├── JS/
│   │   └── app.js
│   └── STYLES/
│       └── quiz.css
├── views/
│   ├── index.ejs
│   └── memo.ejs
├── QUIZ DB.sql
├── quiz-index.js
├── package.json
```

## 🧩 Code Overview

### 🔗 Application Flow
1. **Frontend (HTML/CSS/JS/jQuery)**  
   - Renders quiz interface with navigation, timers, and question display.  
   - Handles user interactions (NEXT/PREV, answer selection).  

2. **Backend (Node.js + Express)**  
   - Routes requests between the frontend and database.  
   - Manages quiz state (current round, scoring, memo generation).  
   - Uses EJS templates to render dynamic views.  

3. **Database (PostgreSQL)**  
   - Stores questions, answers, rounds, and scoring rules.  
   - Provides queries for validation, memo summaries, and analytics.  


### 📂 Key Files
- **`quiz-index.js`** → Entry point; starts the Express server and defines routes.  
- **`views/index.ejs`** → Main quiz interface template.  
- **`views/memo.ejs`** → Displays summary of questions and correct answers after each round.  
- **`public/JS/app.js`** → Client-side logic (timers, navigation, answer selection).  
- **`public/STYLES/quiz.css`** → Styling for quiz interface.  
- **`QUIZ DB.sql`** → SQL schema and sample data (tables for questions, answers, rounds).  


### 🗄️ Database Schema (Simplified)
- **Questions Table** → Stores question text, type, and round association.  
- **Answers Table** → Stores possible answers and flags the correct one.  
- **Rounds Table** → Groups questions and defines scoring rules.  


### ⚙️ Core Logic Highlights
- **MCQ Shuffling**: Randomizes options while preserving correct answer mapping.  
- **Timer**: JavaScript countdown per question, synced with navigation.  
- **Scoring System**: Points assigned per question/round, aggregated at the end.  
- **Memo Generation**: SQL queries + EJS rendering to show correct answers after each round.  


## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the database:**
   - Create a PostgreSQL database named `Quiz`.
   - Run the SQL commands in `QUIZ DB.sql` to create tables and insert sample data.

3. **Start the server:**
   ```bash
   node quiz-index.js
   ```
   or (if you have nodemon)
   ```bash
   npm run dev
   ```

4. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Why This Project?

- To provide a practical tool for quiz masters.
- To learn and demonstrate how to use SQL and databases in a real-world app.
- To showcase SQL table design, joins, and queries in a working application.

## Future Improvements

As this is the MVP version of Quiz Master, future iterations may include:

- **User Accounts & Authentication**  
  Allow quiz masters and players to log in and manage their own sessions.

- **Question Import/Export**  
  Support uploading questions from CSV/Excel and exporting results for record‑keeping.

- **Advanced Scoring**  
  Add bonus points, penalties, and customizable scoring rules.

- **Analytics Dashboard**  
  Provide insights into player performance, question difficulty, and round statistics.

- **Mobile Optimization**  
  Improve UI/UX for mobile devices and tablets.

- **Multiplayer Mode**  
  Enable multiple players to join and compete in real time.

- **Admin Panel**  
  Web interface for managing questions, rounds, and player data without editing SQL directly.

## Author

Created by [Ntsikelelo Luvuyo Tshangela].
