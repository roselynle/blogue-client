const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe("index.html", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    describe("head", () => {
        test("there is a css stylesheet", () => {
            const head = document.querySelector("head");
            expect(head.innerHTML).toContain('link rel="stylesheet"');
        });
    });

    describe("body", () => {
        test("there is a header", () => {
            expect(document.querySelector("header")).toBeTruthy();
        });
    });
});
