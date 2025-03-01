document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.navbar-logo');
    logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const dropdownContainer = document.querySelector('.dropdown-container');
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdown = document.querySelector('.dropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item a');
    let hideTimeout;
    let selectedCategory = 'Categories';

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
            selectedCategory = this.innerText;
            closeDropdown();
            loadData();
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
    });
    const twitterBut = document.getElementById('navbar-socials-2');
    twitterBut.addEventListener('click', () => {
        window.location.href = 'https://x.com/KrishnaGera4';
    });
    const linkedinBut = document.getElementById('navbar-socials-3');
    linkedinBut.addEventListener('click', () => {
        window.location.href = 'https://www.linkedin.com/in/krishna-gera';
    });
    const instaBut = document.getElementById('navbar-socials-4');
    instaBut.addEventListener('click', () => {
        window.location.href = 'https://www.instagram.com/krishnag_26';
    });

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    createWindLines();

    function createWindLines() {
        for (let i = 0; i < 15; i++) {
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

    const boxData = [
        {
            Name: "Block 16",
            Parent: "MAHE",
            Type: "Boys Hostel Block",
            Image: "https://freshersmit.wordpress.com/wp-content/uploads/2015/05/rsz_hostels.jpg?w=1080",
            Description: "A Hostel Block primarily occupied by male freshers, sitting right in front of FC2, is not very different from Block 17 apart from the fact that it has a lot lesser number of single rooms"
        },
        {
            Name: "Block 17",
            Parent: "MAHE",
            Type: "Boys Hostel Block",
            Image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mithostels.jpg",
            Description: "A Hostel Block primarily occupied by male freshers, sitting right in front of FC2. The occupants here think that their night canteen is the best (they're wrong)."
        },
        {
            Name: "Block 18",
            Parent: "MAHE",
            Type: "Boys Hostel Block",
            Image: "https://via.placeholder.com/150",
            Description: "A Hostel Block primarily occupied by male seniors, this block is infamous for having all the druggies and nashedis of the campus."
        },
        {
            Name: "Block 19",
            Parent: "MAHE",
            Type: "Boys Hostel Block",
            Image: "https://via.placeholder.com/150",
            Description: "Another Hostel Block primarily occupied by male seniors, sitting right besides block 18. This block is not very different from Block 18, and is equally infamous for housing all the druggies."
        },
        {
            Name: "Block 20",
            Parent: "MAHE",
            Type: "Boys Hostel Block",
            Image: "https://via.placeholder.com/150",
            Description: "A Hostel Block primarily occupied by male seniors, is famous for all the wrong reasons. This block is the farthest from academic blocks, making living here a big hassle."
        },
        {
            Name: "FC 2",
            Parent: "The Indian Kitchen",
            Type: "Food Court / Mess",
            Image: "https://via.placeholder.com/150",
            Description: "Some call Food Court 2 the best mess/food court within the campus, while some hate it for being so far inside."
        },
        {
            Name: "FC 1",
            Parent: "The Indian Kitchen",
            Type: "Food Court / Mess",
            Image: "https://via.placeholder.com/150",
            Description: "Some call Food Court 2 the best mess/food court within the campus, while some hate it for being so far inside."
        }
    ];
    let isInitialLoad = true;
    const bigBox = document.getElementById('bigBox');
    const showMore = document.getElementById('showMore');
    const notificationContainer = document.getElementById('notification-container');
    const modalOverlay = document.getElementById('modal-overlay');
    let visibleItems = 6;
    const itemsPerLoad = 6;

    function createBox(item) {
        const smallBox = document.createElement('div');
        smallBox.className = 'small-box';

        const header = document.createElement('div');
        header.className = 'box-header';

        const titleSection = document.createElement('div');
        const title = document.createElement('h3');
        title.className = 'box-title';
        title.textContent = item.Name;
        const type = document.createElement('p');
        type.className = 'box-type';
        type.textContent = item.Type;
        titleSection.appendChild(title);
        titleSection.appendChild(type);

        const parent = document.createElement('p');
        parent.className = 'box-parent';
        parent.textContent = item.Parent;

        header.appendChild(titleSection);
        header.appendChild(parent);

        const image = document.createElement('img');
        image.className = 'box-image';
        image.src = item.Image || 'https://via.placeholder.com/150';
        image.alt = item.Name;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const reviewButton = document.createElement('button');
        reviewButton.className = 'box-button';
        const spanItem = document.createElement('span');
        spanItem.textContent = 'Leave a Review';
        const stripDiv = document.createElement('div');
        stripDiv.className = 'strip';
        reviewButton.append(spanItem);
        reviewButton.append(stripDiv);

        const readMoreButton = document.createElement('button');
        readMoreButton.className = 'box-button';
        const spanItem1 = document.createElement('span');
        spanItem1.textContent = 'Read More';
        const stripDiv1 = document.createElement('div');
        stripDiv1.className = 'strip';
        readMoreButton.append(spanItem1);
        readMoreButton.append(stripDiv1);

        readMoreButton.addEventListener('click', () => {
            showModal(item);
        });

        buttonContainer.appendChild(reviewButton);
        buttonContainer.appendChild(readMoreButton);

        smallBox.appendChild(header);
        smallBox.appendChild(image);
        smallBox.appendChild(buttonContainer);

        return smallBox;
    }

    function createNotification(isSuccess, type = '') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        if (isSuccess) {
            notification.classList.add('success');
            notification.innerHTML = `
                <span class="notification-text">Successfully loaded ${type} items</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
                <div class="timer-bar"></div>
            `;
        } else {
            notification.innerHTML = `
                <span class="notification-text">Could not load any items</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
                <div class="timer-bar"></div>
            `;
        }

        notificationContainer.appendChild(notification);

        notification.style.animation = 'slideIn 0.5s ease forwards';

        const timer = setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 4000);

        const closeButton = notification.querySelector('.notification-close');
        closeButton.onclick = () => {
            clearTimeout(timer);
            notification.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        };

        const notifications = notificationContainer.querySelectorAll('.notification');
        notifications.forEach((notif, index) => {
            notif.style.bottom = `${20 + (index * 90)}px`;
        });
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
        modalOverlay.innerHTML = '';
    }

    function createModal(name, parent, type, image2, description) {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.onclick = closeModal;

        const header = document.createElement('div');
        header.className = 'modal-header';

        const titleSection = document.createElement('div');
        const title = document.createElement('h2');
        title.className = 'modal-title';
        title.textContent = name;

        const parentEl = document.createElement('p');
        parentEl.className = 'modal-parent';
        parentEl.textContent = parent;

        header.appendChild(titleSection);
        header.appendChild(parentEl);
        titleSection.appendChild(title);

        const typeEl = document.createElement('p');
        typeEl.className = 'modal-type';
        typeEl.textContent = type;

        const imageEl = document.createElement('img');
        imageEl.className = 'modal-image';
        imageEl.src = image2;
        imageEl.alt = name;

        const descriptionEl = document.createElement('p');
        descriptionEl.className = 'modal-description';
        descriptionEl.textContent = description;

        const readReviewsButton = document.createElement('button');
        readReviewsButton.className = 'modal-button';
        const spanItem = document.createElement('span');
        spanItem.textContent = 'Read Reviews \u2192';
        const stripDiv = document.createElement('div');
        stripDiv.className = 'strip';
        readReviewsButton.append(spanItem, stripDiv);

        readReviewsButton.addEventListener('click', () => {
            console.log(`Reading reviews for ${name}`);
        });

        modal.appendChild(closeButton);
        modal.appendChild(header);
        modal.appendChild(typeEl);
        modal.appendChild(imageEl);
        modal.appendChild(descriptionEl);
        modal.appendChild(readReviewsButton);

        return modal;
    }

    function showModal(item) {
        const modal = createModal(item.Name, item.Parent, item.Type, item.Image, item.Description);
        modalOverlay.appendChild(modal);
        modalOverlay.style.display = 'block';

        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    function loadData() {
        bigBox.innerHTML = '';
        let filteredData = boxData;

        if (selectedCategory !== 'Categories') {
            filteredData = boxData.filter(item => {
                if (selectedCategory === "Food Courts/Mess'") {
                    return item.Type === "Food Court / Mess";
                }
                return item.Type === selectedCategory;
            });

            if (filteredData.length === 0) {
                filteredData = boxData;
                dropdownButton.innerHTML = `Categories <i class="fas fa-caret-down"></i>`;
                selectedCategory = 'Categories';
                createNotification(false);
            } else {
                createNotification(true, filteredData[0].Type);
            }
        } else if (!isInitialLoad) {
            createNotification(true, "all");
        }

        visibleItems = 6;
        showMore.style.display = 'flex';

        for (let i = 0; i < Math.min(visibleItems, filteredData.length); i++) {
            bigBox.appendChild(createBox(filteredData[i]));
        }

        showMore.onclick = null;
        showMore.addEventListener('click', () => {
            const nextItems = filteredData.slice(visibleItems, visibleItems + itemsPerLoad);
            nextItems.forEach(item => {
                bigBox.appendChild(createBox(item));
            });
            visibleItems += itemsPerLoad;

            if (visibleItems >= filteredData.length) {
                showMore.style.display = 'none';
            }
        });

        if (filteredData.length <= visibleItems) {
            showMore.style.display = 'none';
        }
        isInitialLoad = false;
    }

    loadData();
});