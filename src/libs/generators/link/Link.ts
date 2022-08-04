import { LinkProps } from "../../model/Link/LinkProps";
export default class Link {
  readonly props: LinkProps;

  constructor(props: LinkProps) {
    this.props = props;
  }

  setTextLink = (text: string) => {
    return `[${text}]`;
  };

  setUrlLink = (url: string) => {
    return `(${url})`;
  };

  generate = () => {
    const { url, textLink } = this.props;

    return `${this.setTextLink(textLink)}${this.setUrlLink(url)}`;
  };
}
