document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();
    
    // Get DOM elements
    const filterTabs = document.querySelectorAll('.filter-tab');
    const reportCards = document.querySelectorAll('.report-card');
    const emptyState = document.querySelector('.empty-state');
    const resetFilterBtn = document.querySelector('.reset-filter-btn');
    
    // Handle filter tab selection
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get selected filter
            const filter = this.getAttribute('data-filter');
            
            // Filter report cards
            filterReports(filter);
        });
    });
    
    // Function to filter reports
    function filterReports(filter) {
        let visibleCount = 0;
        
        reportCards.forEach(card => {
            const status = card.getAttribute('data-status');
            
            if (filter === 'all' || status === filter) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide empty state
        if (visibleCount === 0) {
            emptyState.style.display = 'flex';
        } else {
            emptyState.style.display = 'none';
        }
    }
    
    // Handle reset filter button
    resetFilterBtn.addEventListener('click', function() {
        // Set 'All' tab as active
        filterTabs.forEach(tab => {
            if (tab.getAttribute('data-filter') === 'all') {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Show all reports
        filterReports('all');
    });
    
    // Handle report card clicks
    reportCards.forEach(card => {
        card.addEventListener('click', function() {
            const reportId = this.getAttribute('data-id');
            
            // Navigate to report detail page
            window.location.href = `report-detail.html?id=${reportId}`;
        });
    });
    
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');
    
    // Add click event listener to each nav item
   /* navItems.forEach(item => {
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
                window.location.href = 'rewards.html';
            } else if (tabName === 'profile') {
                alert('Profile page would open here.');
            }
        });
    });*/
});
