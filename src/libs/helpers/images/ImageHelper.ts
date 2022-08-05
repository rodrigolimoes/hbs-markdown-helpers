import { ImageProps } from "../../model/Image/ImageProps";
import { Image } from "../../generators/index";

export class ImageHelper {
  getImageHelper = (options: { hash?: ImageProps }) => {
    const props = options.hash ? options.hash : { description: "", path: "" };

    return new Image(props).generate();
  };
}
