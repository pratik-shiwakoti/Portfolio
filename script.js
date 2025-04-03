// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-checkbox");
const modeIndicator = document.getElementById("mode-indicator");
const body = document.body;
const sliderIcons = document.querySelectorAll(".slider .icon");

// Check saved preference
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
    modeIndicator.textContent = "Light Mode"; // Show opposite mode
    sliderIcons[0].style.display = "none"; // Hide sun
    sliderIcons[1].style.display = "inline"; // Show moon
}

// Toggle Dark Mode
darkModeToggle.addEventListener("change", function () {
    if (darkModeToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
        modeIndicator.textContent = "Light Mode"; // Show opposite mode
        sliderIcons[0].style.display = "none"; // Hide sun
        sliderIcons[1].style.display = "inline"; // Show moon
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
        modeIndicator.textContent = "Dark Mode"; // Show opposite mode
        sliderIcons[0].style.display = "inline"; // Show sun
        sliderIcons[1].style.display = "none"; // Hide moon
    }
});

// Testimonials Array
const testimonials = [
    { text: "Pratik is a talented developer with a keen eye for design!", author: "Suman Basnet" },
    { text: "His work is always top-notch and delivered on time.", author: "Alisha Rai" },
    { text: "Great experience working with Pratik!", author: "Ramesh Karki" }
  ];
  
  // Get Elements
  let currentTestimonial = 0;
  const testimonialText = document.getElementById("testimonial-text");
  const testimonialAuthor = document.getElementById("testimonial-author");
  const nextTestimonialBtn = document.getElementById("next-testimonial");
  const controlButton = document.getElementById("testimonial-control");
  
  let autoScrollInterval;
  let isAutoScrolling = true;
  
  // Function to show next testimonial
  function showNextTestimonial() {
      nextTestimonialBtn.disabled = true; // Disable button to prevent spam clicks
      testimonialText.style.opacity = 0; // Fade out effect
      
      setTimeout(() => {
          currentTestimonial = (currentTestimonial + 1) % testimonials.length;
          testimonialText.textContent = `"${testimonials[currentTestimonial].text}"`;
          testimonialAuthor.textContent = `- ${testimonials[currentTestimonial].author}`;
          testimonialText.style.opacity = 1; // Fade in effect
          nextTestimonialBtn.disabled = false; // Re-enable button
      }, 300); // Delay to match fade animation
  }
  
  // Start auto-scrolling every 5 seconds
  function startAutoScrolling() {
      autoScrollInterval = setInterval(showNextTestimonial, 5000);
  }
  
  // Stop auto-scrolling
  function stopAutoScrolling() {
      clearInterval(autoScrollInterval);
  }
  
  // Toggle pause/play functionality
  controlButton.addEventListener("click", () => {
      if (isAutoScrolling) {
          stopAutoScrolling();
          controlButton.textContent = "Play";
      } else {
          startAutoScrolling();
          controlButton.textContent = "Pause";
      }
      isAutoScrolling = !isAutoScrolling;
  });
  
  // Handle the next testimonial click
  nextTestimonialBtn.addEventListener("click", showNextTestimonial);
  
  // Start auto-scrolling on page load
  startAutoScrolling();
  
  // Initially show the first testimonial
  testimonialText.textContent = `"${testimonials[currentTestimonial].text}"`;
  testimonialAuthor.textContent = `- ${testimonials[currentTestimonial].author}`;
  
// Select elements
const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");
const popupMessage = document.getElementById("popup-message");

// Retrieve stored data
let likeCount = parseInt(localStorage.getItem("likeCount")) || 0;
let dislikeCount = parseInt(localStorage.getItem("dislikeCount")) || 0;
let userReaction = localStorage.getItem("userReaction");

// Update UI with stored counts
document.getElementById("like-count").textContent = likeCount;
document.getElementById("dislike-count").textContent = dislikeCount;

// Function to show popup message
function showPopup(message) {
    popupMessage.textContent = message;
    popupMessage.style.display = "block";
    setTimeout(() => {
        popupMessage.style.display = "none";
    }, 2000);
}

// Function to handle like/dislike changes
function handleReaction(reaction) {
    let message = "";

    if (reaction === "liked") {
        if (userReaction === "liked") {
            likeCount--;
            userReaction = null;
            message = "You removed your Like!";
        } else {
            likeCount++;
            if (userReaction === "disliked") dislikeCount--;
            userReaction = "liked";
            message = "You changed your vote to Like!";
        }
    } else {
        if (userReaction === "disliked") {
            dislikeCount--;
            userReaction = null;
            message = "You removed your Dislike!";
        } else {
            dislikeCount++;
            if (userReaction === "liked") likeCount--;
            userReaction = "disliked";
            message = "You changed your vote to Dislike!";
        }
    }

    // Save to localStorage
    localStorage.setItem("likeCount", likeCount);
    localStorage.setItem("dislikeCount", dislikeCount);
    localStorage.setItem("userReaction", userReaction);

    // Update UI
    document.getElementById("like-count").textContent = likeCount;
    document.getElementById("dislike-count").textContent = dislikeCount;

    // Show Popup Message
    showPopup(message);
}
// Select feedback form elements
const feedbackForm = document.getElementById("feedback-form");
const feedbackInput = document.getElementById("feedback-text");

// Function to handle feedback submission
feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const feedbackText = feedbackInput.value.trim();
    if (feedbackText !== "") {
        // Retrieve existing feedback from localStorage
        let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        
        // Add new feedback to the list
        feedbacks.push(feedbackText);
        
        // Save updated feedback list back to localStorage
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

        // Clear the feedback input
        feedbackInput.value = "";

        // Optionally, show a confirmation message
        alert("✅ Feedback submitted successfully!");
        
        // Update the admin dashboard with the new feedback
        updateAdminDashboard();
    }
});

// Like & Dislike Events
likeBtn.addEventListener("click", () => handleReaction("liked"));
dislikeBtn.addEventListener("click", () => handleReaction("disliked"));
const adminDashboard = document.getElementById("admin-dashboard");
const adminLikeCount = document.getElementById("admin-like-count");
const adminDislikeCount = document.getElementById("admin-dislike-count");
const feedbackList = document.getElementById("feedback-list");
const feedbackFilter = document.getElementById("feedback-filter");

// Toggle Admin Dashboard on Ctrl + Alt + P
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "p") {
        adminDashboard.classList.toggle("hidden");
    }
});

// Load Data into Admin Dashboard
function updateAdminDashboard() {
    adminLikeCount.textContent = localStorage.getItem("likeCount") || 0;
    adminDislikeCount.textContent = localStorage.getItem("dislikeCount") || 0;

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbackList.innerHTML = "";
    feedbacks.forEach((feedback, index) => {
        let li = document.createElement("li");
        li.textContent = feedback;
        feedbackList.appendChild(li);
    });
}

// Filter Feedback
feedbackFilter.addEventListener("change", () => {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    if (feedbackFilter.value === "latest") {
        feedbacks.reverse();
    }
    feedbackList.innerHTML = "";
    feedbacks.forEach((feedback) => {
        let li = document.createElement("li");
        li.textContent = feedback;
        feedbackList.appendChild(li);
    });
});

// Update Dashboard on Load
updateAdminDashboard();

// Select the scroll progress bar element
const progressBar = document.getElementById("scroll-progress-bar");

// Function to update the progress bar
function updateScrollProgress() {
    // Calculate the percentage of page scrolled
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / documentHeight) * 100;

    // Update the width of the progress bar
    progressBar.style.width = `${scrollPercentage}%`;
}

// Event listener to update progress on scroll
window.addEventListener("scroll", updateScrollProgress);

// Initialize the progress bar on page load
window.addEventListener("load", updateScrollProgress);

// Lazy Load Images Script (if native lazy loading is not enough)
const lazyImages = document.querySelectorAll("img.lazy");

const lazyLoad = () => {
  const windowHeight = window.innerHeight;
  lazyImages.forEach((img) => {
    const rect = img.getBoundingClientRect();
    if (rect.top <= windowHeight) {
      img.src = img.dataset.src; // Set src to data-src
      img.classList.remove("lazy");
    }
  });
};

window.addEventListener("scroll", lazyLoad);
window.addEventListener("load", lazyLoad);  // Initial load
// Scroll to Top Button Functionality
const scrollToTopButton = document.getElementById('scroll-to-top');

// Show the button when scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {  // Show button after scrolling 200px
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Scroll to the top when the button is clicked
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll to the top
    });
});
