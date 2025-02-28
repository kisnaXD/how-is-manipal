document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.navbar-logo');
    logo.addEventListener('click', () => {
        window.location.href = 'landing.html';
    })
    const dropdownContainer = document.querySelector('.dropdown-container');
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdown = document.querySelector('.dropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item a');
    let hideTimeout;

    dropdownButton.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdownContainer.classList.toggle('active');
        dropdown.classList.toggle('open');
        adjustDropdownWidth();
    });

    document.addEventListener('click', function (event) {
        if (!dropdownContainer.contains(event.target)) {
            closeDropdown();
        }
    });

    dropdownContainer.addEventListener('mouseleave', function () {
        hideTimeout = setTimeout(closeDropdown, 300);
    });

    dropdownContainer.addEventListener('mouseenter', function () {
        clearTimeout(hideTimeout);
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            dropdownButton.innerHTML = `${this.innerText} <i class="fas fa-caret-down"></i>`;
            closeDropdown();
        });
    });

    function closeDropdown() {
        dropdown.classList.remove('open');
        dropdownContainer.classList.remove('active');
    }

    function adjustDropdownWidth() {
        dropdown.style.minWidth = `${dropdownButton.offsetWidth}px`;
    }

    adjustDropdownWidth();
    window.addEventListener('resize', adjustDropdownWidth);
    const container = document.getElementById('weather-container');
    const githubBut = document.getElementById('navbar-socials-1');
    githubBut.addEventListener('click', () => {
        window.location.href = 'https://github.com/kisnaXD';
    })
    const twitterBut = document.getElementById('navbar-socials-2');
    twitterBut.addEventListener('click', () => {
        window.location.href = 'https://x.com/KrishnaGera4';
    })
    const linkedinBut = document.getElementById('navbar-socials-3');
    linkedinBut.addEventListener('click', () => {
        window.location.href = 'https://www.linkedin.com/in/krishna-gera';
    })
    const instaBut = document.getElementById('navbar-socials-4');
    instaBut.addEventListener('click', () => {
        window.location.href = 'https://www.instagram.com/krishnag_26';
    })
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    createWindLines();
    
    function createWindLines() {
        // Create enough wind lines to ensure good coverage
        for (let i = 0; i < 15; i++) {
            const top = Math.random() * windowHeight;
            const left = Math.random() * (windowWidth * 1.5); // some beyond right edge
            createWindLine(top, left);
        }
    }
    
    function createWindLine(topPosition, leftPosition) {
        const windLine = document.createElement('div');
        windLine.className = 'wind-line';
        
        // Wind line size
        const width = 100 + Math.random() * 150;
        
        windLine.style.width = `${width}px`;
        windLine.style.top = `${topPosition}px`;
        windLine.style.left = `${leftPosition}px`;
        
        container.appendChild(windLine);
        
        // Animate wind line
        const speed = 4 + Math.random() * 3; // faster movement for wind lines
        animateWindLine(windLine, speed);
    }
    
    function animateWindLine(windLine, durationSeconds) {
        const startTime = performance.now();
        const startLeft = parseFloat(windLine.style.left);
        const width = parseFloat(windLine.style.width);
        const distance = windowWidth + width * 2; // distance to travel
        const duration = durationSeconds * 1000; // convert to milliseconds
        
        function step(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const currentLeft = startLeft - (progress * distance);
                windLine.style.left = `${currentLeft}px`;
                requestAnimationFrame(step);
            } else {
                // Reset position immediately when out of view
                // Create a new wind line that starts just off the right edge
                const top = Math.random() * windowHeight;
                windLine.style.left = `${windowWidth + 10}px`;
                windLine.style.top = `${top}px`;
                
                // Start animation again
                animateWindLine(windLine, 4 + Math.random() * 3);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        
        // Clear and recreate all elements
        container.innerHTML = '';
        createWindLines();
    });
    const bigBox = document.getElementById('bigBox');
    const showMore = document.getElementById('showMore');
    let rowsVisible = 2;

    function generateRows(rows) {
        const boxesPerRow = 3; /* This is the base number for generation */
        for (let i = 0; i < rows * boxesPerRow; i++) {
            const smallBox = document.createElement('div');
            smallBox.className = 'small-box';
            bigBox.appendChild(smallBox);
        }
    }

    // Initial generation of 2 rows
    generateRows(rowsVisible);

    showMore.addEventListener('click', () => {
        rowsVisible += 2;
        generateRows(2); // Add 2 more rows
    });
});