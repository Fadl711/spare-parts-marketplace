import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:8081", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Click on 'إنشاء حساب جديد' (Create New Account) to open registration form.
        frame = context.pages[-1]
        # Click on 'إنشاء حساب جديد' to open registration form
        elem = frame.locator('xpath=html/body/div/div/div/div/div/div/div/div/div/div/div[2]/div[5]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Send registration API request omitting required fields such as name or phone number.
        frame = context.pages[-1]
        # Input email
        elem = frame.locator('xpath=html/body/div/div/div/div/div/div/div/div/div/div/div[2]/div[4]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('test@customer.com')
        

        frame = context.pages[-1]
        # Input password
        elem = frame.locator('xpath=html/body/div/div/div/div/div/div/div/div/div/div/div[2]/div[5]/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('password')
        

        frame = context.pages[-1]
        # Input password confirmation
        elem = frame.locator('xpath=html/body/div/div/div/div/div/div/div/div/div/div/div[2]/div[6]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('password')
        

        frame = context.pages[-1]
        # Click on 'إنشاء الحساب' (Create Account) button to submit form with missing required fields
        elem = frame.locator('xpath=html/body/div/div/div/div/div/div/div/div/div/div/div[2]/div[7]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Submit the registration form with missing required fields (e.g., omit full name and phone number) and verify the response.
        frame = context.pages[-1]
        # Input email
        elem = frame.locator('xpath=html/body/div/div/div/div/div/div/div/div/div/div/div[2]/div[4]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('test@customer.com')
        

        frame = context.pages[-1]
        # Input password
        elem = frame.locator('xpath=html/body/div/div/div/div/div/div/div/div/div/div/div[2]/div[5]/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('password')
        

        frame = context.pages[-1]
        # Input password confirmation
        elem = frame.locator('xpath=html/body/div/div/div/div/div/div/div/div/div/div/div[2]/div[6]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('password')
        

        frame = context.pages[-1]
        # Click on 'إنشاء الحساب' (Create Account) button to submit form with missing required fields
        elem = frame.locator('xpath=html/body/div/div/div/div/div/div/div/div/div/div/div[2]/div[7]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=حساب جديد 🎉').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=أنشئ حساباً للبدء').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=الاسم الكامل').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=رقم الجوال').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=البريد الإلكتروني').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=كلمة المرور').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=تأكيد كلمة المرور').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    