import innerText from "react-innertext";
import HeadingAnchor from "../HeadingAnchor";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Anchor = styled(HeadingAnchor, {
  margin: "0 0.4em",
  padding: "0 0.2em",
  color: "$medium",
  opacity: 0, // overridden on hover below (except on small screens)

  "&:hover": {
    color: "$link",
  },

  "@medium": {
    margin: "0 0.2em",
    padding: "0 0.4em",

    // don't require hover to show anchor link on small (likely touch) screens
    opacity: 1,
  },
});

const H = styled("h1", {
  marginTop: "1em",
  marginBottom: "0.5em",
  lineHeight: 1.5,

  // offset (approximately) with sticky header so jumped-to content isn't hiding behind it.
  // note: use rem so it isn't based on the heading's font size.
  scrollMarginTop: "5.5rem",

  "@medium": {
    scrollMarginTop: "6.5rem",
  },

  // show anchor link when hovering anywhere over the heading line
  [`&:hover ${Anchor}`]: {
    opacity: 1,
  },

  variants: {
    // subtle horizontal rule under the heading, set by default on `<h2>`s
    divider: {
      true: {
        paddingBottom: "0.25em",
        borderBottom: "1px solid $kindaLight",
      },
    },
  },
});

export type HeadingProps = ComponentProps<typeof H> & {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  divider?: boolean;
};

const Heading = ({ as, id, divider, children, ...rest }: HeadingProps) => {
  return (
    <H as={as} divider={divider ?? as === "h2"} id={id} {...rest}>
      {children}

      {/* add anchor link to H2s and H3s. ID is already generated by rehype-slug. `#` character inserted via CSS. */}
      {id && (as === "h2" || as === "h3") && <Anchor id={id} title={innerText(children)} />}
    </H>
  );
};

export const H1 = (props: Omit<HeadingProps, "as">) => <Heading as="h1" {...props} />;
export const H2 = (props: Omit<HeadingProps, "as">) => <Heading as="h2" {...props} />;
export const H3 = (props: Omit<HeadingProps, "as">) => <Heading as="h3" {...props} />;
export const H4 = (props: Omit<HeadingProps, "as">) => <Heading as="h4" {...props} />;
export const H5 = (props: Omit<HeadingProps, "as">) => <Heading as="h5" {...props} />;
export const H6 = (props: Omit<HeadingProps, "as">) => <Heading as="h6" {...props} />;

export default Heading;
