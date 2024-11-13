document.addEventListener('DOMContentLoaded', () => {
    const paintingList = document.getElementById('paintingList');
    const paintingForm = document.getElementById('paintingForm');

    async function loadPaintings() {
        //Set this api link to the one we make
        const response = await fetch('/api/paintings');
        const paintings = await response.json();

        paintings.forEach(painting => {
            const button = document.createElement('button');
            button.textContent = painting.Title;
            button.addEventListener('click', () => loadPainting(painting));
            paintingList.appendChild(button);
        });
    }

    function loadPainting(painting) {
        document.getElementById('paintingID').value = painting._id;
        document.getElementById('title').value = painting.Title;
        document.getElementById('artist').value = `${painting.FirstName || ''} ${painting.LastName}`.trim();
        document.getElementById('year').value = painting.YearOfWork;
        document.getElementById('description').value = painting.Description;
        document.getElementById('medium').value = painting.Medium;
        document.getElementById('gallery').value = painting.GalleryName;
    }
    

    document.getElementById('saveBtn').addEventListener('click', async () => {
        const paintingID = document.getElementById('paintingID').value;
        console.log('Saving painting with ID:', paintingID);
        const updatedPainting = {
            Title: document.getElementById('title').value,
            FirstName: document.getElementById('artist').value.split(' ')[0],
            LastName: document.getElementById('artist').value.split(' ')[1] || '',
            YearOfWork: parseInt(document.getElementById('year').value, 10),
            Description: document.getElementById('description').value,
            Medium: document.getElementById('medium').value,
            GalleryName: document.getElementById('gallery').value,
        };

        const response = await fetch(`/api/paintings/${paintingID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPainting),
        });

        if (response.ok) {
            alert('Painting updated successfully!');
            loadPaintings(); // Refresh painting list (optional)
        } else {
            alert('Failed to update painting');
        }
    });

    loadPaintings();
});