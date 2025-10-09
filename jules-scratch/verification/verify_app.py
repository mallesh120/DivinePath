from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Go to the home page (which redirects to /gods)
        page.goto("http://localhost:5173/gods", timeout=60000)
        page.wait_for_selector(".gods-gallery")
        page.screenshot(path="jules-scratch/verification/gods-page.png")

        # Go to the literature page
        page.get_by_role("link", name="Literature").click()
        page.wait_for_selector(".literature-library")
        page.screenshot(path="jules-scratch/verification/literature-page.png")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)