// Select the countdown container
const countdown = document.getElementById('countdown');

// Set the launch date and time (replace with the actual launch date and time)
const launchDate = new Date('2024-01-12 10:00:00'); // Example launch date

// Update the countdown every second
function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Display the countdown in the format "Days:Hours:Minutes:Seconds"
  countdown.textContent = `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // If the launch date has passed, display a "Launched!" message
  if (diff <= 0) {
    countdown.textContent = 'Launched!';
  } else {
    // Schedule the next update
    setTimeout(updateCountdown, 1000);
  }
}

// Start the countdown
updateCountdown();

// Handle the "Claim Your Ticket" button click
const button = document.querySelector('button');
button.addEventListener('click', () => {
  // Redirect to the registration page or perform other actions
  window.location.href = 'registration.html'; // Replace with the actual registration page URL
});
