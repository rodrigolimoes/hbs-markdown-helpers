interface LinkProps {
  url: string;
  textLink: string;
  tooltipContent: string;
}

export default class Link {
  readonly props: LinkProps;

  constructor(props: LinkProps) {
    this.props = props;
  }

  setTextLink = (text: string) => {
    return `[${text}]`;
  };

  setParenthesesLink = ({
    url,
    tooltipContent,
  }: {
    url: string;
    tooltipContent: string;
  }) => {
    return `(${url} "${tooltipContent}")`;
  };

  generate = () => {
    const { url, textLink, tooltipContent } = this.props;

    return `${this.setTextLink(textLink)}${this.setParenthesesLink({
      url,
      tooltipContent,
    })}`;
  };
}
