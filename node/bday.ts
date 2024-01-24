import playwright from "playwright";
import https from "https";

import fs from "fs";

// get name from args
const args = process.argv.slice(2);
const name = args[0];

(async () => {
    if (!name) {
        throw new Error("pass name after file");
    }

    const launchOptions = {
        headless: true,
        // proxy: {
        //     server: "http://pr.oxylabs.io:7777",
        //     username: "USERNAME",
        //     password: "PASSWORD",
        // },
    };
    const browser = await playwright["chromium"].launch(launchOptions);
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://en.wikipedia.org");

    await page.getByPlaceholder("Search Wikipedia").fill(name);

    await page.getByRole("button", { name: "Search" }).click();

    await page.waitForURL("https://en.wikipedia.org/wiki/**");

    const element = page.locator(".bday");
    const content = await element.textContent();

    // const titleMatch = (await page.title()).match(/(.*)\s-\sWikipedia/);
    // let title = titleMatch && titleMatch?.length > 1 ? titleMatch[1] : "";

    // const name = await page
    //     .getByRole("heading", { name: title, exact: true })
    //     .locator("span")
    //     .textContent();
    console.log(`${name} - ${content}`);
    await browser.close();
})();
