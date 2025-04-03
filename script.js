// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-checkbox");
const modeIndicator = document.getElementById("mode-indicator");
const body = document.body;

// Check saved preference
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
    modeIndicator.textContent = "Light Mode"; // Update text
}

// Toggle Dark Mode
darkModeToggle.addEventListener("change", function () {
    if (darkModeToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
        modeIndicator.textContent = "Dark Mode"; // Show opposite mode
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
        modeIndicator.textContent = "Light Mode"; // Show opposite mode
    }
});

// Testimonials Section
const testimonials = [
  { text: "Pratik is a talented developer with a keen eye for design!", author: "Suman Basnet" },
  { text: "His work is always top-notch and delivered on time.", author: "Alisha Rai" },
  { text: "Great experience working with Pratik!", author: "Ramesh Karki" }
];

let currentTestimonial = 0;
const testimonialText = document.getElementById("testimonial-text");
const testimonialAuthor = document.getElementById("testimonial-author");
const nextTestimonialBtn = document.getElementById("next-testimonial");

if (nextTestimonialBtn && testimonialText && testimonialAuthor) {
  nextTestimonialBtn.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      testimonialText.textContent = `"${testimonials[currentTestimonial].text}"`;
      testimonialAuthor.textContent = `- ${testimonials[currentTestimonial].author}`;
  });
}










