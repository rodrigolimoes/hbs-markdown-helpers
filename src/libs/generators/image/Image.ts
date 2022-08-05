import { ImageProps } from "../../model/Image/ImageProps";

export default class Image {
  readonly props: ImageProps;

  constructor(props: ImageProps) {
    this.props = props;
  }

  setDescription = (value: string) => `[${value}]`;

  setPathImage = (path: string) => `(${path})`;

  generate = () => {
    const { path, description } = this.props;

    return `!${this.setDescription(description)}${this.setPathImage(path)}`;
  };
}
