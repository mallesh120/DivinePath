from playwright.sync_api import sync_playwright

def verify_panchangam():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to Home Page
        print("Navigating to Home Page...")
        page.goto("http://localhost:3000")
        page.wait_for_load_state("networkidle")

        # Take screenshot of Home Page (should show TopBar)
        print("Taking screenshot of Home Page with TopBar...")
        page.screenshot(path="verification/home_with_topbar.png")

        # Check if TopBar exists
        top_bar = page.locator(".top-bar")
        if top_bar.count() > 0:
            print("TopBar found on Home Page.")
        else:
            print("ERROR: TopBar NOT found on Home Page.")

        # Navigate to Panchangam Page via Navbar
        print("Clicking Panchangam link in Navbar...")
        page.click("text=Panchangam")
        page.wait_for_load_state("networkidle")

        # Take screenshot of Panchangam Page (should NOT show TopBar)
        print("Taking screenshot of Panchangam Page...")
        page.screenshot(path="verification/panchangam_page.png")

        # Check if TopBar is absent
        if top_bar.count() == 0:
            print("TopBar correctly absent on Panchangam Page.")
        else:
            print("ERROR: TopBar incorrectly present on Panchangam Page.")

        browser.close()

if __name__ == "__main__":
    verify_panchangam()
