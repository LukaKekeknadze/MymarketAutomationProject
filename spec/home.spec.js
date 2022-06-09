const pptr = require("puppeteer")

const HomePageModel = require("./pom/HomePageModel")
const config = require("../config")


describe("home page",() => {
    let browser;
    let page;
    let homePageModel;
    beforeAll(async() => {
            browser = await pptr.launch(config.config.launchOptions);
            page = await browser.newPage();
            homePageModel = new HomePageModel(page,config);
            await homePageModel.go_to_site();

    });
    afterAll(async () =>{
        await page.close()
        await browser.close()
    });

    it("title should be:mymarket.ge", async () =>{
        expect(await homePageModel.title()).toContain(config.config.homeTitle)
    })
    it()


})