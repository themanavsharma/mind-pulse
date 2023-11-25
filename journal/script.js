document.addEventListener('DOMContentLoaded', function () {
    const entryNameInput = document.getElementById('entryName');
    const journalEntryTextarea = document.getElementById('journalEntry');
    const addJournalEntryButton = document.getElementById('addJournalEntry');
    const journalEntriesContainer = document.getElementById('journalEntries');
    const messageDiv = document.getElementById('message');

    // Load existing entries from local storage on page load
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    savedEntries.forEach(entry => {
        createJournalEntry(entry);
    });

    addJournalEntryButton.addEventListener('click', function () {
        const entryName = entryNameInput.value.trim();
        const entryText = journalEntryTextarea.value.trim();

        if (entryText !== '' && entryName !== '') {
            // Create a new entry object
            const entry = {
                name: entryName,
                text: entryText,
                timestamp: new Date().toISOString(),
            };

            // Save the new entry to local storage
            savedEntries.push(entry);
            localStorage.setItem('journalEntries', JSON.stringify(savedEntries));

            // Create and display the new entry
            createJournalEntry(entry);

            // Clear the input fields after adding an entry
            entryNameInput.value = '';
            journalEntryTextarea.value = '';

            // Clear the message
            messageDiv.textContent = '';
        } else {
            // Display a message
            messageDiv.textContent = 'Please make sure that both fields are filled.';
        }
    });

    // Function to create a new entry element
    function createJournalEntry(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('journal-entry');

        const entryName = document.createElement('p');
        entryName.textContent = `Name: ${entry.name}`;

        const timestamp = document.createElement('span');
        timestamp.textContent = new Date(entry.timestamp).toLocaleString();

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.addEventListener('click', function () {
            // Navigate to the details page with the entry data
            window.location.href = `entryDetails.html?name=${entry.name}&text=${entry.text}&timestamp=${entry.timestamp}`;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            // Remove the entry from the saved entries
            const entryIndex = savedEntries.findIndex(savedEntry => savedEntry.timestamp === entry.timestamp);
            savedEntries.splice(entryIndex, 1);

            // Update local storage
            localStorage.setItem('journalEntries', JSON.stringify(savedEntries));

            // Remove the entry element from the DOM
            journalEntriesContainer.removeChild(entryDiv);
        });

        entryDiv.appendChild(entryName);
        entryDiv.appendChild(timestamp);
        entryDiv.appendChild(viewButton);
        entryDiv.appendChild(deleteButton);
        journalEntriesContainer.appendChild(entryDiv);
    }
});
