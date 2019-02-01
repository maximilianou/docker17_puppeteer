# docker17_puppeteer

``` 

test/index.spec.js

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

package.json

{
  "name": "frontest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "node_modules/mocha/bin/mocha  test/index.spec.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mocha": "^5.2.0"
  }
}


Dockerfile

FROM alekzonder/puppeteer
# set working directory
#RUN mkdir /app
WORKDIR /app
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY package.json /app/package.json
COPY test /app/test
RUN npm install
# start app
CMD ["npm", "run", "test"]


docker-compose.yml

version: '3.5'
services:
  docker-test-puppeteer:
    container_name: docker-test-puppeteer
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - '.:/app'
      - '/app/node_modules'
    ports:
      - '3333:3333'
    environment:
      - NODE_ENV=development



```

