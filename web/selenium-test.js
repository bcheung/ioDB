const { Builder, By, Key, until } = require('selenium-webdriver');

(async function aboutPageTests() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://www.iodb.info/#/');

        // Click dropdown button
        // const dropdown = driver.findElement(By.className('css-1ep9fjw'));
        // await dropdown.click();
        // wait(2000);

        // Enter search bar

        // css-1hwfws3 : search bar(maybe)
        // css-vj8t7z
        // css-1492t68
        // css-1g6gooi
        // css-10nd86i dropDown

        // const e2 = driver.findElement({ class: 'css-1g6gooi' }).sendKeys('Forestry and Logging', Key.RETURN);

        const searchInput = driver
            .findElement(By.className('css-1uq0kb5'))
            .sendKeys('Forestry and Logging', Key.RETURN);
        // const searchInput = driver.findElement(By.css('.css-1uq0kb5')).sendKeys('Forestry and Logging', Key.RETURN);

        const searchButton = driver.findElement(By.partialLinkText('Search'));
        await searchButton.click();
        wait(2000);
        // // Iterate through every button on this page

        // const location = driver.findElement(By.partialLinkText('Explore'));
        // await location.click();

        //  await driver.findElement(By.id('q')).sendKeys('Forestry and Logging', Key.RETURN);
        // await driver.wait(until.titleIs('something'), 1000);
    } finally {
        await driver.quit();
    }
})();

function wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

// (async function searchBarTests() {
//     const driver = await new Builder().forBrowser('chrome').build();
//     try {
//         await driver.get('http://www.iodb.info/#/industry/industries_3d/113000');

//         // About
//         const about = driver.findElement(By.partialLinkText('Home'));
//         await about.click();
//         wait(2000);
//         // Explore
//         const location = driver.findElement(By.partialLinkText('Explore'));
//         await location.click();
//         wait(2000);

//         // // // About Us
//         const aboutus = driver.findElement(By.partialLinkText('About Us'));
//         await aboutus.click();
//         wait(2000);

//         //  await driver.findElement(By.id('q')).sendKeys('Forestry and Logging', Key.RETURN);
//         // await driver.wait(until.titleIs('something'), 1000);
//     } finally {
//         await driver.quit();
//     }
// })();

// http://www.iodb.info/#/industry/industries_3d/113000
