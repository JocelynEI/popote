import asyncio, pathlib
from playwright.async_api import async_playwright
JOBS=[('icon.svg','../icon.png',1024,False),('android-foreground.svg','../android-icon-foreground.png',512,True),('android-background.svg','../android-icon-background.png',512,False),('android-monochrome.svg','../android-icon-monochrome.png',432,True),('splash.svg','../splash-icon.png',1024,True),('icon.svg','../favicon.png',48,False)]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome')
        for src,dst,size,transparent in JOBS:
            pg=await b.new_page(viewport={'width':size,'height':size})
            svg=pathlib.Path(src).read_text().replace('width="1024" height="1024"',f'width="{size}" height="{size}"',1)
            await pg.set_content(f'<html><body style="margin:0;background:transparent">{svg}</body></html>')
            await pg.screenshot(path=dst,omit_background=transparent,clip={'x':0,'y':0,'width':size,'height':size})
            await pg.close()
        await b.close()
asyncio.run(main())
