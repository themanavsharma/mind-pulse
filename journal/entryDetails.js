document.addEventListener('DOMContentLoaded', function () {
    const entryDetailsContainer = document.getElementById('entryDetails');

    // Get entry details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const entryName = urlParams.get('name');
    const entryText = urlParams.get('text');
    const entryTimestamp = urlParams.get('timestamp');

    // Display entry details
    const entryDetails = document.createElement('div');
    entryDetails.classList.add('entry-details');

    const entryNameElement = document.createElement('p');
    entryNameElement.textContent = `Name: ${entryName}`;

    const entryTextElement = document.createElement('p');
    entryTextElement.textContent = `Entry: ${entryText}`;

    const timestampElement = document.createElement('p');
    timestampElement.textContent = `Timestamp: ${new Date(entryTimestamp).toLocaleString()}`;

    entryDetails.appendChild(entryNameElement);
    entryDetails.appendChild(entryTextElement);
    entryDetails.appendChild(timestampElement);

    entryDetailsContainer.appendChild(entryDetails);
});
