import { format } from "date-fns";
import HitCounter from "../HitCounter/HitCounter";
import { DateIcon, TagIcon, EditIcon, ViewsIcon } from "../Icons";
import * as config from "../../lib/config";
import type { NoteMetaType } from "../../types";

import styles from "./NoteMeta.module.css";

type Props = Pick<NoteMetaType, "slug" | "date" | "title" | "tags">;

const NoteMeta = ({ slug, date, title, tags = [] }: Props) => (
  <div className={styles.meta}>
    <div>
      <span>
        <DateIcon className={styles.icon} />
      </span>
      <span title={format(new Date(date), "PPppp")}>{format(new Date(date), "MMMM d, yyyy")}</span>
    </div>

    {tags.length > 0 && (
      <div className={styles.tags}>
        <span>
          <TagIcon className={styles.icon} />
        </span>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    )}

    <div>
      <a
        href={`https://github.com/${config.githubRepo}/blob/main/notes/${slug}.mdx`}
        target="_blank"
        rel="noopener noreferrer"
        title={`Edit "${title}" on GitHub`}
      >
        <span>
          <EditIcon className={styles.icon} />
        </span>
        <span>Improve This Post</span>
      </a>
    </div>

    <div className={styles.views}>
      <span>
        <ViewsIcon className={styles.icon} />
      </span>
      <HitCounter slug={`notes/${slug}`} />
    </div>
  </div>
);

export default NoteMeta;
