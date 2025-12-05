# Quick Reference: Accessing New Literature

## How to Access the New Texts

### Method 1: Through Literature Library
1. Navigate to **"Literature Library"** from the sidebar
2. Browse the grid of literature cards
3. Look for:
   - **Ramcharitmanas** - 7 Kandas (Sacred Epic by Sant Tulsidas)
   - **Rigveda** - 10 Mandalas (Oldest Sacred Scripture)
   - **Atharvaveda** - 20 Kaandas (Practical Vedic Wisdom)
   - **Yajurveda** - 2 Samhitas (Ritual and Cosmic Order)

### Method 2: Direct URLs
```
http://localhost:3000/library/ramcharitmanas
http://localhost:3000/library/rigveda
http://localhost:3000/library/atharvaveda
http://localhost:3000/library/yajurveda
```

## Navigation Flow for New Texts

### Step 1: View Epic Overview
- Click on any new text card
- Shows: Title, Author, Introduction, Section Overview
- Displays all sections (kandas/mandalas/kaandas/samhitas)

### Step 2: Choose Section
- Click "Begin Story" on the epic overview
- Shows Table of Contents with all sections
- Each section shows description and scene preview

### Step 3: Read Stories
- Click "Begin Story" on any section
- Enters Story Player Mode
- Read narratively formatted scenes with Previous/Next navigation
- Track progress with scene counter

## Content Structure

### Ramcharitmanas (7 Kandas)
- Bal Kand - Birth and Childhood (7 scenes)
- Ayodhya Kand - Exile Begins (7 scenes)
- Aranya Kand - Forest Adventures (7 scenes)
- Kishkindha Kand - Monkey Kingdom (7 scenes)
- Sundara Kand - Hanuman's Journey (7 scenes)
- Lanka Kand - The Great War (7 scenes)
- Uttar Kand - Return and Reign (7 scenes)

### Rigveda (10 Mandalas)
- Mandala 1-10: Cosmic Principles, Deities, Creation, Consciousness
- Each mandala: 10 themed scenes on Vedic wisdom

### Atharvaveda (20 Kaandas)
- Kaanda 1: Protection and Healing Foundations
- Kaanda 10: Advanced Spiritual Practice
- Kaanda 20: Ultimate Wisdom and Liberation
- Kaandas 2-19: Intermediate teachings on specific practices

### Yajurveda (2 Samhitas)
- Madhyandina Samhita: First recension (8 scenes)
- Kanva Samhita: Second recension (8 scenes)

## All 9 Available Texts

### Existing Texts
1. **Ramayana** - 7 Kandas (Valmiki's Sacred Epic)
2. **Mahabharata** - 8 Parvas (The Great War Epic)
3. **Bhagavad Gita** - 18 Chapters (Divine Wisdom)
4. **Vishnu Purana** - Sacred Creation Story
5. **Shiva Purana** - Lord Shiva's Teachings

### New Texts (Just Added!)
6. **Ramcharitmanas** - 7 Kandas (Sant Tulsidas' Devotional Epic)
7. **Rigveda** - 10 Mandalas (Ancient Vedic Hymns)
8. **Atharvaveda** - 20 Kaandas (Practical Vedic Science)
9. **Yajurveda** - 2 Samhitas (Ritual and Order)

## Features Available

✅ **Read Stories** - Narrative-formatted content with Previous/Next navigation
✅ **Section Overview** - Browse all sections before reading
✅ **Scene Descriptions** - Key scenes previewed in section cards
✅ **Search & Filter** - Find texts in the Literature Library
✅ **Multiple Sections** - Read entire epics or individual sections

## Technical Details

### Section Type Routing
- New texts automatically use the Table of Contents view
- Multi-section epics route through RamayanaTOCPage
- Single scene content uses LiteratureDetailPage

### Supported Section Names
- `kandas` - Ramayana, Ramcharitmanas
- `parvas` - Mahabharata
- `mandalas` - Rigveda
- `kaandas` - Atharvaveda
- `samhitas` - Yajurveda

### Image Placeholders
All new texts use placeholder images. To customize:
1. Update `imageUrl` in each text's index.js file
2. Images currently point to placeholder service
3. Replace with actual artwork URLs

## Next Steps for Enhancement

- [ ] Add custom artwork for each section
- [ ] Record audio narration for texts
- [ ] Implement search within texts
- [ ] Add bookmarking/favorites
- [ ] Create commentary sections
- [ ] Add Samaveda (4th Veda)
- [ ] Integrate Upanishads
- [ ] Add Sutras and other texts

## Technical Architecture

### File Structure
```
src/data/literature/
├── ramayana/              (7 kandas)
├── mahabharata/           (8 parvas)
├── ramcharitmanas/        (7 kandas) ← NEW
│   ├── bal_kand.js
│   ├── ayodhya_kand.js
│   ├── ...
│   └── index.js
├── rigveda/               (10 mandalas) ← NEW
│   ├── mandala_1.js
│   ├── mandala_2.js
│   ├── ...
│   └── index.js
├── atharvaveda/           (20 kaandas) ← NEW
│   ├── kaanda_1.js
│   ├── kaanda_10.js
│   ├── kaanda_20.js
│   └── index.js
├── yajurveda/             (2 samhitas) ← NEW
│   ├── samhita.js
│   └── index.js
├── bhagavad_gita.js
├── vishnu_purana.js
├── shiva_purana.js
└── index.js
```

### Component Flow
```
LiteratureLibraryPage
    ↓ (click card)
LiteratureDetailPage (shows intro + sections)
    ↓ (click "Begin Story")
RamayanaTOCPage (Table of Contents)
    ↓ (click section)
StoryPlayerPage (Read scenes with Previous/Next)
```
