import { LinkProps } from "../../model/Link/LinkProps";
import { Link } from "../../generators/index";

export class LinkHelper {
  getLinkHelper = (options: { hash?: LinkProps }) => {
    const props = options.hash ? options.hash : { url: "", textLink: "" };

    return new Link(props).generate();
  };
}
