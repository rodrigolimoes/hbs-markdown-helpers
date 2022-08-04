import Link from "../../../src/libs/generators/link/Link";

describe("Link", () => {
  it("Should return a markdown link", () => {
    const link = new Link({
      textLink: "Rodrigo",
      url: "https://github.com/rodrigolimoes",
      tooltipContent: "Github Profile",
    }).generate();

    expect(link).toBeDefined();
    expect(link).toContain(
      `[Rodrigo](https://github.com/rodrigolimoes "Github Profile")`
    );
  });
});
