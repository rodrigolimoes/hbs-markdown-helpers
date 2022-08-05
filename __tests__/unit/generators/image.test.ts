import Image from "../../../src/libs/generators/image/Image";

describe("Image", () => {
  it("Should return an image when the image path and description are specified", () => {
    const image = new Image({
      path: "../image/image_test.png",
      description: "Table Example of hbs-markdown-helpers library",
    }).generate();

    expect(image).toBeDefined();
    expect(image).toContain(
      `![Table Example of hbs-markdown-helpers library](../image/image_test.png)`
    );
  });
});
