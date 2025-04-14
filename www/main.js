document.addEventListener('DOMContentLoaded', function() {
    // Adjust sizes for bottom navigation icons
    document.querySelectorAll('.nav-item svg').forEach(icon => {
        icon.setAttribute('width', '20');
        icon.setAttribute('height', '20');
    });
    
    // Ensure award icon appears slightly larger in the navbar for emphasis
    document.querySelectorAll('[data-tab="rewards"] svg').forEach(icon => {
        icon.setAttribute('width', '22');
        icon.setAttribute('height', '22');
    });
    // Check if device is mobile or desktop and add appropriate class
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
        document.body.classList.add('desktop');
    } else {
        document.body.classList.add('mobile');
    }
    
    // Handle window resize for responsive adjustments
    window.addEventListener('resize', function() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (!isMobile) {
            document.body.classList.remove('mobile');
            document.body.classList.add('desktop');
        } else {
            document.body.classList.remove('desktop');
            document.body.classList.add('mobile');
        }
        
        // Reorganize layout if needed
        adjustLayoutForScreenSize();
    });
    
    // Initialize Feather icons
    feather.replace();
    
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');
    
    // Set home as active by default
    document.querySelector('[data-tab="home"]').classList.add('active');
    
    // Add click event listener to each nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the tab name
            const tabName = this.getAttribute('data-tab');
            
            // You can add tab switching logic here if needed
            console.log(`Switched to ${tabName} tab`);
            
            // For demonstration purposes, simulate a tab change
            simulateTabChange(tabName);
        });
    });
    
    // Function to simulate tab change (for demonstration)
    function simulateTabChange(tabName) {
        // You would typically show/hide content based on the tab
        // This is just a visual feedback for demo purposes
        const mainContent = document.querySelector('.main-content');
        
        // Add a subtle animation
        mainContent.style.opacity = '0.5';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 300);
    }
    
    // Add click handlers for action buttons
    const reportButton = document.querySelector('.btn-primary');
    reportButton.addEventListener('click', function() {
        console.log('Report Issue button clicked');
        // Add your action here
    });
    
    const scanButton = document.querySelector('.btn-secondary');
    scanButton.addEventListener('click', function() {
        console.log('Scan QR button clicked');
        // Add your action here
    });
    
    // Add click handlers for report cards
    const reportCards = document.querySelectorAll('.report-card');
    reportCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Report card clicked:', this.querySelector('h3').textContent);
            // Add your action here
        });
    });
    
    // Add click handlers for trending cards
    const trendingCards = document.querySelectorAll('.trending-card');
    trendingCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Trending card clicked:', this.querySelector('h3').textContent);
            // Add your action here
        });
    });
    
    // Add click handler for view all link
    const viewAllLink = document.querySelector('.view-all');
    viewAllLink.addEventListener('click', function() {
        console.log('View All clicked');
        // Add your action here
    });
    
    // Function to adjust layout based on screen size
    function adjustLayoutForScreenSize() {
        const mainContent = document.querySelector('.main-content');
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        
        if (!isMobile) {
            // For desktop: Rearrange grid layout if needed
            console.log('Desktop layout adjustments');
        } else {
            // For mobile: Make sure all sections display correctly
            console.log('Mobile layout adjustments');
        }
    }
    
    // Initial layout adjustment
    adjustLayoutForScreenSize();
    
    // Ensure buttons stay side by side
    function adjustButtonsForMobile() {
        const buttonContainer = document.querySelector('.action-buttons');
        const buttons = buttonContainer.querySelectorAll('.btn');
        const containerWidth = buttonContainer.offsetWidth;
        
        // Adjust text size if needed based on container width
        if (containerWidth < 250) {
            buttons.forEach(btn => {
                btn.style.fontSize = '11px';
            });
        } else {
            buttons.forEach(btn => {
                btn.style.fontSize = '';
            });
        }
    }
    
    item.addEventListener('click', function() {
        // Get the tab name
        const tabName = this.getAttribute('data-tab');
        
        // Navigate to the appropriate page
        if (tabName === 'new') {
            window.location.href = 'new-report.html';
        }
    };
    
    // Call once on load and on window resize
    adjustButtonsForMobile();
    window.addEventListener('resize', adjustButtonsForMobile);
    
    // Fix for iOS Safari bouncing effect
    document.body.addEventListener('touchmove', function(e) {
        if (document.querySelector('.app-container').scrollHeight <= document.querySelector('.app-container').clientHeight) {
            e.preventDefault();
        }
    }, { passive: false });
});
