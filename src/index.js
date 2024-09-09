// Base URL for the API
const baseURL = 'http://localhost:3000/ramens';

async function displayRamens() {
  try {
    const response = await fetch('http://localhost:3000/ramens');
    if (!response.ok) throw new Error('Network response was not ok.');
    const ramens = await response.json();

    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.innerHTML = ''; // Clear existing content

    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.dataset.id = ramen.id; // Store ramen ID in a data attribute
      img.addEventListener('click', handleClick);
      ramenMenu.appendChild(img);

      document.getElementById('name').textContent = ramen.name || 'No name';
      document.getElementById('restaurant').textContent = ramen.restaurant || 'No restaurant';
      document.getElementById('rating').textContent = ramen.rating || 'N/A';
      document.getElementById('comment').textContent = ramen.comment || 'No comment';
      document.getElementById('image').src = ramen.image || 'No comment';

    });
  } catch (error) {
    console.error('Error fetching ramens:', error);
  }
}
// Function to handle ramen image click
function handleClick(event) {
  const ramenId = event.target.dataset.id;
  fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(ramen => {
      document.getElementById('name').textContent = ramen.name || 'No name';
      document.getElementById('restaurant').textContent = ramen.restaurant || 'No restaurant';
      document.getElementById('rating').textContent = ramen.rating || 'N/A';
      document.getElementById('comment').textContent = ramen.comment || 'No comment';
      document.getElementById('image').src = ramen.image || 'No comment';
    })
    .catch(error => console.error('Error fetching ramen details:', error));
}
// Handle form submission to add new ramen
function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  const imageInput = document.getElementById('new-ramen-image');
  const previewImage = document.getElementById('preview-image');

  // Show image preview when a file is selected
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('new-ramen-name').value;
    const restaurant = document.getElementById('new-ramen-restaurant').value;
    const rating = document.getElementById('new-ramen-rating').value;
    const comment = document.getElementById('new-ramen-comment').value;
    const image = document.getElementById('new-ramen-image').value;

    const newRamen = {
      name: name,
      restaurant: restaurant,
      rating: rating,
      comment: comment,
      image: image
    };

    // Post new ramen to server and update menu
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRamen)
    })
    .then(response => response.json())
    .then(ramen => {
      // Add new ramen to the menu
      const ramenMenu = document.getElementById('ramen-menu');
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.dataset.id = ramen.id; // Use new ramen ID in data attribute
      img.addEventListener('click', handleClick); // Add click event listener
      ramenMenu.appendChild(img); // Append new ramen image

      // Reset form
      form.reset();
      previewImage.style.display = 'none'; // Hide image preview
    })
    .catch(error => console.error('Error adding new ramen:', error));
  });
}

// Main function to start everything after DOM content is loaded
function main() {
  displayRamens();
  addSubmitListener();
}

// Run main function after DOM content is loaded
document.addEventListener('DOMContentLoaded', main);



// Export functions for testing and usage
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
