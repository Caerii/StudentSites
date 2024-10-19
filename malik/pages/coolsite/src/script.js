document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const bio = document.getElementById('bio').value;
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const contributions = JSON.parse(localStorage.getItem('contributions')) || [];
            const contribution = {
                bio: bio,
                file: e.target.result,
                type: file.type
            };
            contributions.push(contribution);
            localStorage.setItem('contributions', JSON.stringify(contributions));
            displayContributions();
        };

        reader.readAsDataURL(file);
    }
});

// Function to display contributions from localStorage
function displayContributions() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery

    const contributions = JSON.parse(localStorage.getItem('contributions')) || [];
    contributions.forEach((contribution, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const bioElement = document.createElement('p');
        bioElement.textContent = contribution.bio;

        let mediaElement;

        if (contribution.type.startsWith('image/')) {
            mediaElement = document.createElement('img');
            mediaElement.src = contribution.file;
        } else if (contribution.type.startsWith('audio/')) {
            mediaElement = document.createElement('audio');
            mediaElement.controls = true;
            const source = document.createElement('source');
            source.src = contribution.file;
            mediaElement.appendChild(source);
        } else if (contribution.type.startsWith('video/')) {
            mediaElement = document.createElement('video');
            mediaElement.controls = true;
            const source = document.createElement('source');
            source.src = contribution.file;
            mediaElement.appendChild(source);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            contributions.splice(index, 1); // Remove from array
            localStorage.setItem('contributions', JSON.stringify(contributions)); // Save updated array
            displayContributions(); // Refresh display
        };

        itemDiv.appendChild(mediaElement);
        itemDiv.appendChild(bioElement);
        itemDiv.appendChild(deleteButton);
        gallery.appendChild(itemDiv);
    });
}

// Load contributions when the page is loaded
window.onload = displayContributions;
