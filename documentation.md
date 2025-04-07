# Civisto Mobile App Documentation

## Overview

Civisto is a Progressive Web App (PWA) that enables users to report community issues, track their impact, and engage with local problem-solving. The application features a modern, responsive design that works across mobile and desktop devices.

## Project Structure

```
civisto-app/
├── css/
│   ├── styles.css          # Main CSS file that imports all other styles
│   ├── new-report.css      # Styles for the New Report page
│   ├── reports.css         # Styles for the Reports listing page
│   ├── report-detail.css   # Styles for the Report Detail page
│   └── responsive.css      # Additional responsive design styles
├── js/
│   ├── main.js             # Main JavaScript file with shared functionality
│   ├── new-report.js       # JavaScript for the New Report page
│   ├── reports.js          # JavaScript for the Reports listing page
│   └── report-detail.js    # JavaScript for the Report Detail page
├── images/                 # Directory for image assets
├── index.html              # Home page
├── new-report.html         # New Report page
├── reports.html            # Reports listing page
├── report-detail.html      # Report Detail page
└── test-results.html       # Test results documentation
```

## Pages and Features

### Home Page (index.html)

The Home page serves as the main dashboard for users, featuring:

- Hero section with call-to-action buttons for reporting issues
- Community impact statistics showing user's contribution
- Recent reports section with the latest user submissions
- Trending issues in the user's area

### New Report Page (new-report.html)

The New Report page allows users to submit new community issues:

- Suggested categories that dynamically highlight based on user input
- Text input area for describing the issue
- Voice-to-text functionality (simulated in current implementation)
- Image upload capability (simulated in current implementation)
- Location information with option to change
- Send button for report submission

### Reports Page (reports.html)

The Reports page displays all user reports with filtering capabilities:

- Filter tabs to view reports by status (All, Pending, In Progress, Resolved)
- Report cards showing status, category icon, title, and location
- Empty state display when no reports match the selected filter
- Clickable cards that navigate to detailed report view

### Report Detail Page (report-detail.html)

The Report Detail page shows comprehensive information about a specific report:

- Status banner indicating current report status
- Detailed report information including title, location, and category
- Report description and attached photos
- Progress timeline showing the report's status history
- Similar reports in the same area
- Action buttons for updating or sharing the report

## Responsive Design

The application is fully responsive and optimized for various screen sizes:

- Mobile view (320px - 480px): Optimized for small screens with adjusted font sizes and layouts
- Tablet view (768px - 1023px): Grid layouts for better space utilization
- Desktop view (1024px+): Multi-column layouts to maximize screen space
- Landscape orientation support for mobile devices
- Special handling for notched devices using safe area insets

## JavaScript Functionality

### Main.js

- Initializes Feather icons
- Handles responsive class adjustments based on screen size
- Manages navigation between tabs
- Provides shared functionality used across all pages

### New-report.js

- Handles category selection and highlighting
- Simulates voice-to-text functionality
- Manages image preview for uploaded photos
- Processes report submission
- Implements dynamic category suggestions based on input text

### Reports.js

- Manages filter tab selection and report filtering
- Handles empty state display when no reports match filters
- Processes navigation to report detail page when a report is clicked

### Report-detail.js

- Loads report data based on ID from URL parameters
- Handles back button navigation
- Manages update and share report functionality
- Processes similar report item clicks

## Browser Compatibility

The application has been tested and confirmed working on:

- Chrome (latest)
- Safari (latest) with specific fixes for iOS
- Firefox (latest)

## Future Enhancements

The following enhancements are recommended for future development:

1. Implement actual image upload functionality when integrated with backend
2. Add form validation for the report submission process
3. Implement actual geolocation for accurate location reporting
4. Add offline support using service workers for true PWA functionality
5. Integrate with Capacitor/Ionic for native mobile app builds

## Development Notes

- The application uses Feather Icons for consistent iconography
- Inter and Bagel Fat One fonts are used for typography
- The color scheme is based on green (#22c55e) as the primary color
- All interactive elements have hover and active states for better user feedback
- The application is designed to be accessible with appropriate contrast ratios and touch targets

## Testing

Comprehensive testing has been performed to ensure the application functions correctly across different devices and browsers. See test-results.html for detailed test results.
