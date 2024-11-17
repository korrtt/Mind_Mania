const baseURL = "https://opentdb.com/api.php";
        const DIFFICULTY_TIMERS = { easy: 30, medium: 40, hard: 60 };
        const COIN_REWARDS = { easy: 5, medium: 7, hard: 12 };
        const QUESTIONS_LIMIT = {
            easy: 5,
            medium: 3,
            hard: 2,
        };
        const DAILY_LIMIT_KEY = "mindManiaLastPlayed";

        let questionsOrder = [];
        let currentQuestionIndex = 0;
        let coins = 0;
        let timerInterval = null;

        const questionElement = document.getElementById("question");
        const choicesContainer = document.getElementById("choices");
        const timerElement = document.getElementById("timer");
        const totalCoinsElement = document.getElementById("total-coins");
        const difficultyDisplay = document.getElementById("difficulty-display");

        // Check daily limit
        function checkDailyLimit() {
            const lastPlayed = localStorage.getItem(DAILY_LIMIT_KEY);
            const today = new Date().toDateString();
            if (lastPlayed === today) {
                alert("You have already completed today's quiz. Come back tomorrow!");
                return true;
            }
            return false;
        }

        // Save daily completion
        function markDailyCompleted() {
            const today = new Date().toDateString();
            localStorage.setItem(DAILY_LIMIT_KEY, today);
        }

        // Generate questions order
        function generateQuestionsOrder() {
            questionsOrder = [
                ...Array(QUESTIONS_LIMIT.easy).fill("easy"),
                ...Array(QUESTIONS_LIMIT.medium).fill("medium"),
                ...Array(QUESTIONS_LIMIT.hard).fill("hard"),
            ];
            shuffle(questionsOrder);
        }

        // Shuffle array
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Load a new question
        function loadQuestion() {
            if (checkDailyLimit()) return;

            if (currentQuestionIndex >= questionsOrder.length) {
                markDailyCompleted();
                alert(`Quiz complete! You earned ${coins} coins today.`);
                return;
            }

            const currentDifficulty = questionsOrder[currentQuestionIndex];
            difficultyDisplay.innerText = `Difficulty: ${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}`;

            fetch(`${baseURL}?amount=1&difficulty=${currentDifficulty}&type=multiple`)
                .then(response => response.json())
                .then(data => {
                    const questionData = data.results[0];
                    renderQuestion(questionData, currentDifficulty);
                })
                .catch(error => console.error("Error fetching question:", error));
        }

        // Render question
        function renderQuestion(data, difficulty) {
            const { question, correct_answer, incorrect_answers } = data;
            const allChoices = [...incorrect_answers, correct_answer];
            shuffle(allChoices);

            questionElement.innerHTML = question;
            choicesContainer.innerHTML = ""; // Clear previous choices

            allChoices.forEach(choice => {
                const button = document.createElement("button");
                button.innerText = choice;
                button.onclick = () => checkAnswer(choice, correct_answer, difficulty);
                choicesContainer.appendChild(button);
            });

            startTimer(DIFFICULTY_TIMERS[difficulty]);
        }

        // Start timer
        function startTimer(duration) {
            clearInterval(timerInterval); // Clear any existing timer
            let timeLeft = duration;
            timerElement.innerText = timeLeft;
            timerInterval = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    alert("Time is up!");
                    nextQuestion();
                } else {
                    timerElement.innerText = --timeLeft;
                }
            }, 1000);
        }

        // Check answer
        function checkAnswer(selectedAnswer, correctAnswer, difficulty) {
            clearInterval(timerInterval); // Clear timer to prevent jumbled timing
            if (selectedAnswer === correctAnswer) {
                const reward = COIN_REWARDS[difficulty];
                coins += reward;
                totalCoinsElement.innerText = coins;
                alert(`Correct! You earned ${reward} coins.`);
            } else {
                alert(`Incorrect! The correct answer was: ${correctAnswer}`);
            }
            nextQuestion();
        }

        // Load the next question
        function nextQuestion() {
            currentQuestionIndex++;
            loadQuestion();
        }

        // Go back to menu
        function goBack() {
            window.location.href = "/Mindmania/Menu.html"; // Update with actual menu path
        }

        // Initialize quiz
        generateQuestionsOrder();
        loadQuestion();