// Function to fetch and display journal entries
async function displayJournalEntries() {
    try {
      const response = await fetch('/getJournalEntries'); // Assuming you have a server endpoint to fetch entries
      const data = await response.json();
  
      if (response.ok) {
        const journalEntriesDiv = document.getElementById('journalEntries');
  
        // Clear existing entries
        journalEntriesDiv.innerHTML = '';
  
        // Create and append new entry elements
        data.entries.forEach(entry => {
          const entryDiv = document.createElement('div');
          entryDiv.textContent = entry.comment;
          entryDiv.classList.add('journal-entry'); // Add the class to the entry
          journalEntriesDiv.appendChild(entryDiv);
        });
      } else {
        console.error('Failed to fetch journal entries:', data.message);
      }
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  }
  
  // Call the function to display journal entries when the page loads
  displayJournalEntries();
  