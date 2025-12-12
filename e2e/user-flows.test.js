const { chromium } = require('playwright');

describe('DivinePath E2E Tests', () => {
  let browser;
  let page;
  const BASE_URL = 'http://localhost:3000';

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  describe('Navigation Flow', () => {
    test('should navigate through main pages', async () => {
      // Go to home page
      await page.goto(BASE_URL);
      await page.waitForSelector('h1');
      
      const homeTitle = await page.textContent('h1');
      expect(homeTitle).toContain('Daily Devotional');

      // Navigate to Gods Gallery
      await page.click('a[href="/gods"]');
      await page.waitForSelector('.gallery-title');
      const godsTitle = await page.textContent('.gallery-title');
      expect(godsTitle).toBe('The Holy Trinity');

      // Navigate to Literature Library
      await page.click('a[href="/library"]');
      await page.waitForSelector('.gallery-title');
      const libraryTitle = await page.textContent('.gallery-title');
      expect(libraryTitle).toBe('Literature Library');

      // Navigate to Festivals
      await page.click('a[href="/festivals"]');
      await page.waitForSelector('h1');
      const festivalsTitle = await page.textContent('h1');
      expect(festivalsTitle).toContain('Hindu Festivals');
    });
  });

  describe('Gods Gallery Flow', () => {
    test('should view god details', async () => {
      await page.goto(`${BASE_URL}/gods`);
      
      // Wait for trinity cards to load
      await page.waitForSelector('.trimurti-card');
      
      // Click on Lord Brahma
      await page.click('.trimurti-card:has-text("Lord Brahma")');
      
      // Wait for detail page to load
      await page.waitForSelector('.god-detail-page');
      
      const godName = await page.textContent('.god-detail-name, h1');
      expect(godName).toContain('Brahma');
    });

    test('should navigate to all gods gallery', async () => {
      await page.goto(`${BASE_URL}/gods`);
      
      // Look for "View All" or similar button
      const viewAllButton = await page.$('text=/View All/i');
      if (viewAllButton) {
        await viewAllButton.click();
        await page.waitForSelector('.all-gods-page, .gallery-page');
      }
    });
  });

  describe('Literature Library Flow', () => {
    test('should search for literature', async () => {
      await page.goto(`${BASE_URL}/library`);
      
      // Wait for search bar
      await page.waitForSelector('.search-bar, input[placeholder*="search" i]');
      
      // Search for "Ramayana"
      await page.fill('.search-bar, input[placeholder*="search" i]', 'Ramayana');
      
      // Wait for filtered results
      await page.waitForTimeout(500);
      
      // Check if Ramayana card is visible
      const ramayanaVisible = await page.isVisible('text=/Ramayana/i');
      expect(ramayanaVisible).toBe(true);
    });

    test('should view literature details', async () => {
      await page.goto(`${BASE_URL}/library`);
      
      // Wait for literature cards
      await page.waitForSelector('.literature-card, .god-card');
      
      // Click on first literature card
      const firstCard = await page.$('.literature-card-link, a');
      if (firstCard) {
        await firstCard.click();
        
        // Wait for navigation
        await page.waitForLoadState('networkidle');
        
        // Verify we're on a detail or TOC page
        const url = page.url();
        expect(url).toContain('/library/');
      }
    });
  });

  describe('Festivals Flow', () => {
    test('should filter festivals by category', async () => {
      await page.goto(`${BASE_URL}/festivals`);
      
      // Wait for page to load
      await page.waitForSelector('.festivals-page, h1');
      
      // Look for category filter
      const categorySelect = await page.$('select[id*="category"], .filter-select:first-of-type');
      if (categorySelect) {
        await categorySelect.selectOption('Major Festival');
        await page.waitForTimeout(500);
        
        // Check if festival cards are present
        const cards = await page.$$('.festival-card');
        expect(cards.length).toBeGreaterThan(0);
      }
    });

    test('should view festival details', async () => {
      await page.goto(`${BASE_URL}/festivals`);
      
      // Wait for festival cards
      await page.waitForSelector('.festival-card');
      
      // Click "View Details" on first festival
      const viewDetailsLink = await page.$('a:has-text("View Details")');
      if (viewDetailsLink) {
        await viewDetailsLink.click();
        
        // Wait for detail page
        await page.waitForLoadState('networkidle');
        
        const url = page.url();
        expect(url).toContain('/festivals/');
      }
    });
  });

  describe('Mobile Menu Flow', () => {
    test('should open and close mobile menu', async () => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      await page.goto(BASE_URL);
      
      // Wait for hamburger menu
      await page.waitForSelector('.navbar-hamburger, button[aria-label*="menu" i]');
      
      // Click hamburger to open
      await page.click('.navbar-hamburger, button[aria-label*="menu" i]');
      
      // Wait for menu to open
      await page.waitForTimeout(300);
      
      // Check if menu is expanded
      const hamburger = await page.$('.navbar-hamburger, button[aria-label*="menu" i]');
      const ariaExpanded = await hamburger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');
      
      // Click hamburger again to close
      await page.click('.navbar-hamburger, button[aria-label*="menu" i]');
      
      await page.waitForTimeout(300);
      const ariaExpandedAfter = await hamburger.getAttribute('aria-expanded');
      expect(ariaExpandedAfter).toBe('false');
    });
  });

  describe('Search Functionality', () => {
    test('should handle empty search results', async () => {
      await page.goto(`${BASE_URL}/library`);
      
      // Wait for search bar
      await page.waitForSelector('.search-bar, input[placeholder*="search" i]');
      
      // Search for something that doesn't exist
      await page.fill('.search-bar, input[placeholder*="search" i]', 'zzzznonexistent');
      
      await page.waitForTimeout(500);
      
      // Check for no results message
      const noResults = await page.isVisible('text=/no.*found/i');
      expect(noResults).toBe(true);
    });
  });
});
