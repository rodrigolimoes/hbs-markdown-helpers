import { ImageLinkProps } from "../../model/ImageLink/ImageLinkProps";

export class ImageLink {
  private readonly props: ImageLinkProps;

  constructor(props: any) {
    this.props = props;
  }

  setPath = (path: string) => {
    return `(${path})`;
  };

  setDescription = (description: string) => {
    return `[${description}]`;
  };

  setUrl = (url: string) => {
    return `(${url})`;
  };

  generate = () => {
    const { url, path, description } = this.props;

    return `[!${this.setDescription(description)}${this.setPath(
      path
    )}]${this.setUrl(url)}`;
  };
}
