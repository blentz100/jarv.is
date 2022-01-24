import { memo } from "react";
import Link from "next/link";
import { HeartIcon, NextjsLogo } from "../Icons";
import * as config from "../../lib/config";

import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.row}>
      <div className={styles.license}>
        Content{" "}
        <Link href="/license/" prefetch={false}>
          <a title="Creative Commons Attribution 4.0 International">licensed under CC-BY-4.0</a>
        </Link>
        ,{" "}
        <Link href="/previously/" prefetch={false}>
          <a title="Previously on...">2001</a>
        </Link>{" "}
        – {new Date().getFullYear()}.
      </div>
      <div className={styles.powered_by}>
        Made with{" "}
        <span className={styles.heart} title="Love">
          <HeartIcon />
        </span>{" "}
        and{" "}
        <a
          className={styles.nextjs}
          href="https://nextjs.org/"
          title="Powered by Next.js"
          aria-label="Next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NextjsLogo fill="currentColor" />
        </a>
        .{" "}
        <a
          className={styles.view_source}
          href={`https://github.com/${config.githubRepo}`}
          title="View Source on GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source.
        </a>
      </div>
    </div>
  </footer>
);

export default memo(Footer);
