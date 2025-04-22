document.addEventListener("DOMContentLoaded", () => {
  // Initialize all animations and interactive features
  initScrollAnimations()
  initParallaxEffect()
  init3DCardEffect()
  initSkillCircles()
  initCustomCursor()
  initTimelineAnimations()
  initFloatingElements()
  initWaveBackground()
  initCounters()
  initMagneticButtons()
  initImageReveal()
})

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  // Add animation classes to elements
  document.querySelectorAll(".section-title").forEach((el) => el.classList.add("fade-in-up"))
  document.querySelectorAll(".section-subtitle").forEach((el) => el.classList.add("fade-in-up"))
  document.querySelectorAll(".skill-card").forEach((el) => el.classList.add("scale-in"))
  document.querySelectorAll(".timeline-item:nth-child(odd)").forEach((el) => el.classList.add("fade-in-left"))
  document.querySelectorAll(".timeline-item:nth-child(even)").forEach((el) => el.classList.add("fade-in-right"))
  document.querySelectorAll(".project-card").forEach((el) => el.classList.add("fade-in-up"))
  document.querySelectorAll(".contact-form").forEach((el) => el.classList.add("fade-in-up"))
  document.querySelectorAll(".contact-info").forEach((el) => el.classList.add("fade-in-left"))
  document.querySelectorAll(".faq-item").forEach((el) => el.classList.add("fade-in-up"))

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
  }

  // Function to handle scroll animations
  function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-in")

    animatedElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("visible")
      }
    })
  }

  // Initial check and scroll event listener
  handleScrollAnimations()
  window.addEventListener("scroll", handleScrollAnimations)
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
  // Add parallax effect to hero and about sections
  const heroSection = document.querySelector(".hero")
  const aboutSection = document.querySelector(".about")

  if (heroSection) {
    heroSection.classList.add("parallax-section")
    const heroContent = heroSection.querySelector(".hero-content")
    if (heroContent) {
      heroContent.classList.add("parallax-content")
    }

    // Create parallax background
    const parallaxBg = document.createElement("div")
    parallaxBg.className = "parallax-bg"
    parallaxBg.style.backgroundImage =
      "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)"
    heroSection.prepend(parallaxBg)
  }

  if (aboutSection) {
    aboutSection.classList.add("parallax-section")
    const aboutContent = aboutSection.querySelector(".about-content")
    if (aboutContent) {
      aboutContent.classList.add("parallax-content")
    }

    // Create parallax background
    const parallaxBg = document.createElement("div")
    parallaxBg.className = "parallax-bg"
    parallaxBg.style.backgroundImage =
      "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)"
    aboutSection.prepend(parallaxBg)
  }

  // Parallax scroll effect
  window.addEventListener("scroll", () => {
    const parallaxElements = document.querySelectorAll(".parallax-bg")
    parallaxElements.forEach((element) => {
      const scrollPosition = window.pageYOffset
      const parentOffset = element.parentElement.offsetTop
      const distance = (parentOffset - scrollPosition) * 0.5
      element.style.transform = `translateY(${distance}px)`
    })
  })
}

// ===== 3D CARD EFFECT =====
function init3DCardEffect() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    // Wrap card in 3D container
    const cardParent = card.parentElement
    const cardWrapper = document.createElement("div")
    cardWrapper.className = "card-3d"

    // Insert wrapper before the card
    cardParent.insertBefore(cardWrapper, card)

    // Move card into wrapper
    cardWrapper.appendChild(card)

    // Add inner container class
    card.classList.add("card-3d-inner")

    // Add shine effect div
    const shine = document.createElement("div")
    shine.className = "shine"
    card.appendChild(shine)

    // Add event listeners
    card.addEventListener("mousemove", handleTilt)
    card.addEventListener("mouseleave", resetTilt)
  })

  function handleTilt(e) {
    
    const cardRect = this.getBoundingClientRect()
    const cardWidth = cardRect.width
    const cardHeight = cardRect.height

    // Calculate mouse position relative to card center
    const mouseX = e.clientX - cardRect.left
    const mouseY = e.clientY - cardRect.top

    // Calculate rotation (max 10 degrees)
    const rotateY = (mouseX / cardWidth - 0.5) * 10
    const rotateX = (0.5 - mouseY / cardHeight) * 10

    // Apply transform
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

    // Update shine position
    const shine = this.querySelector(".shine")
    if (shine) {
      const shineX = (mouseX / cardWidth) * 100
      const shineY = (mouseY / cardHeight) * 100
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`
      shine.style.opacity = "1"
    }
  }

  function resetTilt() {
    this.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
    const shine = this.querySelector(".shine")
    if (shine) {
      shine.style.opacity = "0"
    }
  }
}

// ===== SKILL CIRCLES =====
function initSkillCircles() {
  const skillCards = document.querySelectorAll(".skill-card")

  skillCards.forEach((card) => {
    // Get skill data
    const progressBar = card.querySelector(".progress-bar")
    if (!progressBar) return

    const progressValue = card.querySelector(".progress-value")
    if (!progressValue) return

    const percentage = Number.parseInt(progressValue.style.width) || 0

    // Create skill circle
    const skillCircle = document.createElement("div")
    skillCircle.className = "skill-circle"
    skillCircle.dataset.percentage = percentage

    // Create SVG
    skillCircle.innerHTML = `
      <svg viewBox="0 0 100 100">
        <circle class="background" cx="50" cy="50" r="45" stroke-width="8"></circle>
        <circle class="progress" cx="50" cy="50" r="45" stroke-width="8"></circle>
      </svg>
      <div class="percentage">${percentage}%</div>
    `

    // Replace progress bar with skill circle
    progressBar.parentElement.replaceChild(skillCircle, progressBar)
  })

  // Animate skill circles on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const circle = entry.target
          const progress = circle.querySelector(".progress")
          const percentage = Number.parseInt(circle.dataset.percentage)
          const circumference = 2 * Math.PI * 45
          const offset = circumference - (percentage / 100) * circumference

          setTimeout(() => {
            progress.style.strokeDasharray = `${circumference}`
            progress.style.strokeDashoffset = `${offset}`
          }, 200)

          observer.unobserve(circle)
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll(".skill-circle").forEach((circle) => {
    observer.observe(circle)
  })
}



// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  // Check if we're on mobile
  if (window.innerWidth <= 768) return

  // Add custom cursor class to body
  document.body.classList.add("cursor-custom")

  // Create cursor elements
  const cursorDot = document.createElement("div")
  cursorDot.className = "cursor-dot"
  document.body.appendChild(cursorDot)

  const cursorOutline = document.createElement("div")
  cursorOutline.className = "cursor-outline"
  document.body.appendChild(cursorOutline)

  // Update cursor position
  document.addEventListener("mousemove", (e) => {
    cursorDot.style.left = `${e.clientX}px`
    cursorDot.style.top = `${e.clientY}px`

    // Add a slight delay to the outline for a trailing effect
    setTimeout(() => {
      cursorOutline.style.left = `${e.clientX}px`
      cursorOutline.style.top = `${e.clientY}px`
    }, 50)
  })

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .project-card, .skill-card, .timeline-item, .faq-question",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorOutline.classList.add("cursor-hover")
    })

    element.addEventListener("mouseleave", () => {
      cursorOutline.classList.remove("cursor-hover")
    })
  })

  // Hide cursor when leaving the window
  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) {
      cursorDot.style.opacity = "0"
      cursorOutline.style.opacity = "0"
    }
  })

  document.addEventListener("mouseover", () => {
    cursorDot.style.opacity = "1"
    cursorOutline.style.opacity = "1"
  })
}

// ===== TIMELINE ANIMATIONS =====
function initTimelineAnimations() {
  // No additional JavaScript needed for timeline animations
  // The CSS handles the hover effects
}



// ===== FLOATING ELEMENTS =====
function initFloatingElements() {
  // Add floating animation to various elements
  document.querySelectorAll(".tech-badge").forEach((el, index) => {
    el.classList.add("float-animation", `float-animation-delay-${(index % 3) + 1}`)
  })

  const profileImg = document.querySelector(".profile-img")
  if (profileImg) {
    profileImg.classList.add("float-animation")
  }

  document.querySelectorAll(".social-link").forEach((el, index) => {
    el.classList.add("float-animation", `float-animation-delay-${(index % 3) + 1}`)
  })
}

// ===== WAVE BACKGROUND =====
function initWaveBackground() {
  // Add wave background to sections
  const sections = [
    document.querySelector(".about"),
    document.querySelector(".skills"),
    document.querySelector(".contact"),
    document.querySelector(".projects"),
    document.querySelector(".testimonials"),
    document.querySelector(".faq"),
    
  ]

  sections.forEach((section) => {
    if (section) {
      section.classList.add("wave-container")

      // Create waves
      for (let i = 0; i < 3; i++) {
        const wave = document.createElement("div")
        wave.className = "wave"
        section.appendChild(wave)
      }
    }
  })
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
  // Add counters to the about section
  const aboutSection = document.querySelector(".about")
  if (!aboutSection) return

  // Create counter container
  const counterContainer = document.createElement("div")
  counterContainer.className = "counter-container"
  counterContainer.style.display = "flex"
  counterContainer.style.justifyContent = "space-around"
  counterContainer.style.flexWrap = "wrap"
  counterContainer.style.marginTop = "3rem"

  // Add counters
  counterContainer.innerHTML = `
    <div class="counter-item">
      <div class="counter" data-target="2">0</div>
      <div class="counter-label">Projects Completed</div>
    </div>
    <div class="counter-item">
      <div class="counter" data-target="8">0</div>
      <div class="counter-label">Happy Clients</div>
    </div>
    <div class="counter-item">
      <div class="counter" data-target="480">0</div>
      <div class="counter-label">Hours of Coding</div>
    </div>
  `

  // Insert after the about-content
  const aboutContent = aboutSection.querySelector(".about-content")
  if (aboutContent) {
    aboutContent.after(counterContainer)
  } else {
    aboutSection.appendChild(counterContainer)
  }

  // Animate counters on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.getAttribute("data-target"))
          const duration = 2000 // 2 seconds
          const step = Math.ceil(target / (duration / 16)) // 60fps

          let count = 0
          const updateCounter = () => {
            count += step
            if (count < target) {
              counter.textContent = count
              requestAnimationFrame(updateCounter)
            } else {
              counter.textContent = target
            }
          }

          updateCounter()
          observer.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".counter").forEach((counter) => {
    observer.observe(counter)
  })
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate distance from center
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate magnetic pull (max 10px)
      const maxPull = 10
      const pullX = ((x - centerX) / centerX) * maxPull
      const pullY = ((y - centerY) / centerY) * maxPull

      this.style.transform = `translate(${pullX}px, ${pullY}px)`
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translate(0px, 0px)"
    })
  })
}

// ===== IMAGE REVEAL =====
function initImageReveal() {
  const projectImages = document.querySelectorAll(".project-img-container")

  projectImages.forEach((container) => {
    container.classList.add("image-reveal")
  })

  // Trigger animation when scrolled into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  projectImages.forEach((image) => {
    observer.observe(image)
  })
}
