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
  
  document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from questionnaire.json
    fetch('../jsons/questionnaire.json')
      .then(response => response.json())
      .then(data => {
        const q1Values = data.responses.map(response => response.Q1);
  
        // Count the occurrences of each value
        const count = q1Values.reduce((acc, value) => {
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});
  
        // Prepare data for the pie chart
        const labels = Object.keys(count);
        const values = Object.values(count);
  
        // Create a pie chart
        createPieChart(labels, values);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function createPieChart(labels, values) {
    const ctx = document.getElementById('emotionalStateChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels.map(label => {
          switch (label) {
            case '1':
              return 'Calm';
            case '2':
              return 'Neutral';
            case '3':
              return 'Stressed';
            default:
              return label;
          }
        }),
        datasets: [{
          data: values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // You can customize the colors
        }],
      },
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from questionnaire.json
    fetch('../jsons/questionnaire.json')
      .then(response => response.json())
      .then(data => {
        const q1Values = data.responses.map(response => response.Q2);
  
        // Count the occurrences of each value
        const count = q1Values.reduce((acc, value) => {
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});
  
        // Prepare data for the pie chart
        const labels = Object.keys(count);
        const values = Object.values(count);
  
        // Create a pie chart
        createPieChart2(labels, values);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function createPieChart2(labels, values) {
    const ctx = document.getElementById('workLifeBalance').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels.map(label => {
          switch (label) {
            case '1':
              return 'Well-balanced';
            case '2':
              return 'Satisfactory';
            case '3':
              return 'Overwhelmed';
            default:
              return label;
          }
        }),
        datasets: [{
          data: values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // You can customize the colors
        }],
      },
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from questionnaire.json
    fetch('../jsons/questionnaire.json')
      .then(response => response.json())
      .then(data => {
        const q1Values = data.responses.map(response => response.Q3);
  
        // Count the occurrences of each value
        const count = q1Values.reduce((acc, value) => {
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});
  
        // Prepare data for the pie chart
        const labels = Object.keys(count);
        const values = Object.values(count);
  
        // Create a pie chart
        createPieChart3(labels, values);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function createPieChart3(labels, values) {
    const ctx = document.getElementById('physicalWellBeing').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels.map(label => {
          switch (label) {
            case '1':
              return 'Energized';
            case '2':
              return 'Average';
            case '3':
              return 'Fatigued';
            default:
              return label;
          }
        }),
        datasets: [{
          data: values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // You can customize the colors
        }],
      },
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from questionnaire.json
    fetch('../jsons/questionnaire.json')
      .then(response => response.json())
      .then(data => {
        const q1Values = data.responses.map(response => response.Q4);
  
        // Count the occurrences of each value
        const count = q1Values.reduce((acc, value) => {
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});
  
        // Prepare data for the pie chart
        const labels = Object.keys(count);
        const values = Object.values(count);
  
        // Create a pie chart
        createPieChart4(labels, values);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function createPieChart4(labels, values) {
    const ctx = document.getElementById('connectionToOthers').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels.map(label => {
          switch (label) {
            case '1':
              return 'Strong';
            case '2':
              return 'Adequate';
            case '3':
              return 'Feeling isolated';
            default:
              return label;
          }
        }),
        datasets: [{
          data: values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // You can customize the colors
        }],
      },
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from questionnaire.json
    fetch('../jsons/questionnaire.json')
      .then(response => response.json())
      .then(data => {
        const q1Values = data.responses.map(response => response.Q5);
  
        // Count the occurrences of each value
        const count = q1Values.reduce((acc, value) => {
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});
  
        // Prepare data for the pie chart
        const labels = Object.keys(count);
        const values = Object.values(count);
  
        // Create a pie chart
        createPieChart5(labels, values);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function createPieChart5(labels, values) {
    const ctx = document.getElementById('mindfulnessPractices').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels.map(label => {
          switch (label) {
            case '1':
              return 'Regularly';
            case '2':
              return 'Occasionally';
            case '3':
              return 'Rarely';
            default:
              return label;
          }
        }),
        datasets: [{
          data: values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // You can customize the colors
        }],
      },
    });
  }