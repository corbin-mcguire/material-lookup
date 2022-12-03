'use strict';
// import { Builder, By } from 'selenium-webdriver';
const { Builder, By, until } = require('selenium-webdriver');
// import { HOME_DEPOT } from './public/elements.enum.js';

(async () => {
  const driver = await new Builder().forBrowser('firefox').build();

  try {
    await driver.get('https://www.homedepot.com/');
    let searchBar = await driver.findElement(By.id('headerSearch'));
    let submitButton = await driver.findElement(By.id('headerSearchButton'));
    await searchBar.sendKeys('026613966199');

    await submitButton.click();

    let productTitle = await driver.wait(until.elementLocated(By.className('product-details__title')), 10000);

    let productPrice = await driver
      .findElement(
        By.xpath('/html/body/div[4]/div/div[3]/div/div/div[3]/div/div/div[1]/div/div/div/div/div[2]/div[1]/div/span')
      )
      .getAttribute('innerHTML');
    if (productPrice.includes('<!-- -->')) {
      let price = productPrice.split('<!-- -->');
      console.table({
        PID: '026613966199',
        Title: await productTitle.getText(),
        Price: price.toString().replace(/,/g, ''),
      });
    }
  } catch (error) {
    console.error(error);
  }

  async function tryForElement(by, retries) {
    let outcome = false;
    let repeat = 0;
    while (repeat < retries) {
      console.log(`Trying for element...${repeat}`);
      try {
        await driver.findElement(by);
        console.log('Element found.');
        outcome = true;
        break;
      } catch (error) {
        console.error(error);
      }
      repeat += 1;
    }
    return outcome;
  }
})();
