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
    
    // Simulate microphone functionality
    micButton.addEventListener('click', function() {
        console.log('Microphone button clicked');
        alert('Voice recording started. This is a simulation.');
        
        // Simulate voice-to-text after 2 seconds
        setTimeout(() => {
            reportTextarea.value += (reportTextarea.value ? ' ' : '') + 'Voice transcription would appear here.';
            alert('Voice recording completed.');
        }, 2000);
    });
    
    // Simulate camera functionality
    cameraButton.addEventListener('click', function() {
        console.log('Camera button clicked');
        alert('This would open the device camera in a real implementation.');
        
        // Simulate taking a photo
        simulateImageCapture();
    });
    
    // Simulate gallery functionality
    galleryButton.addEventListener('click', function() {
        console.log('Gallery button clicked');
        alert('This would open the device gallery in a real implementation.');
        
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
            alert("Please describe the issue before sending the report.");
            return;
        }

        await ReportHandler.sendReport(description);
    });

    // Handle report submission
    sendReportBtn.addEventListener('click', function() {
        const reportText = reportTextarea.value.trim();
        
        if (!reportText) {
            alert('Please describe the issue before sending the report.');
            return;
        }
        
        console.log('Sending report:', reportText);
        alert('Report submitted successfully! This is a simulation.');
        
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
                alert('Rewards page would open here.');
            } else if (tabName === 'profile') {
                alert('Profile page would open here.');
            }
        });
    });
});
