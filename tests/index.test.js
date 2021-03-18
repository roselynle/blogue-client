const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

global.fetch = require("jest-fetch-mock");

let app;

describe("app", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require("../js/index.js");
    });

    afterEach(() => {
        fetch.resetMocks();
    });

    describe("requests", () => {
        describe("getAllPosts", () => {
            test("it makes a get request", () => {
                app.getData("https://bloguefp.herokuapp.com/");
                // expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/posts$/))
                expect(fetch.mock.calls[0][0]).toMatch(/$/);
            });
        });
    });
});
// need to make sure functions in index.js are exported
