document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
    });

    // 2. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 3. Intersection Observer for Fade-Up Animations
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

    // 4. Animated Counters for Metrics
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    const inc = target / 50; // Speed adjustment
                    if (count < target) {
                        count += inc;
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter); // Run once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 5. Generate and Animate Skills Circular Progress
    const skills = [
        { name: "Email Management", level: 95 },
        { name: "Admin Processes", level: 90 },
        { name: "Calendar Coord", level: 95 },
        { name: "Data Accuracy", level: 98 },
        { name: "Project Mgmt", level: 85 }
    ];

    const skillsContainer = document.querySelector('.skills-flex');
    const radius = 35;
    const circumference = 2 * Math.PI * radius;

    skills.forEach((skill, index) => {
        const skillHTML = `
            <div class="skill-item fade-up delay-${index % 4}">
                <div class="skill-circle" data-level="${skill.level}">
                    <svg viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="${radius}"></circle>
                        <circle class="progress" cx="40" cy="40" r="${radius}" 
                            style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${circumference};">
                        </circle>
                    </svg>
                </div>
                <div class="skill-name playfair">${skill.name}</div>
            </div>
        `;
        skillsContainer.insertAdjacentHTML('beforeend', skillHTML);
    });

    // Animate skill circles on scroll
    const skillCircles = document.querySelectorAll('.skill-circle');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target.querySelector('.progress');
                const level = entry.target.getAttribute('data-level');
                const offset = circumference - (level / 100) * circumference;
                circle.style.strokeDashoffset = offset;
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillCircles.forEach(circle => skillObserver.observe(circle));

    // 6. Testimonial Carousel
    const testimonials = [
        {
            text: "Adaeze transformed our daily operations. Her proactive approach saved our executive team hours every week.",
            author: "— VP of Operations, TechFlow"
        },
        {
            text: "Reliable, incredibly organized, and always a step ahead. Hiring her was the best decision for my business.",
            author: "— Founder, Creative Studio Co."
        },
        {
            text: "Her attention to detail during our international project coordination was flawless. A true professional.",
            author: "— Managing Director, Global Ventures"
        }
    ];

    let currentTestimonial = 0;
    const testimonialContainer = document.getElementById('testimonial-content');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function renderTestimonial(index) {
        testimonialContainer.style.opacity = 0;
        setTimeout(() => {
            testimonialContainer.innerHTML = `
                <p class="testimonial-text playfair">"${testimonials[index].text}"</p>
                <p class="testimonial-author">${testimonials[index].author}</p>
            `;
            testimonialContainer.style.opacity = 1;
            testimonialContainer.style.transition = 'opacity 0.5s ease';
        }, 300);
    }

    renderTestimonial(currentTestimonial);

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonial(currentTestimonial);
    });

    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        renderTestimonial(currentTestimonial);
    });

    // Auto rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonial(currentTestimonial);
    }, 6000);

    // 7. Contact Form Validation & Success State
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Change button state
        submitBtn.innerText = "Sending...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        // Simulate network request
        setTimeout(() => {
            submitBtn.style.display = 'none';
            successMsg.classList.remove('hidden');
            form.reset();
        }, 1500);
    });

    // 8. Footer Year & Back to Top
    document.getElementById('year').innerText = new Date().getFullYear();
    
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});