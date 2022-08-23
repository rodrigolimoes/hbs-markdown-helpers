import { ImageProps } from "../../model/Image/ImageProps";
import { Image } from "../../generators/index";

interface ImageOptions {
  hash?: ImageProps;
}

export class ImageHelper {
  /**
   * This funtion get the markdown image
   * @param options
   * @return string
   */
  getImageHelper = (options: ImageOptions) => {
    const props = options.hash ? options.hash : { description: "", path: "" };

    return new Image(props).generate();
  };
}
