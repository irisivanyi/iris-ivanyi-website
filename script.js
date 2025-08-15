// Portfolio Content Configuration
const portfolioContent = [
    {
        type: 'video',
        src: 'assets/work/ce-button.mp4',
        alt: 'Creative button animation',
        size: 'size-medium',
        position: { column: 1, row: 1, justify: 'start', align: 'center' }
    },
    {
        type: 'image',
        src: 'assets/work/de-art-1.jpg',
        alt: 'Digital art project',
        size: 'size-large',
        position: { column: 2, row: 1, justify: 'end', align: 'end' }
    },
    {
        type: 'image',
        src: 'assets/work/de-art-1.jpg',
        alt: 'Portfolio piece',
        size: 'size-small',
        position: { column: 1, row: 2, justify: 'center', align: 'start' }
    },
    {
        type: 'image',
        src: 'assets/work/de-art-1.jpg',
        alt: 'Design work',
        size: 'size-portrait',
        position: { column: 2, row: 2, justify: 'start', align: 'center' }
    },
    {
        type: 'placeholder',
        size: 'size-square',
        position: { column: 1, row: 3, justify: 'end', align: 'center' }
    },
    {
        type: 'placeholder',
        size: 'size-medium',
        position: { column: 2, row: 3, justify: 'start', align: 'end' }
    },
    {
        type: 'placeholder',
        size: 'size-small',
        position: { column: 1, row: 4, justify: 'center', align: 'start' }
    },
    {
        type: 'placeholder',
        size: 'size-large',
        position: { column: 2, row: 4, justify: 'end', align: 'center' }
    },
    {
        type: 'placeholder',
        size: 'size-wide',
        position: { column: 1, row: 5, justify: 'start', align: 'end' }
    },
    {
        type: 'placeholder',
        size: 'size-square',
        position: { column: 2, row: 5, justify: 'center', align: 'start' }
    }
];

// Function to generate portfolio grid
function generatePortfolioGrid() {
    const backgroundGrid = document.querySelector('.background-grid');
    if (!backgroundGrid) return;
    
    // Clear existing content (except the ::after pseudo-element)
    backgroundGrid.innerHTML = '';
    
    // Generate grid items from content array
    portfolioContent.forEach((item, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = `grid-item ${item.size}`;
        
        // Set grid positioning
        const pos = item.position;
        gridItem.style.gridColumn = `${pos.column}`;
        gridItem.style.gridRow = `${pos.row}`;
        gridItem.style.justifySelf = pos.justify;
        gridItem.style.alignSelf = pos.align;
        
        // Add content based on type
        if (item.type === 'video') {
            gridItem.classList.add('video-item');
            gridItem.innerHTML = `
                <video autoplay muted loop playsinline>
                    <source src="${item.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else if (item.type === 'image') {
            gridItem.classList.add('image-item');
            gridItem.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
        } else if (item.type === 'placeholder') {
            gridItem.classList.add('placeholder');
        }
        
        backgroundGrid.appendChild(gridItem);
    });
    
    // Add spacer element for scroll area
    const spacer = document.createElement('div');
    spacer.style.gridColumn = '1 / -1';
    spacer.style.height = '200vh';
    backgroundGrid.appendChild(spacer);
}

document.addEventListener('DOMContentLoaded', function() {
    // Generate the portfolio grid first
    generatePortfolioGrid();
    const aboutContainer = document.getElementById('about');
    const h2Content = document.querySelector('.h2-content');
    const toggleButton = document.getElementById('toggle-button');
    const aboutWrapper = document.querySelector('.about-wrapper');
    const backgroundGrid = document.querySelector('.background-grid');
    
    let isManuallyExpanded = false;
    let wasInViewport = true;
    let originalHeight = 0;


    function preventScrollCapture(element) {
        element.addEventListener('wheel', function(event) {
            // Don't prevent the default action, just make sure the event bubbles up
            // to the background grid for proper scrolling
            event.stopPropagation();
            
            // Manually trigger scroll on the background grid
            const backgroundGrid = document.querySelector('.background-grid');
            if (backgroundGrid) {
                backgroundGrid.scrollTop += event.deltaY;
            } else {
                // Fallback to window scroll
                window.scrollBy(0, event.deltaY);
            }
        });
    }

    const interactiveElements = document.querySelectorAll('.container button, .container a, .container .toggle-button');
    interactiveElements.forEach(preventScrollCapture);
    
    // Function to set the original height for smooth animations
    function setOriginalHeight() {
        // Store the original height for smooth animations
        const tempHeight = h2Content.scrollHeight;
        originalHeight = tempHeight;
        console.log('Original height set to:', originalHeight);
        
        // If the height is still 0, try again after a short delay
        if (originalHeight === 0) {
            setTimeout(() => {
                const retryHeight = h2Content.scrollHeight;
                if (retryHeight > 0) {
                    originalHeight = retryHeight;
                    console.log('Original height retry set to:', originalHeight);
                }
            }, 100);
        }
    }

    



    
    
    // Function to ensure original height is set when needed
    function ensureOriginalHeight() {
        if (originalHeight === 0) {
            // Temporarily ensure content is visible for accurate measurement
            const wasCollapsed = h2Content.classList.contains('fade-out');
            if (wasCollapsed) {
                h2Content.classList.remove('fade-out');
                h2Content.style.height = 'auto';
            }
            
            const tempHeight = h2Content.scrollHeight;
            if (tempHeight > 0) {
                originalHeight = tempHeight;
            }
            
            // Restore previous state if it was collapsed
            if (wasCollapsed) {
                h2Content.classList.add('fade-out');
                h2Content.style.height = '0px';
            }
        }
        return originalHeight;
    }
    
    // Function to check if content is in viewport
    function checkInViewport() {
        // Get the scroll position from either the background grid or window
        let scrollTop = 0;
        if (backgroundGrid) {
            scrollTop = backgroundGrid.scrollTop;
        } else {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        }
        
        // Consider it out of viewport if scrolled down more than 50% of viewport height
        const scrollThreshold = window.innerHeight * 0.5;
        const isVisible = scrollTop < scrollThreshold;
        
        console.log('Viewport check:', { 
            scrollTop,
            windowHeight: window.innerHeight, 
            threshold: scrollThreshold,
            isVisible 
        });
        return isVisible;
    }
    
    // Helper to show the toggle button as + (collapsed state)
    function showToggleButtonCollapsed() {
        toggleButton.classList.remove('expanded');
        toggleButton.classList.remove('hiding');
        toggleButton.classList.add('visible');
    }

    // Helper to hide the toggle button with animation
    function hideToggleButton(useScaleOut = false) {
        if (toggleButton.classList.contains('visible')) {
            toggleButton.classList.remove('visible');
            if (useScaleOut) {
                toggleButton.classList.add('scale-out');
                setTimeout(() => {
                    toggleButton.classList.remove('scale-out');
                }, 350); // Match the scale-out animation duration
            } else {
                toggleButton.classList.add('hiding');
                setTimeout(() => {
                    toggleButton.classList.remove('hiding');
                }, 220); // Match the .hiding transition duration
            }
        }
    }

    // Function to collapse h2 content
    function collapseContent() {
        console.log('Collapsing content');
        ensureOriginalHeight();
        let currentHeight = originalHeight;
        if (currentHeight === 0) {
            currentHeight = h2Content.scrollHeight;
            originalHeight = currentHeight;
        }
        h2Content.style.height = currentHeight + 'px';
        h2Content.offsetHeight;
        h2Content.classList.add('fade-out');
        requestAnimationFrame(() => {
            h2Content.style.height = '0px';
        });
        aboutContainer.classList.add('collapsed');
        showToggleButtonCollapsed();
    }

    // Function to expand h2 content
    function expandContent() {
        console.log('Expanding content');
        h2Content.classList.remove('fade-out');
        const height = ensureOriginalHeight();
        if (height > 0) {
            h2Content.style.height = height + 'px';
        } else {
            h2Content.style.height = 'auto';
            const recalculatedHeight = h2Content.scrollHeight;
            h2Content.style.height = recalculatedHeight + 'px';
        }
        aboutContainer.classList.remove('collapsed');
        hideToggleButton(true); // Use scale-out animation when expanding
        isManuallyExpanded = false;
    }
    
    // Function to handle scroll events
    function handleScroll() {
        const currentlyInViewport = checkInViewport();
        
        if (currentlyInViewport && !wasInViewport) {
            // Just entered viewport
            console.log('Entered viewport');
            wasInViewport = true;
            // Always return to original state when back in viewport
            expandContent();
        } else if (!currentlyInViewport && wasInViewport) {
            // Just left viewport
            console.log('Left viewport');
            wasInViewport = false;
            if (!isManuallyExpanded) {
                collapseContent();
            }
        }
    }
    
    // Function to handle toggle button click
    function handleToggleClick() {
        const isCurrentlyCollapsed = h2Content.classList.contains('fade-out');
        if (isCurrentlyCollapsed) {
            h2Content.classList.remove('fade-out');
            const height = ensureOriginalHeight();
            if (height > 0) {
                h2Content.style.height = height + 'px';
            } else {
                h2Content.style.height = 'auto';
                const recalculatedHeight = h2Content.scrollHeight;
                h2Content.style.height = recalculatedHeight + 'px';
            }
            aboutContainer.classList.remove('collapsed');
            toggleButton.classList.add('expanded');
            isManuallyExpanded = true;
        } else {
            h2Content.classList.add('fade-out');
            h2Content.style.height = '0px';
            aboutContainer.classList.add('collapsed');
            toggleButton.classList.remove('expanded');
        }
    }
    
    // Add event listeners - specifically listen to the background grid scroll events
    if (backgroundGrid) {
        backgroundGrid.addEventListener('scroll', handleScroll);
        console.log('Added scroll listener to background grid');
    }
    // Also listen to window scroll as fallback
    window.addEventListener('scroll', handleScroll);
    toggleButton.addEventListener('click', handleToggleClick);
    
    // Initial setup - set original height and check if we should start collapsed
    // Use a small delay to ensure fonts and content are fully loaded
    setTimeout(() => {
        setOriginalHeight();
        wasInViewport = checkInViewport();
        console.log('Initial viewport check:', wasInViewport);
        if (!wasInViewport && !isManuallyExpanded) {
            collapseContent();
        }
    }, 100);
});
