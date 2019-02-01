const assert    = require('assert');
const puppeteer = require('puppeteer');
describe("Browsing with puppeteer:", ()=> {
  describe("Geting one page", ()=>{
    it("Check OK:",  async ()=> {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });    
        const page = await browser.newPage();
        await page.goto('https://bitbucket.org/maximilianou/', {waitUntil: 'domcontentloaded'}); //, {waitUntil: 'networkidle2'});    
        let textResponse = await page.evaluate(() => {
          //<a href="/maximilianou/">Maximiliano Usich</a>
          let elemCheck = document.querySelector('a[href="/maximilianou/"]');
          return elemCheck.innerHTML;
        });
        assert( textResponse === 'Maximiliano Usich', "[OK] Content Found" );
        browser.close();
    }).timeout(0);;
    it("Check Not Found:", async ()=> {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });    
        const page = await browser.newPage();
        await page.goto('https://bitbucket.org/maximilianou/UPS!!', {waitUntil: 'domcontentloaded'});// , {waitUntil: 'networkidle2'});    
        let textResponse = await page.evaluate(() => {
          //<a href="/maximilianou/">Maximiliano Usich</a>
          let elemCheck = document.querySelector('a[href="/maximilianou/"]');
          return elemCheck;
        });
        assert( textResponse === null, "[OK] Content Not Found" );
        browser.close();
        
      }).timeout(0);;
  });
});
