// Get the date input, mood buttons container, and mood log container
const dateInput = document.getElementById('date');
const moodButtonsContainer = document.querySelector('.mood-buttons');
const moodLogContainer = document.getElementById('moodLog');

// Function to log the mood
function logMood(mood) {
    const date = dateInput.value;

    // Get mood log from local storage
    const moodLog = JSON.parse(localStorage.getItem('moodLog')) || [];

    // Add new entry to mood log
    moodLog.push({ date, mood });

    // Update local storage
    localStorage.setItem('moodLog', JSON.stringify(moodLog));

    // Display the updated mood log
    displayMoodLog();
}

// Event delegation for mood buttons
moodButtonsContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        logMood(event.target.textContent.trim());
    }
});

// Function to display the mood log
function displayMoodLog() {
    moodLogContainer.innerHTML = ''; // Clear existing content

    // Get mood log from local storage
    const moodLog = JSON.parse(localStorage.getItem('moodLog')) || [];

    // Display each mood entry
    moodLog.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.textContent = `${entry.date}: ${entry.mood}`;
        moodLogContainer.appendChild(entryDiv);
    });
}
// Function to clear all mood logs
function clearLogs() {
    localStorage.removeItem('moodLog');
    displayMoodLog(); // Refresh the display
}

// Display initial mood log when the page loads
displayMoodLog();
