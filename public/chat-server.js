document.addEventListener('DOMContentLoaded', () => {
    const paintingList = document.getElementById('paintingList');
    const paintingForm = document.getElementById('paintingForm');

    async function loadPaintings() {
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
        const paintingID = document.getElementById('paintingID').value; // Retrieve PaintingID from hidden input
        const updatedPainting = {
            Title: document.getElementById('title').value,
            FirstName: document.getElementById('firstName').value,
            LastName: document.getElementById('lastName').value,
            YearOfWork: parseInt(document.getElementById('year').value, 10),
            Description: document.getElementById('description').value,
            Medium: document.getElementById('medium').value,
            GalleryName: document.getElementById('gallery').value,
        };
    
        try {
            const response = await fetch(`/api/paintings/${paintingID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPainting),
            });
    
            if (response.ok) {
                alert('Painting updated successfully!');
                fetchPaintings(); // Optionally refresh the painting list
            } else {
                alert('Failed to update painting');
            }
        } catch (error) {
            console.error('Error updating painting:', error);
            alert('Error updating painting. Please check the console for details.');
        }
    });

    loadPaintings();
});