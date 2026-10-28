import os
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT_DIR = Path(r"F:\protfoilo website\public\tests")
OUT_DIR.mkdir(parents=True, exist_ok=True)

print("Starting Automated Playwright UI Test...")

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    
    # Test 1: Desktop Viewport (1440x900)
    print("\n--- TEST 1: Desktop (1440x900) ---")
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3000", wait_until="networkidle")
    
    # Check horizontal overflow
    overflow = page.evaluate("document.documentElement.scrollWidth > window.innerWidth")
    scroll_w = page.evaluate("document.documentElement.scrollWidth")
    inner_w = page.evaluate("window.innerWidth")
    print(f"Desktop ScrollWidth: {scroll_w}px, InnerWidth: {inner_w}px")
    if overflow:
        print("FAIL: Desktop has horizontal overflow!")
    else:
        print("PASS: Zero horizontal overflow on Desktop!")
    
    # Capture Desktop Screenshots for each section
    page.screenshot(path=str(OUT_DIR / "desktop_fullpage.png"), full_page=True)
    print("Saved full page screenshot: public/tests/desktop_fullpage.png")
    
    # Test 2: Mobile Viewport (390x844 - iPhone 14 / modern smartphone)
    print("\n--- TEST 2: Mobile (390x844) ---")
    page_m = browser.new_page(viewport={"width": 390, "height": 844})
    page_m.goto("http://localhost:3000", wait_until="networkidle")
    
    m_overflow = page_m.evaluate("document.documentElement.scrollWidth > window.innerWidth")
    m_scroll_w = page_m.evaluate("document.documentElement.scrollWidth")
    m_inner_w = page_m.evaluate("window.innerWidth")
    print(f"Mobile ScrollWidth: {m_scroll_w}px, InnerWidth: {m_inner_w}px")
    if m_overflow:
        print("FAIL: Mobile has horizontal overflow!")
    else:
        print("PASS: Zero horizontal overflow on Mobile!")
        
    page_m.screenshot(path=str(OUT_DIR / "mobile_fullpage.png"), full_page=True)
    print("Saved mobile full page screenshot: public/tests/mobile_fullpage.png")
    
    browser.close()

print("\nUI Testing completed successfully!")
