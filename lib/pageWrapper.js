module.exports = function (pg) {
    const page = Object.create(pg);
    const consoleMessages = [];

    page.on("console", (msg) => consoleMessages.push(msg.text()));
    page.on("response", (response) => {
        const statusCodeFamily = Math.floor(response.status() / 100);
        const request = response.request();
        if (statusCodeFamily === 4 || statusCodeFamily === 5) {
            consoleMessages.push(
                `❌ Request Failed: [${request.method()}] ${response.url()}, Status: ${response.status()}, Body: ${request.postData()}`
            );
        }
    });

    page.goto = async function (url, opt = {}) {
        const res = await pg.goto(
            url,
            Object.assign(
                {
                    waitUntil: "networkidle0",
                },
                opt
            )
        );
        const status = res.status();
        if (status != 200) {
            throw new Error(`page.goto ${url} failed, status was: ${status}`);
        }
        return res;
    };
    return page;
};
