const { Builder, By, Key, until } = require('selenium-webdriver');

// (async function aboutPageTests() {
//     const driver = await new Builder().forBrowser('chrome').build();
//     try {
//         await driver.get('http://www.iodb.info/#/');

//         // Iterate through every button on this page

//         const location = driver.findElement(By.partialLinkText('Explore'));
//         await location.click();

//         //  await driver.findElement(By.id('q')).sendKeys('Forestry and Logging', Key.RETURN);
//         // await driver.wait(until.titleIs('something'), 1000);
//     } finally {
//         await driver.quit();
//     }
// })();

function wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

(async function searchBarTests() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://www.iodb.info/#/industry/industries_3d/113000');

        // Iterate through every button on search bar

        // let searchbar = driver.findElements(By.className('ml-auto navbar-nav'));

        // for (searchbar = 0; searchbar < searchbar.length; searchbar++) {
        //     // Runs 5 times, with values of step 0 through 4.
        //     console.log(searchbar);
        // }

        // const test = driver.findElement(By.className('navbar-brand'));
        // await test.click();
        // driver.findElements(By.partialLinkText('Home')).then(cheeses => console.log(cheeses.length));

        // About
        const about = driver.findElement(By.partialLinkText('Home'));
        await about.click();
        wait(2000);
        // Explore
        const location = driver.findElement(By.partialLinkText('Explore'));
        await location.click();
        wait(2000);

        // // // About Us
        const aboutus = driver.findElement(By.partialLinkText('About Us'));
        await aboutus.click();
        wait(2000);

        //  await driver.findElement(By.id('q')).sendKeys('Forestry and Logging', Key.RETURN);
        // await driver.wait(until.titleIs('something'), 1000);
    } finally {
        await driver.quit();
    }
})();

// http://www.iodb.info/#/industry/industries_3d/113000
