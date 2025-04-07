document.addEventListener('DOMContentLoaded', async function () {
    // Initialize Feather icons
    feather.replace();
    
    // Get DOM elements
    const categoryChips = document.querySelectorAll('.category-chip');
    const reportTextarea = document.querySelector('.report-textarea');
    const micButton = document.querySelector('.input-action-btn:nth-child(1)');
    const cameraButton = document.querySelector('.input-action-btn:nth-child(2)');
    const galleryButton = document.querySelector('.input-action-btn:nth-child(3)');
    const imagePreviewArea = document.querySelector('.image-preview-area');
    const imagePreview = document.getElementById('image-preview');
    const previewClose = document.querySelector('.preview-close');
    const sendReportBtn = document.querySelector('.send-report-btn');
    const locationChangeBtn = document.querySelector('.location-change-btn');
    const locationInfo = document.querySelector('.location-info span');
    const sendFeedback = document.querySelector('.send-feedback');

    // Initialize location
    try {
        await LocationHandler.initializeLocation();
        const address = await LocationHandler.getAddress(LocationHandler.currentPosition.lat, LocationHandler.currentPosition.lng);
        locationInfo.innerHTML = `Current Location: <strong>${address}</strong>`;
    } catch (error) {
        console.error("Failed to initialize location:", error);
        locationInfo.innerHTML = "Current Location: <strong>Unable to fetch location</strong>";
    }

    // Handle category selection
    categoryChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Get selected category
            const category = this.querySelector('span').textContent;
            console.log(`Category ${this.classList.contains('active') ? 'selected' : 'deselected'}: ${category}`);
            
            // If category is selected, add a tag to the textarea
            if (this.classList.contains('active') && !reportTextarea.value.includes(`#${category}`)) {
                reportTextarea.value += (reportTextarea.value ? ' ' : '') + `#${category}`;
            }
        });
    });
    
    // Remove placeholder text when user starts typing
    reportTextarea.addEventListener('input', function () {
        if (this.placeholder) {
            this.placeholder = '';
        }
    });

    // Handle microphone functionality with Speech Recognition API
    micButton.addEventListener('click', function () {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            console.error('Speech Recognition API is not supported in this browser.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onstart = function () {
            console.log('Voice recording started...');
            micButton.disabled = true; // Disable the button while recording
        };

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            console.log('Transcription:', transcript);

            // Append the transcribed text to the textarea
            reportTextarea.value = transcript;
            reportTextarea.placeholder = ''; // Clear placeholder if it exists
        };

        recognition.onerror = function (event) {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = function () {
            console.log('Voice recording ended.');
            micButton.disabled = false; // Re-enable the button
        };
    });

    // Simulate camera functionality
    cameraButton.addEventListener('click', function() {
        console.log('Camera button clicked');
        
        // Simulate taking a photo
        simulateImageCapture();
    });
    
    // Simulate gallery functionality
    galleryButton.addEventListener('click', function() {
        console.log('Gallery button clicked');
        
        // Simulate selecting an image
        simulateImageCapture();
    });
    
    // Function to simulate image capture/selection
    function simulateImageCapture() {
        // Show image preview with a placeholder image
        imagePreview.src = 'https://via.placeholder.com/300x200/22c55e/ffffff?text=Image+Preview';
        imagePreviewArea.style.display = 'block';
    }
    
    // Handle image preview close
    previewClose.addEventListener('click', function() {
        imagePreviewArea.style.display = 'none';
        imagePreview.src = '#';
    });
    
    // Handle location change
    locationChangeBtn.addEventListener('click', () => {
        const mapContainer = document.createElement('div');
        mapContainer.id = 'map';
        mapContainer.style.height = '300px';
        locationInfo.parentElement.appendChild(mapContainer);

        LocationHandler.updateMap('map', async (newPosition, newAddress) => {
            locationInfo.innerHTML = `Current Location: <strong>${newAddress}</strong>`;
        });
    });

    // Handle report submission
    sendReportBtn.addEventListener('click', async () => {
        const description = reportTextarea.value.trim();
        if (!description) {
            console.error("Please describe the issue before sending the report.");
            return;
        }

        // Show feedback GIF
        sendFeedback.style.display = 'flex';
        sendReportBtn.disabled = true;

        try {
            await ReportHandler.sendReport(description);
            console.log('Report submitted successfully!');
        } catch (error) {
            console.error("Failed to submit report:", error);
        } finally {
            // Hide feedback GIF and re-enable button
            sendFeedback.style.display = 'none';
            sendReportBtn.disabled = false;

            // Reset form
            reportTextarea.value = '';
            categoryChips.forEach(chip => chip.classList.remove('active'));
            imagePreviewArea.style.display = 'none';
        }
    });

    // Handle report submission
    sendReportBtn.addEventListener('click', function() {
        const reportText = reportTextarea.value.trim();
        
        if (!reportText) {
            console.error('Please describe the issue before sending the report.');
            return;
        }
        
        console.log('Sending report:', reportText);
        
        // Reset form
        reportTextarea.value = '';
        categoryChips.forEach(chip => chip.classList.remove('active'));
        imagePreviewArea.style.display = 'none';
        
        // Redirect to home page after submission
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
    
    // Dynamic suggestions based on input
    reportTextarea.addEventListener('input', function() {
        const text = this.value.toLowerCase();
        
        // Simple keyword matching for category suggestions
        if (text.includes('light') || text.includes('lamp') || text.includes('power')) {
            highlightCategory('Electricity');
        }
        
        if (text.includes('trash') || text.includes('waste') || text.includes('garbage')) {
            highlightCategory('Garbage');
        }
        
        if (text.includes('danger') || text.includes('unsafe') || text.includes('hazard')) {
            highlightCategory('Safety');
        }
        
        if (text.includes('car') || text.includes('parking') || text.includes('road')) {
            highlightCategory('Traffic');
        }
        
        if (text.includes('paint') || text.includes('wall') || text.includes('graffiti')) {
            highlightCategory('Graffiti');
        }
    });
    
    // Function to highlight a specific category
    function highlightCategory(categoryName) {
        categoryChips.forEach(chip => {
            if (chip.querySelector('span').textContent === categoryName && !chip.classList.contains('active')) {
                chip.classList.add('highlight');
                setTimeout(() => {
                    chip.classList.remove('highlight');
                }, 2000);
            }
        });
    }
    
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');
    
    // Add click event listener to each nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the tab name
            const tabName = this.getAttribute('data-tab');
            
            // Navigate to the appropriate page
            if (tabName === 'home') {
                window.location.href = 'index.html';
            } else if (tabName === 'reports') {
                window.location.href = 'reports.html';
            } else if (tabName === 'new') {
                window.location.href = 'new-report.html';
            } else if (tabName === 'rewards') {
                console.log('Rewards page would open here.');
            } else if (tabName === 'profile') {
                console.log('Profile page would open here.');
            }
        });
    });
});
