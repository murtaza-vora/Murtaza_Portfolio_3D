from playwright.sync_api import sync_playwright
from pathlib import Path

OUT_DIR = Path(r"F:\protfoilo website\public\tests")

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3000", wait_until="networkidle")
    
    # Scroll to experience section
    exp = page.locator("#experience")
    exp.scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    
    # Take screenshot of the Experience section
    exp.screenshot(path=str(OUT_DIR / "experience_timeline.png"))
    print("Saved: public/tests/experience_timeline.png")
    
    # Check overflow
    w_scroll = page.evaluate("document.documentElement.scrollWidth")
    w_inner = page.evaluate("window.innerWidth")
    print(f"Desktop: scrollWidth={w_scroll}px, innerWidth={w_inner}px")
    
    browser.close()
