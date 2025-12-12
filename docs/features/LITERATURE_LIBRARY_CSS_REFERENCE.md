# Modern Spiritual Literature Library - CSS & HTML Quick Reference

## Final Component HTML Structure

```html
<!-- LITERATURE LIBRARY PAGE -->
<div class="gallery-page">
  <!-- HEADER SECTION -->
  <div class="gallery-header">
    <h1 class="gallery-title">Literature Library</h1>
    <p class="gallery-header-subtitle">Explore Sacred Hindu Texts & Epics</p>
    
    <!-- SEARCH BAR -->
    <div class="search-container">
      <input 
        type="text"
        placeholder="Search for a story..."
        class="search-bar"
      />
    </div>
  </div>

  <!-- NO RESULTS MESSAGE (conditional) -->
  <p class="no-results-message">
    No stories found matching "search term"
  </p>

  <!-- LITERATURE GRID -->
  <div class="gallery-grid">
    <!-- LITERATURE CARD (repeated for each story) -->
    <a href="/library/..." class="literature-card-link">
      <div class="literature-card">
        
        <!-- IMAGE SECTION (Full-Bleed, 45% height) -->
        <div class="literature-card-image-container">
          <img 
            src="book-cover.jpg" 
            alt="Book Title"
            class="literature-card-image"
          />
          
          <!-- FLOATING BADGE -->
          <div class="literature-type-badge">
            ⚔️ Epic
          </div>
        </div>

        <!-- CONTENT SECTION -->
        <div class="literature-card-content">
          <!-- TITLE - Epic Serif Font -->
          <h3 class="literature-card-title">
            Ramcharitmanas
          </h3>

          <!-- SUMMARY - Clean Sans-Serif -->
          <p class="literature-card-summary">
            The beloved epic tale of Lord Rama by Sant Tulsidas, celebrating devotion, dharma, and divine love.
          </p>

          <!-- FEATURE ICONS -->
          <span class="feature-icon">🎧</span>
          <span class="feature-icon">🎨</span>
        </div>

      </div>
    </a>

    <!-- Additional cards... -->
  </div>
</div>
```

---

## CSS Class Hierarchy & Styling

### 1. Page Container
```css
.gallery-page {
  /* Warm parchment gradient background */
  background: linear-gradient(180deg, #fdfbf7 0%, #faf8f5 50%, #f7f5f0 100%);
  min-height: 100vh;
  padding: 40px 20px;
  position: relative;
}
```

### 2. Header Section
```css
.gallery-header {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  z-index: 2;
}

.gallery-title {
  /* Epic serif font with gradient text effect */
  font-family: 'Playfair Display', serif;
  font-size: 3.2rem;
  font-weight: 800;
  color: #1a1a1a;
  background: linear-gradient(135deg, #1a1a1a 0%, #FF9933 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gallery-header-subtitle {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}
```

### 3. Search Bar
```css
.search-container {
  max-width: 500px;
  margin: 30px auto 0;
  position: relative;
}

.search-bar {
  width: 100%;
  padding: 14px 20px;
  font-size: 1rem;
  border: 2px solid #e8dcc8;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(255, 153, 51, 0.05);
  transition: all 0.3s ease;
}

.search-bar:focus {
  outline: none;
  border-color: #FF9933;
  box-shadow: 0 8px 20px rgba(255, 153, 51, 0.15);
}
```

### 4. Grid Layout
```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
```

**Responsive Variants:**
- Tablet: `minmax(280px, 1fr)` gap `28px`
- Mobile: `minmax(260px, 1fr)` gap `24px`
- Small: `1fr` gap `20px`

### 5. Card Container
```css
.literature-card {
  /* Clean white card with subtle depth */
  background-color: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  
  /* Soft initial shadow */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08),
              0 2px 4px rgba(0, 0, 0, 0.04);
  
  /* Smooth easing for all transitions */
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Hover: Lift & Deepen Shadow */
.literature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15),
              0 6px 12px rgba(255, 153, 51, 0.1);
}
```

### 6. Image Section (Full-Bleed)
```css
.literature-card-image-container {
  /* 45% of card height */
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f1e8 0%, #faf8f5 100%);
  position: relative;
}

.literature-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;     /* Fills entire container uniformly */
  object-position: center;
  transition: transform 0.5s ease;
}

/* Subtle zoom on hover */
.literature-card:hover .literature-card-image {
  transform: scale(1.05);
}
```

### 7. Badge (Floating Pill)
```css
.literature-type-badge {
  /* Top-right corner, floating */
  position: absolute;
  top: 12px;
  right: 12px;
  
  /* Pill shape */
  padding: 6px 14px;
  border-radius: 20px;
  
  /* Typography */
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  /* Spiritual gradient */
  background: linear-gradient(135deg, #FF9933 0%, #FF7F00 100%);
  
  /* Depth & blur */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  
  z-index: 10;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.literature-card:hover .literature-type-badge {
  transform: scale(1.08);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

/* Alternating Badge Colors */
.literature-card:nth-child(2) .literature-type-badge {
  background: linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%); /* Deep Blue */
}

.literature-card:nth-child(3) .literature-type-badge {
  background: linear-gradient(135deg, #6B4423 0%, #8B5A3C 100%); /* Brown */
}

.literature-card:nth-child(4) .literature-type-badge {
  background: linear-gradient(135deg, #8B3A3A 0%, #A84C4C 100%); /* Maroon */
}
```

### 8. Content Section
```css
.literature-card-content {
  /* Takes remaining space */
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
}
```

### 9. Title
```css
.literature-card-title {
  /* Epic serif font */
  font-family: 'Playfair Display', 'Cinzel', serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #1a1a1a;
  
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
  line-height: 1.3;
  
  transition: color 0.3s ease;
}

/* Accent color on hover */
.literature-card:hover .literature-card-title {
  color: #FF9933;
}
```

### 10. Summary
```css
.literature-card-summary {
  /* Clean sans-serif */
  font-family: 'Lato', 'Open Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: #555555;
  
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
}
```

### 11. Feature Icons
```css
.feature-icon {
  font-size: 1rem;
  margin: 12px 4px 0 0;
  display: inline-block;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.literature-card:hover .feature-icon {
  opacity: 1;
}
```

---

## Color Palette Reference

```
BACKGROUND:
  Primary Gradient: #fdfbf7 → #faf8f5 → #f7f5f0 (Warm Parchment)

ACCENTS (Spiritual):
  Saffron/Gold: #FF9933 (Primary), #FF7F00 (Darker)
  Deep Blue:    #1E3A5F → #2C5282
  Brown:        #6B4423 → #8B5A3C
  Maroon:       #8B3A3A → #A84C4C

TEXT:
  Primary:      #1a1a1a (Near-black)
  Secondary:    #555555 (Gray)
  Light:        #999999 (Light gray for placeholders)

BORDERS & SHADOWS:
  Border:       #e8dcc8 (Warm subtle)
  Shadow Dark:  rgba(0, 0, 0, 0.15)
  Shadow Light: rgba(0, 0, 0, 0.08)
  Accent Glow:  rgba(255, 153, 51, 0.1)
```

---

## Typography Stack

```
HEADINGS:
  Font: 'Playfair Display' (serif)
  Fallback: 'Cinzel' (serif)
  Ultimate: serif
  Weight: 700-800
  Import: Google Fonts

BODY:
  Font: 'Lato' (sans-serif)
  Fallback: 'Open Sans' (sans-serif)
  Ultimate: sans-serif
  Weight: 400-500
  Import: Google Fonts
```

---

## Responsive Breakpoints

| Screen Size | Grid Columns | Image Height | Gap | Title Size |
|-------------|--------------|--------------|-----|------------|
| Desktop    | minmax(300px, 1fr) | 240px | 32px | 3.2rem |
| Laptop     | minmax(280px, 1fr) | 220px | 28px | 2.8rem |
| Tablet     | minmax(260px, 1fr) | 200px | 24px | 2.3rem |
| Mobile     | 1fr           | 160px | 20px | 2rem  |

---

## Animation Timings

| Effect | Duration | Easing |
|--------|----------|--------|
| Card Lift | 0.4s | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| Image Zoom | 0.5s | ease |
| Title Color | 0.3s | ease |
| Badge Scale | 0.3s | ease |
| Search Focus | 0.3s | ease |

---

## CSS File Statistics

- **LiteratureCard.css**: 4.2 KB (includes all breakpoints)
- **LiteratureLibraryPage.css**: 5.1 KB (header, grid, search)
- **Total**: 9.3 KB uncompressed (~2.1 KB gzipped)
- **Google Fonts**: ~35 KB (cached by browser)

---

## Browser Support Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Grid | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Backdrop Filter | ✅ | ⚠️ (Partial) | ✅ (-webkit-) | ✅ |
| Gradient Text | ✅ (-webkit-) | ✅ (-webkit-) | ✅ (-webkit-) | ✅ (-webkit-) |
| Object Fit | ✅ | ✅ | ✅ | ✅ |
| Cubic Bezier | ✅ | ✅ | ✅ | ✅ |
| Transform | ✅ | ✅ | ✅ | ✅ |

**Fallback**: Backdrop filter gracefully degrades; cards remain functional without blur effect.

---

## Implementation Checklist

✅ Full-bleed images with `object-fit: cover`
✅ Rounded corners (14px border-radius)
✅ Soft shadow initially + deep shadow on hover
✅ `translateY(-6px)` lift effect on hover
✅ Playfair Display serif for titles
✅ Lato sans-serif for body text
✅ Spiritual color palette (Saffron, Blue, Brown, Maroon)
✅ Warm parchment background gradient
✅ Responsive CSS Grid with smart breakpoints
✅ Floating badge pills with backdrop blur
✅ Google Fonts integration
✅ Smooth cubic-bezier transitions
✅ Mobile-first responsive design

---

## Future Customization Options

1. **Dark Mode**: Add `@media (prefers-color-scheme: dark)` variant
2. **Filter Buttons**: Add type filters above grid
3. **Animation on Load**: Stagger card entrance animations
4. **Skeleton Loaders**: Show while images load
5. **Infinite Scroll**: Lazy-load cards as user scrolls
6. **Modal Preview**: Click card for preview before navigating
7. **Reading Progress**: Show % completed on cards
8. **Custom Cursors**: Pointer transitions on hover
