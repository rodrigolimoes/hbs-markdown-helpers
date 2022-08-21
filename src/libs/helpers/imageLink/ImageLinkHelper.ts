import { ImageLinkProps } from "../../model/ImageLink/ImageLinkProps";
import { ImageLink } from "../../generators/imageLink/ImageLink";

interface ImageLinkHelperOptions {
  hash?: ImageLinkProps;
}

export class ImageLinkHelper {
  getImageLinkHelper = (options: ImageLinkHelperOptions) => {
    const props = options.hash
      ? {
          url: options.hash.url ? options.hash.url : "",
          description: options.hash.description ? options.hash.description : "",
          path: options.hash.path ? options.hash.path : "",
        }
      : { url: "", description: "", path: "" };

    return new ImageLink(props).generate();
  };
}
