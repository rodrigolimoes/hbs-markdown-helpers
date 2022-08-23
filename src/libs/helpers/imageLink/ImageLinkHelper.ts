import { ImageLinkProps } from "../../model/ImageLink/ImageLinkProps";
import { ImageLink } from "../../generators/imageLink/ImageLink";

interface ImageLinkHelperOptions {
  hash?: ImageLinkProps;
}

export class ImageLinkHelper {
  /**
   * This function return the props of ImageLink
   * @param options
   * @return ImageLinkProps
   */
  getImageLinkProps = (options: ImageLinkHelperOptions): ImageLinkProps => {
    const props = options.hash
      ? {
          url: options.hash.url ? options.hash.url : "",
          description: options.hash.description
            ? options.hash.description
            : "unknown",
          path: options.hash.path ? options.hash.path : "",
        }
      : { url: "", description: "", path: "" };

    return props;
  };
  /**
   * This function get the Image with link
   * @param options
   * @return string
   */
  getImageLinkHelper = (options: ImageLinkHelperOptions) => {
    const props = this.getImageLinkProps(options);
    return new ImageLink(props).generate();
  };
}
