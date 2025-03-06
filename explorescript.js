document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.navbar-logo');
    logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    let i = 1;
    const filterButton = document.querySelector('.filter-button');
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
        windLine.style.width = `${100 + Math.random() * 150}px`;
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

    const bigBox = document.getElementById('bigBox');
    const showMore = document.getElementById('showMore');
    const notificationContainer = document.getElementById('notification-container');
    const modalOverlay = document.getElementById('modal-overlay');
    let visibleItems = 6;
    const itemsPerLoad = 6;
    let isInitialLoad = true;
    let selectedType = 'Categories';
    let selectedCategory = 'Type';

    loadData();

    filterButton.addEventListener('click', () => {
        const filterModal = createFilterModal();
        modalOverlay.appendChild(filterModal);
        modalOverlay.style.display = 'block';

        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    });

    function createFilterModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-filter';
    
        const closeButton = document.createElement('button'); // Changed from 'div' to 'button'
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.onclick = closeModal;
    
        // Rest of the function remains unchanged...
        const title = document.createElement('h2');
        title.className = 'filter-title';
        title.textContent = 'Filter';
    
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
    
        const leftSection = document.createElement('div');
        leftSection.className = 'filter-left-section';
    
        const categories = ['Type', 'Parent', 'Nearby'];
        const categoryDivs = {};
        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'filter-category';
            const categoryHeader = document.createElement('h3');
            categoryHeader.className = 'filter-category-header';
            categoryHeader.textContent = category;
            categoryHeader.addEventListener('click', () => {
                selectedCategory = category;
                updateOptionsVisibility();
            });
            categoryDiv.appendChild(categoryHeader);
            leftSection.appendChild(categoryDiv);
            categoryDivs[category] = categoryDiv;
            if (category === 'Type') categoryDiv.classList.add('selected');
        });
    
        const rightSection = document.createElement('div');
        rightSection.className = 'filter-right-section';
    
        const typeOptions = document.createElement('div');
        typeOptions.className = 'filter-options';
        const typeList = ['Academic Blocks', 'Restaurants', 'Professors', 'Student Clubs', 'Food Courts/Mess', 'Boys Hostel Blocks', 'Girls Hostel Blocks', 'Campus Services'];
        typeList.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'filter-option';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'filter-type';
            radio.value = option;
            radio.id = `filter-${option.replace(/\s+/g, '-')}`;
            if (selectedType === option) radio.checked = true;
            const label = document.createElement('label');
            label.htmlFor = radio.id;
            label.textContent = option;
            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            typeOptions.appendChild(optionDiv);
        });
    
        const parentOptions = document.createElement('div');
        parentOptions.className = 'filter-options';
        const parentList = ['MAHE', 'KMC', 'Outside Campus'];
        parentList.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'filter-option';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'filter-type';
            radio.value = option;
            radio.id = `filter-${option.replace(/\s+/g, '-')}`;
            if (selectedType === option) radio.checked = true;
            const label = document.createElement('label');
            label.htmlFor = radio.id;
            label.textContent = option;
            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            parentOptions.appendChild(optionDiv);
        });
    
        const nearbyOptions = document.createElement('div');
        nearbyOptions.className = 'filter-options';
        for (let i = 14; i <= 22; i++) {
            const option = `Block ${i}`;
            const optionDiv = document.createElement('div');
            optionDiv.className = 'filter-option';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'filter-type';
            radio.value = option;
            radio.id = `filter-${option.replace(/\s+/g, '-')}`;
            if (selectedType === option) radio.checked = true;
            const label = document.createElement('label');
            label.htmlFor = radio.id;
            label.textContent = option;
            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            nearbyOptions.appendChild(optionDiv);
        }
    
        rightSection.appendChild(typeOptions);
        rightSection.appendChild(parentOptions);
        rightSection.appendChild(nearbyOptions);
    
        parentOptions.classList.add('hidden');
        nearbyOptions.classList.add('hidden');
    
        function updateOptionsVisibility() {
            typeOptions.classList.add('fade-out');
            parentOptions.classList.add('fade-out');
            nearbyOptions.classList.add('fade-out');
            setTimeout(() => {
                typeOptions.classList.toggle('hidden', selectedCategory !== 'Type');
                parentOptions.classList.toggle('hidden', selectedCategory !== 'Parent');
                nearbyOptions.classList.toggle('hidden', selectedCategory !== 'Nearby');
                typeOptions.classList.toggle('fade-in', selectedCategory === 'Type');
                parentOptions.classList.toggle('fade-in', selectedCategory === 'Parent');
                nearbyOptions.classList.toggle('fade-in', selectedCategory === 'Nearby');
                categories.forEach(cat => {
                    categoryDivs[cat].classList.toggle('selected', cat === selectedCategory);
                });
            }, 300);
        }
    
        updateOptionsVisibility();
    
        filterContainer.appendChild(leftSection);
        filterContainer.appendChild(rightSection);
    
        const applyButton = document.createElement('button');
        applyButton.className = 'filter-apply-button';
        applyButton.textContent = 'Apply Filter';
        applyButton.addEventListener('click', () => {
            const selectedRadio = document.querySelector('input[name="filter-type"]:checked');
            if (selectedRadio) {
                selectedType = selectedRadio.value;
                loadData();
            }
            closeModal();
        });
    
        modal.appendChild(closeButton);
        modal.appendChild(title);
        modal.appendChild(filterContainer);
        modal.appendChild(applyButton);
    
        return modal;
    }

    async function fetchData(type) {
        try {
            let url = 'http://localhost:3000/api/items';
            if (type !== 'Categories') {
                const typeMap = {
                    'Academic Blocks': 'Academic Block',
                    'Restaurants': 'Restaurants',
                    'Professors': 'Professors',
                    'Student Clubs': 'Student Clubs',
                    'Food Courts/Mess': 'Food Court',
                    'Boys Hostel Blocks': 'Boys Hostel Block',
                    'Girls Hostel Blocks': 'Girls Hostel Block',
                    'Campus Services': 'Campus Services',
                    'MAHE': 'MAHE',
                    'KMC': 'KMC',
                    'Outside Campus': 'Outside Campus',
                    'Block 14': 'Block 14', 'Block 15': 'Block 15', 'Block 16': 'Block 16',
                    'Block 17': 'Block 17', 'Block 18': 'Block 18', 'Block 19': 'Block 19',
                    'Block 20': 'Block 20', 'Block 21': 'Block 21', 'Block 22': 'Block 22'
                };
                const mappedType = typeMap[type] || type;
                if (mappedType) {
                    url = `http://localhost:3000/api/items/type/${encodeURIComponent(mappedType)}`;
                }
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            return Array.isArray(data) ? data : [data];
        } catch (error) {
            createNotification(false, '', `No items found for "${type}"`);
            return [];
        }
    }

    function createFloatingText(text, position) {
        const textElement = document.createElement('div');
        textElement.className = 'floating-text';
        textElement.innerHTML = text.replace(
            position === 'top' ? 'Terms and Conditions' : 'Privacy Policy',
            position === 'top' 
                ? '<a href="./terms.html" class="floating-link">Terms and Conditions</a>' 
                : '<a href="./privacy.html" class="floating-link-bottom">Privacy Policy</a>'
        );
        textElement.classList.add(position === 'bottom' ? 'text-bottom' : 'text-top');
        modalOverlay.appendChild(textElement);

        const randomDuration = (8000 + Math.random() * 4000) * 2;
        animateFloatingText(textElement, randomDuration);
        return textElement;
    }

    function animateFloatingText(textElement, duration) {
        const startTime = performance.now();
        const startLeft = -400;
        const distance = windowWidth + 800;
        const durationMs = duration;

        function step(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = elapsed / durationMs;
            if (progress < 1) {
                const currentLeft = startLeft + (progress * distance);
                textElement.style.left = `${currentLeft}px`;
                requestAnimationFrame(step);
            } else {
                textElement.style.left = `${-400}px`;
                animateFloatingText(textElement, duration);
            }
        }

        requestAnimationFrame(step);
    }

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
                currentRating = newRating;
            });
        });

        function animateStars(oldRating, newRating) {
            const start = Math.min(oldRating, newRating);
            const end = Math.max(oldRating, newRating);
            const increasing = newRating > oldRating;

            stars.forEach((s, i) => {
                if (i < newRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });

            for (let i = start; i < end; i++) {
                const delay = (Math.abs(i - (oldRating - 1))) * 100;
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

        const descCounter = document.createElement('span');
        descCounter.className = 'review-desc-counter';
        descCounter.textContent = '0/400';

        const descInput = document.createElement('textarea');
        descInput.className = 'review-desc-input';
        descInput.placeholder = 'Enter Description';
        descInput.maxLength = 400;

        descInput.addEventListener('input', () => {
            descCounter.textContent = `${descInput.value.length}/400`;
            descCounter.classList.toggle('max-length', descInput.value.length >= 400);
        });

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
                const finalValue = sendReviewToDB(itemName, name, desc, currentRating, anonymityCheckbox.checked);
                if (finalValue) {
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

        const topText = createFloatingText("Go through our Terms and Conditions", 'top');
        const bottomText = createFloatingText("Read our Privacy Policy here", 'bottom');

        return modal;
    }

    async function sendReviewToDB(itemName, name, desc, rating, isAnonymous) {
        try {
            const response = await fetch('http://localhost:3000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itemName,
                    name: isAnonymous ? 'Anonymous' : name,
                    description: desc,
                    rating,
                    timestamp: new Date().toISOString()
                })
            });
            return response.ok;
        } catch (error) {
            console.error('Error submitting review:', error);
            return false;
        }
    }

    function createBox(item) {
        const smallBox = document.createElement('div');
        smallBox.className = 'small-box';

        const header = document.createElement('div');
        header.className = 'box-header';

        const titleSection = document.createElement('div');
        const title = document.createElement('h3');
        title.className = 'box-title';
        title.textContent = item.name;
        const type = document.createElement('p');
        type.className = 'box-type';
        type.textContent = item.type;
        titleSection.appendChild(title);
        titleSection.appendChild(type);

        const parent = document.createElement('p');
        parent.className = 'box-parent';
        parent.textContent = item.parent;

        header.appendChild(titleSection);
        header.appendChild(parent);

        const image = document.createElement('img');
        image.className = 'box-image';
        image.src = item.image || 'https://via.placeholder.com/150';
        image.alt = item.name;

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
            const leaveReviewModal = leaveReview(item.name, item.parent, item.type);
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
        notification.classList.add('slide-in');

        const timer = setTimeout(() => {
            notification.classList.add('slide-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 4000);

        const closeButton = notification.querySelector('.notification-close');
        closeButton.onclick = () => {
            clearTimeout(timer);
            notification.classList.add('slide-out');
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

    function createModal(name, parent, type, image, description) {
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
        imageEl.src = image;
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
        readReviewsButton.append(spanItem);
        readReviewsButton.append(stripDiv);

        modal.appendChild(closeButton);
        modal.appendChild(header);
        modal.appendChild(typeEl);
        modal.appendChild(imageEl);
        modal.appendChild(descriptionEl);
        modal.appendChild(readReviewsButton);

        return modal;
    }

    function showModal(item) {
        const modal = createModal(item.name, item.parent, item.type, item.image, item.desc);
        modalOverlay.appendChild(modal);
        modalOverlay.style.display = 'block';

        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    async function loadData() {
        bigBox.innerHTML = ''; // Clear current items
        const filteredData = await fetchData(selectedType); // Fetch based on current selectedType

        // Handle no results
        if (filteredData.length === 0 && selectedType !== 'Categories') {
            createNotification(false, '', `No items found for "${selectedType}"`);
            selectedType = 'Categories';
            loadData(); // Recursively load all items
            return; // Exit this call to avoid duplicate processing
        } else if (!isInitialLoad && filteredData.length > 0) {
            createNotification(true, selectedType === 'Categories' ? 'all' : filteredData[0].type);
        }

        visibleItems = 6; // Reset visible items
        showMore.style.display = filteredData.length > visibleItems ? 'flex' : 'none';

        // Load initial items
        for (let i = 0; i < Math.min(visibleItems, filteredData.length); i++) {
            bigBox.appendChild(createBox(filteredData[i]));
        }

        // Remove existing listener to prevent stacking
        showMore.removeEventListener('click', showMore.onclick);
        showMore.onclick = null;

        // Attach new listener with current filteredData
        showMore.addEventListener('click', async function loadMore() {
            const filteredData2 = await fetchData(selectedType); // Fetch based on current selectedType
            const nextItems = filteredData2.slice(visibleItems, visibleItems + itemsPerLoad);
            console.log(nextItems)
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
});