# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Iris Iványi, featuring an interactive layout with:
- Fixed centered content overlay with smooth expand/collapse animations
- Scrollable background grid of portfolio work (video and image items)
- Dynamic UI that responds to scroll position and user interaction

## Architecture

### Core Files Structure
- `index.html` - Main HTML structure with fixed overlay content and background grid
- `index.css` - Complete styling with CSS Grid layout, animations, and responsive design
- `script.js` - Interactive functionality for scroll-based animations and content toggling
- `assets/` - Media files including custom font and portfolio work samples

### Key Technical Components

**Layout System:**
- Fixed positioned `.about-wrapper` centered with transforms for main content overlay
- CSS Grid `.background-grid` for scrollable portfolio showcase
- Pointer events management to allow scroll-through on overlays while keeping buttons interactive

**Animation System:**
- CSS custom properties and cubic-bezier timing functions for smooth animations
- JavaScript-controlled height animations using `scrollHeight` measurements
- State management for expand/collapse behavior based on viewport position

**Interaction Logic (script.js):**
- Scroll detection using either `background-grid.scrollTop` or `window.pageYOffset`
- Content automatically collapses when scrolled beyond 50% viewport height
- Manual toggle override system with persistent state management
- Scroll event delegation to handle overlay interactions

## Development Notes

**Styling Approach:**
- Uses CSS Grid with explicit positioning for portfolio items
- Backdrop filter blur effects for glassmorphic UI elements
- Custom font loading with `walter-neue-variable.ttf`
- Gradient backgrounds with transform scaling and blur filters

**JavaScript Patterns:**
- Event delegation for interactive elements to prevent scroll capture
- Height calculation caching with fallback retry logic
- State tracking for manual vs automatic content expansion
- Viewport threshold-based UI state changes

**No Build Process:**
This is a static website with no build tools, package.json, or dependency management. Files are served directly as written.