# Hindu Calendar Enhancement - Visual Guide

## What You'll See

### 📅 Calendar View
Each day in the calendar now displays:

```
┌─────────────────┐
│       15        │  ← Date number
│   Purnima       │  ← Tithi (purple)
│   Rohini        │  ← Nakshatra (italic)
│     • •         │  ← Festival dots (if any)
└─────────────────┘
```

### 🔍 Click Any Date Modal

When you click on any date, you'll see:

```
╔════════════════════════════════════╗
║  January 15, 2025                  ║
╠════════════════════════════════════╣
║                                     ║
║  🕉️ Hindu Calendar (Panchang)      ║
║  ┌─────────────────────────────┐  ║
║  │ Tithi: Purnima              │  ║
║  │ Nakshatra: Rohini           │  ║
║  │ Vara (Day): Wednesday       │  ║
║  │ Paksha: Shukla Paksha      │  ║
║  └─────────────────────────────┘  ║
║                                     ║
║  🎉 Festivals                       ║
║  ┌─────────────────────────────┐  ║
║  │ Thai Pongal                 │  ║
║  │ Harvest festival...         │  ║
║  └─────────────────────────────┘  ║
║                                     ║
║          [Close]                    ║
╚════════════════════════════════════╝
```

## Panchang Elements Explained

### 📖 Tithi (Lunar Day)
- 30 tithis in a lunar month
- Examples: Pratipada, Ekadashi, Purnima (Full Moon), Amavasya (New Moon)
- Determines festival dates

### ⭐ Nakshatra (Lunar Mansion)
- 27 nakshatras in Hindu astrology
- Examples: Ashwini, Rohini, Krittika
- Used for muhurat (auspicious timing)

### 📅 Vara (Day of Week)
- Sunday through Saturday
- Each day has planetary significance

### 🌙 Paksha (Lunar Fortnight)
- **Shukla Paksha**: Waxing moon (bright half)
- **Krishna Paksha**: Waning moon (dark half)
- Each paksha has 15 tithis

## Use Cases

### 1. Festival Context
"Why is Diwali on different dates each year?"
→ See it always falls on Amavasya (New Moon) in Kartik month

### 2. Auspicious Days
"When is the next Ekadashi?"
→ Scroll through calendar to find Ekadashi tithis

### 3. Nakshatra Tracking
"What nakshatra is today?"
→ Check today's date in the calendar

### 4. Moon Phase
"Is it waxing or waning moon?"
→ Paksha tells you (Shukla = waxing, Krishna = waning)

## Navigation

1. **Festivals Page** → Click "Calendar" view tab
2. **See month view** with Panchang on each day
3. **Click any date** to see full details
4. **Change year** using year dropdown (2020-2120)
5. **Navigate months** using Previous/Next buttons

## Color Coding

- **Purple text** → Tithi names
- **Italic purple** → Nakshatra names
- **Orange dots** → Festival indicators
- **Orange border** → Days with festivals
- **Yellow highlight** → Today's date

## Mobile Responsive

Works perfectly on:
- 📱 Mobile phones (compact view)
- 💻 Tablets (medium grid)
- 🖥️ Desktop (full details)

## Technical Note

Currently using **calculated approximations** for Panchang data.
For precise, location-specific calculations, the infrastructure
is ready to integrate with Prokerala API (requires API credentials).
