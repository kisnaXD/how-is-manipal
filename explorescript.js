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
            Description: "Another Hostel Block primarily occupied by male seniors, sitting right beside block 18. This block is not very different from Block 18, and is equally infamous for housing all the druggies."
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

    function leaveReview(itemName, itemParent, itemType) {
        const modal = document.createElement('div');
        modal.className = 'modal-leaveReview';

        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.onclick = closeModal;

        const header = document.createElement('div');
        header.className = 'modal-header';

        const titleSection = document.createElement('div');
        const title = document.createElement('h2');
        title.classList.add('modal-title', 'review');
        title.textContent = "Review for " + itemName;

        const parentEl = document.createElement('p');
        parentEl.className = 'modal-parent';
        parentEl.textContent = itemParent;

        header.appendChild(titleSection);
        header.appendChild(parentEl);
        titleSection.appendChild(title);

        const typeEl = document.createElement('p');
        typeEl.classList.add('modal-type', 'review');
        typeEl.textContent = itemType;

        const reviewHeader = document.createElement('div');
        reviewHeader.className = 'review-header';

        const nameSection = document.createElement('div');
        nameSection.className = 'review-name-section';

        const nameHeader = document.createElement('div');
        nameHeader.className = 'review-name-header';

        const nameLabel = document.createElement('label');
        nameLabel.className = 'review-name-label';
        nameLabel.textContent = 'Name';
        nameLabel.style.fontFamily = '"Montserrat", sans-serif';
        nameLabel.style.color = '#e7e6eb';
        nameLabel.style.fontSize = '16px';

        const anonymityContainer = document.createElement('div');
        const anonymityCheckbox = document.createElement('input');
        anonymityCheckbox.type = 'checkbox';
        anonymityCheckbox.id = 'anonymity-' + itemName.replace(/\s+/g, '-');

        const anonymityLabel = document.createElement('label');
        anonymityLabel.htmlFor = anonymityCheckbox.id;
        anonymityLabel.textContent = 'Anonymous Review';
        anonymityLabel.className = 'review-anonymity-checkbox';

        anonymityContainer.appendChild(anonymityCheckbox);
        anonymityContainer.appendChild(anonymityLabel);

        const nameInput = document.createElement('input');
        nameInput.className = 'review-name-input';
        nameInput.type = 'text';
        nameInput.placeholder = 'Enter Name';
        nameInput.style.border = '2px solid #384151';
        nameInput.style.borderRadius = '10px';
        nameInput.style.backgroundColor = '#1a1a1a';
        nameInput.style.color = '#e7e6eb';
        nameInput.style.padding = '8px';
        nameInput.style.fontFamily = '"Montserrat", sans-serif';
        nameInput.style.fontSize = '16px';
        nameInput.style.height = '37.5px';

        anonymityCheckbox.addEventListener('change', () => {
            nameInput.disabled = anonymityCheckbox.checked;
        });

        nameHeader.appendChild(nameLabel);
        nameHeader.appendChild(anonymityContainer);
        nameSection.appendChild(nameHeader);
        nameSection.appendChild(nameInput);

        const ratingSection = document.createElement('div');
        ratingSection.className = 'review-rating-section';

        const ratingHeader = document.createElement('div');
        ratingHeader.className = 'review-rating-header';

        const ratingLabel = document.createElement('label');
        ratingLabel.className = 'review-rating-label';
        ratingLabel.textContent = 'Rating';
        ratingLabel.style.fontFamily = '"Montserrat", sans-serif';
        ratingLabel.style.color = '#e7e6eb';
        ratingLabel.style.fontSize = '16px';

        const ratingStars = document.createElement('div');
        ratingStars.className = 'review-rating-stars';

        let currentRating = 0;
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'review-star';
            star.textContent = '★';
            star.dataset.value = i;
            stars.push(star);
            ratingStars.appendChild(star);
        }
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const newRating = parseInt(star.dataset.value);
                animateStars(currentRating, newRating);
                currentRating = newRating; // Update current rating after animation
            });
        });

        function animateStars(oldRating, newRating) {
            const start = Math.min(oldRating, newRating);
            const end = Math.max(oldRating, newRating);
            const increasing = newRating > oldRating;

            // Update all stars up to newRating instantly to reflect the current state
            stars.forEach((s, i) => {
                if (i < newRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });

            // Animate only the stars that are changing
            for (let i = start; i < end; i++) {
                const delay = (Math.abs(i - (oldRating - 1))) * 100; // Sequential delay
                setTimeout(() => {
                    if (increasing) {
                        stars[i].classList.add('active');
                    } else {
                        stars[i].classList.remove('active');
                    }
                }, delay);
            }
        }

        ratingHeader.appendChild(ratingLabel);
        ratingSection.appendChild(ratingHeader);
        ratingSection.appendChild(ratingStars);

        reviewHeader.appendChild(nameSection);
        reviewHeader.appendChild(ratingSection);

        const descSection = document.createElement('div');
        descSection.className = 'review-desc-section';

        const descLabel = document.createElement('label');
        descLabel.className = 'review-desc-label';
        descLabel.textContent = 'Description';
        descLabel.style.fontFamily = '"Montserrat", sans-serif';
        descLabel.style.color = '#e7e6eb';
        descLabel.style.fontSize = '16px';
        descLabel.style.display = 'block';
        descLabel.style.marginBottom = '10px';

        const descCounter = document.createElement('span');
        descCounter.className = 'review-desc-counter';
        descCounter.textContent = '0/400';
        descCounter.style.position = 'absolute';
        descCounter.style.top = '5px';
        descCounter.style.right = '5px';
        descCounter.style.color = '#888';
        descCounter.style.fontFamily = '"Montserrat", sans-serif';
        descCounter.style.fontSize = '14px';

        const descInput = document.createElement('textarea');
        descInput.className = 'review-desc-input';
        descInput.placeholder = 'Enter Description';
        descInput.style.border = '2px solid #384151';
        descInput.style.borderRadius = '16px';
        descInput.style.backgroundColor = '#1a1a1a';
        descInput.style.color = '#e7e6eb';
        descInput.style.padding = '8px';
        descInput.style.fontFamily = '"Montserrat", sans-serif';
        descInput.style.fontSize = '16px';
        descInput.style.height = '187.5px';
        descInput.style.resize = 'none';
        descInput.maxLength = 400;

        descInput.addEventListener('input', () => {
            descCounter.textContent = `${descInput.value.length}/400`;
            if (descInput.value.length >= 400) {
                descCounter.style.color = '#cc3333';
            } else {
                descCounter.style.color = '#888';
            }
        });

        descSection.style.position = 'relative';
        descSection.appendChild(descLabel);
        descSection.appendChild(descCounter);
        descSection.appendChild(descInput);

        const submitButton = document.createElement('button');
        submitButton.className = 'review-submit-button';
        const spanItem = document.createElement('span');
        spanItem.textContent = 'Submit';
        const stripDiv = document.createElement('div');
        stripDiv.className = 'strip';
        submitButton.appendChild(spanItem);
        submitButton.appendChild(stripDiv);

        submitButton.addEventListener('click', () => {
            const name = nameInput.value.trim();
            const desc = descInput.value.trim();
            if (!anonymityCheckbox.checked && !name) {
                createNotification(false, '', 'Name is a Required field');
            } else if (!desc) {
                createNotification(false, '', 'Description is a Required field');
            } else if (currentRating === 0) {
                createNotification(false, '', 'Rating is a Required field');
            } else {
                const finalValue = sendReviewToDB(name, desc, currentRating);                
                if(finalValue) {
                    createNotification(true, 'Review');
                    closeModal();
                } else {
                    createNotification(false, 'Review');
                    closeModal();
                }
            }
        });

        modal.appendChild(closeButton);
        modal.appendChild(header);
        modal.appendChild(typeEl);
        modal.appendChild(reviewHeader);
        modal.appendChild(descSection);
        modal.appendChild(submitButton);

        return modal;
    }

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

        reviewButton.addEventListener('click', () => {
            const leaveReviewModal = leaveReview(item.Name, item.Parent, item.Type);
            modalOverlay.appendChild(leaveReviewModal);
            modalOverlay.style.display = 'block';

            modalOverlay.addEventListener('click', (event) => {
                if (event.target === modalOverlay) {
                    closeModal();
                }
            });
        });

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

    function createNotification(isSuccess, type = '', moreData = '') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        if (type !== 'Review' && moreData === '') {
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
        } else if (moreData !== '') {
            notification.innerHTML = `
                <span class="notification-text">${moreData}</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
                <div class="timer-bar"></div>
            `;
        } else {
            if (isSuccess) {
                notification.classList.add('success');
                notification.innerHTML = `
                    <span class="notification-text">Review Processed!</span>
                    <button class="notification-close"><i class="fas fa-times"></i></button>
                    <div class="timer-bar"></div>
                `;
            } else {
                notification.innerHTML = `
                    <span class="notification-text">Failed to leave Review</span>
                    <button class="notification-close"><i class="fas fa-times"></i></button>
                    <div class="timer-bar"></div>
                `;
            }
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
                if (selectedCategory === "Food Courts/Mess") {
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