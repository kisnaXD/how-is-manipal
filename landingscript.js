document.addEventListener('DOMContentLoaded', function() {
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
        for (let i = 0; i < 40; i++) {
            const top = Math.random() * windowHeight;
            const left = Math.random() * (windowWidth * 1.5);
            createWindLine(top, left);
        }
    }
    
    function createWindLine(topPosition, leftPosition) {
        const windLine = document.createElement('div');
        windLine.className = 'wind-line';
        const width = 100 + Math.random() * 150;
        
        windLine.style.width = `${width}px`;
        windLine.style.top = `${topPosition}px`;
        windLine.style.left = `${leftPosition}px`;
        
        container.appendChild(windLine);
        const speed = 4 + Math.random() * 3;
        animateWindLine(windLine, speed);
    }
    
    function animateWindLine(windLine, durationSeconds) {
        const startTime = performance.now();
        const startLeft = parseFloat(windLine.style.left);
        const width = parseFloat(windLine.style.width);
        const distance = windowWidth + width * 2; 
        const duration = durationSeconds * 1000; 
        
        function step(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const currentLeft = startLeft - (progress * distance);
                windLine.style.left = `${currentLeft}px`;
                requestAnimationFrame(step);
            } else {
                const top = Math.random() * windowHeight;
                windLine.style.left = `${windowWidth + 10}px`;
                windLine.style.top = `${top}px`;
                animateWindLine(windLine, 4 + Math.random() * 3);
            }
        }
        
        requestAnimationFrame(step);
    }
    window.addEventListener('resize', function() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        container.innerHTML = '';
        createWindLines();
    });
});