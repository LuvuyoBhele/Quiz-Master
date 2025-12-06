-- =========================
-- 1. CREATE TABLES
-- =========================

-- Table for quiz questions
CREATE TABLE questions (
    id SERIAL PRIMARY KEY NOT NULL,
    question TEXT,
    category TEXT,
    round INTEGER REFERENCES point_system(question_round)
);

-- Table for answers
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    answer TEXT NOT NULL
);

-- Table for point system
CREATE TABLE point_system (
    question_round INTEGER PRIMARY KEY,
    points INTEGER NOT NULL
);

-- Table for multiple choice options
CREATE TABLE mcq_options (
    id SERIAL PRIMARY KEY,
    id_question INTEGER REFERENCES questions(id),
    option_a TEXT,
    option_b TEXT,
    option_c TEXT
);

-- =========================
-- 2. INSERT DATA
-- =========================

-- Insert questions
INSERT INTO questions (id, question, category, round) VALUES
    (1, 'What monument is famous for its tilt?', 'Geography', 1),
    (2, 'True or False: The majestic hall in Asgard where half of those who die in battle are gathered by the Valkyries is called Folkvangr.', 'True or False', 1),
    (3, 'What is the largest mammal in the world?', 'MCQ', 1),
    (4, 'Who is known for leaving a glass slipper behind at the ball?', 'Open Ended', 1),
    (5, 'True or False: Isaac Newton wrote the play Romeo and Juliet.', 'True or False', 1),
    (6, 'Which organ in the human body can regenerate itself completely?', 'MCQ', 1),
    (7, 'What animal is featured on the R200 note?', 'Open Ended', 1),
    (8, 'True or False: Lesotho is a South African province.', 'True or False', 1),
    (9, 'What planet is known as the Red Planet?', 'MCQ', 1),
    (10, 'What is Iron Man''s real name?', 'MCQ', 1),
    (11, 'Which element has the chemical symbol "O"?', 'MCQ', 2),
    (12, 'What sport is known as the King of Sports?', 'MCQ', 2),   
    (13, 'In tennis, what is the term for zero?', 'Open Ended', 2),
    (14, 'True or False: The cannabis plant can be used to make clothes.', 'True or False', 2),
    (15, 'Spell the word "parallel."', 'Spelling', 2),
    (16, 'Which company uses the slogan Impossible is Nothing?', 'Open Ended', 2),
    (17, 'Which three countries will co-host the 2026 FIFA World Cup?', 'MCQ', 2),
    (18, 'What does the Big Bad Wolf say in The Three Little Pigs?', 'Open Ended', 2),
    (19, 'Who is the friendly neighborhood superhero who swings through the streets of New York?', 'Open Ended', 2),
    (20, 'Guess the slogan: Open Happiness.', 'Open Ended', 2),
    (21, "Riddle: I never move, yet I bring the world to you. I store your photos, your maps, your memories too. I shine with light, but make no sound. You hold me close — I'm always around. What am I?", 'Riddle', 3),
    (22, "Riddle: I'm born in a breath, yet I steal it away. I'm fed by the wind, but I don't like to stay. I leave black behind, though I shimmer in gold. I am fierce and never cold. What am I?", 'Riddle', 3),
    (23, 'Riddle: I have no legs, yet I run. I have no lungs, yet I breathe. I wear no clothes, yet I change with the seasons. What am I?', 'Riddle', 3),
    (24, 'Guess the slogan: Finger Lickin'' Good.', 'Open Ended', 3),
    (25, 'What does NPC stand for?', 'MCQ', 3),
    (26, 'Which word correctly completes this sentence: "____ did you invite to the seminar?"', 'MCQ', 3),
    (27, 'A train leaves at 3:15 PM and arrives at 5:45 PM. How long is the journey?', 'Math', 3),
    (28, 'Estimate: What is 15% of 200? (Closest answer gets the most points.)', 'Math', 3),
    (29, 'Riddle: A farmer has 4 haystacks in one field and 5 haystacks in another. If he combines them all in one field, how many haystacks does he have?', 'Riddle', 3),
    (30, 'Riddle: A plane crashes on the border of South Africa and Lesotho. Where do they bury the survivors?', 'Riddle', 3),
    (31, 'Riddle: What gets wetter the more it dries?', 'Riddle', 4),
    (32, 'Riddle: What has hands but cannot clap?', 'Riddle', 4),
    (33, 'Riddle: What has a head, a tail, is brown, and has no legs?', 'Riddle', 4),
    (34, 'Riddle: What comes once in a minute, twice in a moment, but never in a thousand years?', 'Riddle', 4),
    (35, 'Riddle: What can travel around the world while staying in the same corner?', 'Riddle', 4),
    (36, 'Riddle: What has many keys but cannot open a single lock?', 'Riddle', 4),
    (37, 'Riddle: What has one eye but cannot see?', 'Riddle', 4),
    (38, 'Riddle: What begins with "T," ends with "T," and has "T" in it?', 'Riddle', 4),
    (39, 'Riddle: What has a neck but no head?', 'Riddle', 4),
    (40, 'Riddle: What has words but never speaks?', 'Riddle', 4);

-- Insert answers
INSERT INTO answers (id, answer) VALUES
    (1, 'The Leaning Tower of Pisa'),
    (2, 'False'),
    (3, 'Blue Whale'),
    (4, 'Cinderella'),
    (5, 'False'),
    (6, 'Liver'),
    (7, 'Leopard'),
    (8, 'False'),
    (9, 'Mars'),
    (10, 'Tony Stark'),
    (11, 'Oxygen'),
    (12, 'BRONZE'),
    (13, 'LOVE'),
    (14, 'True'),
    (15, 'P A R A L L E L'),
    (16, 'Adidas'),
    (17, 'United States, Canada, Mexico'),
    (18, 'MOTSWANA'),
    (19, 'Millipede'),
    (20, 'COKE'),
    (21, 'SMARTPHONE'),
    (22, 'Fire'),
    (23, 'A RIVER'),
    (24, 'KFC'),
    (25, 'NON PLAYABLE CHARACTER'),
    (26, 'Whom'),
    (27, '2hours 30mins'),
    (28, '30'),
    (29, '1'),
    (30, 'Nowhere'),
    (31, '24'),
    (32, '6'),
    (33, 'Lion'),
    (34, 'Doorbell'),
    (35, 'Any valid African country'),
    (36, 'Examples: Apple, strawberry, cherry'),
    (37, 'Examples: Soccer, tennis, basketball'),
    (38, "Worth it (L'Oréal)"),
    (39, "It (McDonald's)"),
    (40, 'Wings');

-- Insert point system
INSERT INTO point_system (question_round, points) VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 5),
    (5, 10);

-- =========================
-- 3. SAMPLE QUERIES
-- =========================

-- Retrieve each question with its category, MCQ options, and answer for a given round
SELECT 
    mcq.option_a, 
    mcq.option_b, 
    mcq.option_c, 
    a.answer, 
    q.question, 
    q.category
FROM questions AS q
LEFT JOIN mcq_options AS mcq ON q.id = mcq.id_question
JOIN answers AS a ON a.id = q.id
WHERE q.round = $1;

-- View questions with their corresponding point values
SELECT 
    questions.question, 
    point_system.points
FROM questions
JOIN point_system ON questions.round = point_system.question_round;