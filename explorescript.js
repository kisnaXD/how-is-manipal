document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.navbar-logo');
    logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    const staticReviews = [
        { reviewerName: 'Alice', reviewText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam veniam placeat magni rem doloribus, reprehenderit tempora quos nihil dignissimos iure tempore recusandae delectus aliquid obcaecati aspernatur itaque nam esse laudantium.', rating: 4.5 },
        { reviewerName: 'Anonymous', reviewText: 'Decent experience, but could use more amenities.', rating: 4.5 },
        { reviewerName: 'Bob', reviewText: 'Absolutely loved it! Highly recommend to everyone.', rating: 5 },
        { reviewerName: 'Charlie', reviewText: 'It’s okay, nothing special but gets the job done.', rating: 3.5 },
        { reviewerName: 'Diana', reviewText: 'Fantastic facilities and great staff!', rating: 4.8 },
        { reviewerName: 'Eve', reviewText: 'Could be better, but overall decent.', rating: 3.8 },
        { reviewerName: 'Frank', reviewText: 'Best place I’ve stayed at in years!', rating: 5 },
        { reviewerName: 'Grace', reviewText: 'Good value for money, would return.', rating: 4.2 },
        { reviewerName: 'Hank', reviewText: 'Needs improvement in cleanliness.', rating: 3.0 },
        { reviewerName: 'Eve', reviewText: 'Could be better, but overall decent.', rating: 3.8 },
        { reviewerName: 'Frank', reviewText: 'Best place I’ve stayed at in years!', rating: 5 },
        { reviewerName: 'Grace', reviewText: 'Good value for money, would return.', rating: 4.2 },
        { reviewerName: 'Hank', reviewText: 'Needs improvement in cleanliness.', rating: 3.0 },
        { reviewerName: 'Eve', reviewText: 'Could be better, but overall decent.', rating: 3.8 },
        { reviewerName: 'Frank', reviewText: 'Best place I’ve stayed at in years!', rating: 5 },
        { reviewerName: 'Grace', reviewText: 'Good value for money, would return.', rating: 4.2 },
        { reviewerName: 'Hank', reviewText: 'Needs improvement in cleanliness.', rating: 3.0 }
    ];
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
    
        const categories = ['Type', 'Parent', 'Sort By'];
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
        const typeList = ['Academic Blocks', 'Restaurants', 'Clubs', 'Student Clubs', 'Food Courts/Mess', 'Boys Hostel Blocks', 'Girls Hostel Blocks', 'Campus Services', 'Courses', 'Events'];
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
        const parentList = ['MAHE', 'KMC', 'Independent'];
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

        const sortByOptions = document.createElement('div');
        sortByOptions.className = 'filter-options';
        const sortByList = ['Rating', 'Number of Reviews'];
        sortByList.forEach(option => {
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
            sortByOptions.appendChild(optionDiv);
        });
    
        rightSection.appendChild(typeOptions);
        rightSection.appendChild(parentOptions);
        rightSection.appendChild(sortByOptions);
    
        parentOptions.classList.add('hidden');
        sortByOptions.classList.add('hidden');
    
        function updateOptionsVisibility() {
            typeOptions.classList.add('fade-out');
            parentOptions.classList.add('fade-out');
            sortByOptions.classList.add('fade-out');
            setTimeout(() => {
                typeOptions.classList.toggle('hidden', selectedCategory !== 'Type');
                parentOptions.classList.toggle('hidden', selectedCategory !== 'Parent');
                sortByOptions.classList.toggle('hidden', selectedCategory !== 'Sort By');
                sortByOptions.classList.toggle('fade-in', selectedCategory === 'Sort By');
                typeOptions.classList.toggle('fade-in', selectedCategory === 'Type');
                parentOptions.classList.toggle('fade-in', selectedCategory === 'Parent');
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
                    'Academic Blocks': 'Academic-Block',
                    'Restaurants': 'Restaurants',
                    'Clubs': 'Clubs',
                    'Student Clubs': 'Student-Clubs',
                    'Food Courts/Mess': 'Food-Court',
                    'Boys Hostel Blocks': 'Boys-Hostel-Blocks',
                    'Girls Hostel Blocks': 'Girls-Hostel-Blocks',
                    'Campus Services': 'Campus-Services',
                    'Events' : 'Events'
                };
                console.log(type)
                const mappedType = typeMap[type] || type;
                console.log(mappedType)
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

    async function fetchRatings(type) {
        try {
            let url = `http://localhost:3000/api/ratings/rating/${encodeURIComponent(type)}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            return data;
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

    function createBox(item, rating) {
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

        const ratingElement = document.createElement('div');
        ratingElement.className = 'rating-text';
        if(rating.length === 0) {
            ratingElement.innerText = 'No Reviews Yet';
        } else {
            rating = rating[0]
            if(rating.reviews === 1) {
                ratingElement.innerText = `${rating.rating} \u2605 (${rating.reviews_no} Review)`;
            } else {
                ratingElement.innerText = `${rating.rating} \u2605 (${rating.reviews_no} Reviews)`;
            }
        }

        smallBox.appendChild(header);
        smallBox.appendChild(image);
        smallBox.appendChild(buttonContainer);
        smallBox.appendChild(ratingElement);

        return smallBox;
    }

    function createNotification(isSuccess, type = '', moreData = '') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        if (type !== 'Review' && moreData === '') {
            if (isSuccess) {
                notification.classList.add('success');
                notification.innerHTML = `
                    <span class="notification-text">Successfully loaded ${type}</span>
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
    
        readReviewsButton.addEventListener('click', () => {
            console.log('Read Reviews button clicked');
            const reviewsModal = openReviewsModal(name, 5, type, image, description);
            modalOverlay.appendChild(reviewsModal);
            console.log('Reviews modal appended to modalOverlay:', reviewsModal);
            modalOverlay.style.display = 'block'; // Show the overlay
            reviewsModal.style.display = 'flex'; // Explicitly show the modal
            console.log('modalOverlay display:', modalOverlay.style.display);
            console.log('reviewsModal display:', reviewsModal.style.display);
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
        isInitialLoad = selectedType === "Categories" ? true : false;
        // Handle no results
        if (filteredData.length === 0 && selectedType !== 'Categories') {
            selectedType = 'Categories';
            loadData(); // Recursively load all items
            return; // Exit this call to avoid duplicate processing
        } else if (!isInitialLoad && filteredData.length > 0) {
            createNotification(true, selectedType === 'Categories' ? 'all' : filteredData[0].type);
            isInitialLoad = true;
        }

        visibleItems = 6; // Reset visible items
        showMore.style.display = filteredData.length > visibleItems ? 'flex' : 'none';

        // Load initial items
        for (let i = 0; i < Math.min(visibleItems, filteredData.length); i++) {
            const rating = await fetchRatings(filteredData[i].name);
            bigBox.appendChild(createBox(filteredData[i], rating));
        }

        // Remove existing listener to prevent stacking
        showMore.removeEventListener('click', showMore.onclick);
        showMore.onclick = null;

        // Attach new listener with current filteredData
        showMore.addEventListener('click', async function loadMore() {
            const filteredData2 = await fetchData(selectedType); // Fetch based on current selectedType
            const nextItems = filteredData2.slice(visibleItems, visibleItems + itemsPerLoad);
            for(let i = 0; i<nextItems.length; i++) {
                item = nextItems[i]
                const rating = await fetchRatings(item.name);
                bigBox.appendChild(createBox(item, rating));
            };
            visibleItems += itemsPerLoad;

            if (visibleItems >= filteredData2.length) {
                showMore.style.display = 'none';
            }
        });
        isInitialLoad = false;
    }
    function openReviewsModal(itemName, rating, itemType, photoUrl, description) {
        console.log('openReviewsModal called with:', { itemName, rating, itemType, photoUrl, description });
    
        const modal = document.createElement('div');
        modal.classList.add('reviews-modal');
    
        const modalContent = document.createElement('div');
        modalContent.classList.add('reviews-modal-content');
    
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('modal-close');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', () => {
            console.log('Close button clicked');
            closeModal();
        });
    
        // Header
        const header = document.createElement('div');
        header.classList.add('reviews-header');
        header.innerHTML = `
            <h2>${itemName}</h2>
            <span class="rating">${rating}</span>
        `;
    
        // Item Type
        const type = document.createElement('div');
        type.classList.add('item-type');
        type.textContent = itemType;
    
        // Body (Photo + Description)
        const body = document.createElement('div');
        body.classList.add('reviews-body');
        body.innerHTML = `
            <img src="${photoUrl}" alt="${itemName}" class="item-photo">
            <p class="item-description">${description}</p>
        `;
    
        // Reviews Section
        const reviewsSection = document.createElement('div');
        reviewsSection.classList.add('reviews-section');
    
        const reviewsHeader = document.createElement('h3');
        reviewsHeader.textContent = 'Reviews';
        reviewsSection.appendChild(reviewsHeader);
        reviewsSection.appendChild(document.createElement('hr'));
    
        const reviewsContainer = document.createElement('div');
        reviewsContainer.classList.add('reviews-container');
    
        // Pagination Setup
        const reviewsPerPage = 7;
        let currentPage = 1;
        const totalReviews = staticReviews.length;
        const totalPages = Math.ceil(totalReviews / reviewsPerPage);
        let pageInfo = null; // Declare at function scope, initialize as null
    
        function renderReviews(page) {
            reviewsContainer.innerHTML = ''; // Clear current reviews
            const start = (page - 1) * reviewsPerPage;
            const end = Math.min(start + reviewsPerPage, totalReviews);
            const currentReviews = staticReviews.slice(start, end);
    
            currentReviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');
                reviewDiv.innerHTML = `
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAugMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABgEEBQMCB//EADIQAQABAgMGBAQFBQAAAAAAAAABAgMEEVEFEiExUpETQWGSIjJTcSNCgcHRFBVicrH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP1oBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfNddNuia65iKY5zIPocu/tiimZixbmvL81U5Q1v7xiM84otxGnH+SDujj2ttZT+LZ4a0fxLp4fEWsRTNVqqJy5x5wD1AAAAAAAAAAAAAAAAAB83blNq3VcrnKmmM5TeNxdeLub1XCj8tDf27enOixTpvVfs5CgAIy+rV2uzcprt1btUTwl8AKbA4qnF2d/lXHzU6NhO7LvzZxdEZ/BX8M/qok1QAAAAAAAAAAAAABiWQE9tic9oXOPKKYjs03R25b3MVTcy4V0/8c1UAAAAZpmaaomOcTnCtnnKXwlubuJtUR51Rn9vNUTzNUAQAAAAAAAAAAAAAAau0cN/VYeaY+eONKcqiaapiYmMucT5K1pY7Z9GKzroyoudWv3WieGxfweIsTPiWpy6qeMPDKdFRgelqxdu1ZWrdVU+kOrgdlRRMV4n4p8qI/dBnY2Em3H9RcjKaoypj01dQ9BFAAAAAAAAAAAAAACeHN44rE2sNTndq4+URzlx7+1r9yZ8KItU+WXGe4O8JarE36vmvXJn/aWPHu/Vue+Vgqu75mimZzmiJn7Jfx7v1bnvk8e79W575BVRy5ZCV8e79W575PHu/Vue+QVWQlvHvfWue+WxZ2nirXO5vxpXxIKEaeC2haxWVHyXemrz/VuIAAAAAAAAAADxxeIpwtmblXHypjWXs4O2b814rw4n4bcZZeoNO9ervVzXdmZqn15ejzZYaQAQAAAAAFGYzz4TlMaO9svGTiaJt3J/Foj3Q4L0w16qxiLd2mflnj9kFSMRMTETHKeTKKAAAAAAAAJfFVb2KvTM/nlUPncp6adeMAlM41gzjWFXu09NPY3aemnstSJTONYM41hV7tPTT2N2npp7FIlM41gzjWFXu09NPY3aemnsUiUzjWDONYVe7T009jdp6aexSJTONYM41hV7tPTT2N2npp7FIlM41gzictVZu09NPY3aemnsUjywVW9hLM/4Q92I4cmUUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=" alt="Profile" class="profile-pic">
                    <div class="review-content">
                        <div class="review-header">
                            <div class="reviewer-name">${review.reviewerName}</div>
                            <div class="review-rating">${review.rating} ★</div>
                        </div>
                        <div class="review-text">${review.reviewText}</div>
                    </div>
                `;
                reviewsContainer.appendChild(reviewDiv);
            });
    
            // Update page info only if it exists
            if (pageInfo) {
                pageInfo.textContent = `Page ${page} of ${totalPages}`;
            }
        }
    
        // Initial render
        renderReviews(currentPage);
    
        // Pagination Controls (only if > 7 reviews)
        if (totalReviews > reviewsPerPage) {
            const paginationContainer = document.createElement('div');
            paginationContainer.classList.add('pagination-container');
    
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '←'; // Left arrow
            prevButton.classList.add('pagination-button');
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderReviews(currentPage);
                    prevButton.disabled = currentPage === 1;
                    nextButton.disabled = false;
                }
            });
    
            pageInfo = document.createElement('span'); // Initialize here
            pageInfo.classList.add('page-info');
            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
            const nextButton = document.createElement('button');
            nextButton.innerHTML = '→'; // Right arrow
            nextButton.classList.add('pagination-button');
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderReviews(currentPage);
                    nextButton.disabled = currentPage === totalPages;
                    prevButton.disabled = false;
                }
            });
    
            paginationContainer.appendChild(prevButton);
            paginationContainer.appendChild(pageInfo);
            paginationContainer.appendChild(nextButton);
            reviewsSection.appendChild(paginationContainer);
        }
    
        reviewsSection.appendChild(reviewsContainer);
    
        // Append all to modal content
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(header);
        modalContent.appendChild(type);
        modalContent.appendChild(body);
        modalContent.appendChild(reviewsSection);
        modal.appendChild(modalContent);
    
        // Close when clicking outside
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                console.log('Clicked outside reviews modal');
                closeModal();
            }
        });
    
        console.log('Reviews modal created:', modal);
        return modal;
    }
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.style.display === 'block') {
            closeModal();
        }
    });
});