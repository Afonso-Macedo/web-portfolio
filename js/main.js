// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply glass effect to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('glass-effect');
    }
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(function() {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
    }
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Scroll to sections when clicking on nav links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.section-header, .about-content, .timeline-item, .education-card, .skill-item, .contact-item');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .section-header, .about-content, .timeline-item, .education-card, .skill-item, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .toggle .line2 {
            opacity: 0;
        }
        
        .toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    
    document.head.appendChild(style);
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Normally, you would send this data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submission:', { name, email, subject, message });
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for contacting me. I'll get back to you soon.</p>
            `;
            
            // Add CSS for success message
            const successStyle = document.createElement('style');
            successStyle.textContent = `
                .form-success {
                    background-color: rgba(16, 185, 129, 0.1);
                    border: 1px solid #10b981;
                    border-radius: 10px;
                    padding: 2rem;
                    text-align: center;
                    animation: fadeIn 0.5s ease forwards;
                }
                
                .form-success i {
                    font-size: 3rem;
                    color: #10b981;
                    margin-bottom: 1rem;
                }
                
                .form-success h3 {
                    color: #10b981;
                    margin-bottom: 0.5rem;
                }
                
                .form-success p {
                    color: var(--gray-color);
                }
            `;
            
            document.head.appendChild(successStyle);
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        });
    }
    
    // Create and add data animation delay for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Create and add data animation delay for education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Create and add data animation delay for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            header.style.height = '60px';
        } else {
            header.style.boxShadow = '0 5px 20px rgba(17, 24, 39, 0.05)';
            header.style.height = '70px';
        }
        
        lastScrollY = currentScrollY;
    });
});

// Preload animations
window.addEventListener('load', () => {
    // Add a class to body when page is loaded
    document.body.classList.add('loaded');
    
    // Animate skill bars after page load
    const skillBars = document.querySelectorAll('.skill-progress');
    
    setTimeout(() => {
        skillBars.forEach(bar => {
            bar.style.width = bar.parentElement.parentElement.dataset.progress || bar.style.width;
        });
    }, 1000);
});
