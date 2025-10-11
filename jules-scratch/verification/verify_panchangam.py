from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000")
        panchangam_widget = page.locator(".panchangam-floating-widget")
        panchangam_widget.screenshot(path="jules-scratch/verification/panchangam.png")
        browser.close()

run()
