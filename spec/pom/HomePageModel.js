module.exports = class HomePageModel {
    constructor(page,config) {
        this.page = page
        this.config = config
    }

    async go_to_site(){
        await this.page.goto(this.config.config.baseURL);
    }

    async title() {
        return await this.page.title();
    }
}

