// import { Builder, By } from 'selenium-webdriver';
const { Builder, By } = require('selenium-webdriver');
// import { HOME_DEPOT } from './public/elements.enum.js';

(async () => {
  const driver = await new Builder().forBrowser('firefox').build();

  try {
    await driver.get('https://www.homedepot.com/');
    let searchBar = await driver.findElement(By.id('headerSearch'));
    let submitButton = await driver.findElement(By.id('headerSearchButton'));
    await searchBar.sendKeys('026613966199');

    await driver.manage().setTimeouts({ implicit: 1000 });

    await submitButton.click();

    await driver.manage().setTimeouts({ implicit: 1500 });

    // driver.navigate().refresh();()
    let productTitle;
    if (tryForElement(By.xpath('/html/body/div[4]/div/div[3]/div/div/div[2]/div/div[1]/div/div/div[3]/span/h1'))) {
      productTitle = await driver.findElement(
        By.xpath('/html/body/div[4]/div/div[3]/div/div/div[2]/div/div[1]/div/div/div[3]/span/h1')
      );
    }

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

  async function tryForElement(by) {
    let outcome = false;
    let repeat = 0;
    while (repeat <= 3) {
      console.log('Trying for element...');
      try {
        await driver.findElement(by);
        return true;
      } catch (error) {
        console.error(error);
      }
      repeat += 1;
    }
    return outcome;
  }
})();
