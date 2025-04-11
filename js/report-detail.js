document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();
    
    // Get DOM elements
    const backButton = document.getElementById('back-button');
    const updateReportBtn = document.querySelector('.report-actions .btn-secondary');
    const shareReportBtn = document.querySelector('.report-actions .btn-primary');
    const similarReportItems = document.querySelectorAll('.similar-report-item');
    
    // Get report ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const reportId = urlParams.get('id') || '1'; // Default to 1 if not specified
    
    // Handle back button click
    backButton.addEventListener('click', function() {
        window.history.back();
    });
    
    // Load report data based on ID
    loadReportData(reportId);
    
    // Handle update report button
    updateReportBtn.addEventListener('click', function() {
        console.log('Update report clicked');
        alert('This would open a form to update the report status. This is a simulation.');
    });
    
    // Handle share report button
    shareReportBtn.addEventListener('click', function() {
        console.log('Share report clicked');
        
        // Create share data
        const shareData = {
            title: 'Civisto Report: Broken Streetlight',
            text: 'Check out this community report on Civisto',
            url: window.location.href
        };
        
        // Check if Web Share API is supported
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.log('Error sharing:', error));
        } else {
            alert('Share feature is not supported in your browser. This is a simulation.');
        }
    });
    
    // Handle similar report item clicks
    similarReportItems.forEach(item => {
        item.addEventListener('click', function() {
            const reportTitle = this.querySelector('h4').textContent;
            console.log('Similar report clicked:', reportTitle);
            
            // In a real app, this would navigate to the specific report
            // For demo, just reload the current page
            alert(`This would navigate to the "${reportTitle}" report detail page. This is a simulation.`);
        });
    });
    
    // Function to load report data based on ID
    function loadReportData(id) {
        console.log('Loading report data for ID:', id);
        
        // In a real app, this would fetch data from an API
        // For demo purposes, we'll use hardcoded data based on ID
        
        // Simulate API call delay
        setTimeout(() => {
            // Update UI based on report ID if needed
            // This is just for demonstration - in a real app, you would update all fields
            
            if (id === '2') {
                // Update for the Abandoned Trolley report
                document.querySelector('.report-title-section h1').textContent = 'Abandoned Trolley';
                document.querySelector('.status-banner').className = 'status-banner green';
                document.querySelector('.status-icon i').setAttribute('data-feather', 'check');
                document.querySelector('.status-text h3').textContent = 'Resolved';
                document.querySelector('.report-meta-item:nth-child(1) span').textContent = 'Götgatan 14, Stockholm';
                document.querySelector('.report-meta-item:nth-child(3) span').textContent = 'Retail';
                document.querySelector('.report-description-card p').textContent = 
                    'Shopping cart abandoned on the sidewalk outside the grocery store. It\'s blocking part of the pedestrian path.';
                
                // Update timeline
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach(item => item.classList.add('completed'));
                timelineItems[timelineItems.length - 1].classList.remove('active');
                
                // Refresh Feather icons
                feather.replace();
            }
        }, 300);
    }
    
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');
    
    // Add click event listener to each nav item
    /*navItems.forEach(item => {
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
    });*/
});
