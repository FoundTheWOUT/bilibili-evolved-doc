import cn from "classnames";
import GithubSlugger from "github-slugger";
import { LinkIcon } from "@heroicons/react/solid";

const parseElementToSting = (node: JSX.Element | string): string => {
  if (typeof node === "string") return node;
  return parseElementToSting(node.props.children);
};

const createHeaderLink = (children: JSX.Element) => {
  let slugger = new GithubSlugger();
  slugger.reset();
  const { children: content } = children.props;

  let title: string;
  if (Array.isArray(content)) {
    title = content.map(parseElementToSting).join(" ");
  } else {
    title = parseElementToSting(content);
  }
  const id = slugger.slug(title);

  return (
    <div className="group relative">
      {children}
      <a
        id={id}
        href={`#${id}`}
        className="anchor absolute top-0 flex h-full -translate-x-full transform items-center opacity-0 transition-opacity group-hover:opacity-100 dark:text-white"
      >
        <LinkIcon className="h-6" />
      </a>
    </div>
  );
};

export const H1 = ({ className, ...props }: JSX.IntrinsicElements["h1"]) =>
  createHeaderLink(
    <h1
      className={cn(
        className,
        "my-4 text-[2rem] font-bold leading-tight dark:text-white"
      )}
      {...props}
    />
  );

export const H2 = ({ className, ...props }: JSX.IntrinsicElements["h2"]) =>
  createHeaderLink(
    <h2
      className={cn(
        "text-primary dark:text-primary-dark my-6 text-3xl font-bold leading-10 dark:text-white",
        className
      )}
      {...props}
    />
  );

export const H3 = ({ className, ...props }: JSX.IntrinsicElements["h3"]) =>
  createHeaderLink(
    <h3
      className={cn(
        className,
        "text-primary dark:text-primary-dark my-6 text-2xl font-bold leading-9 dark:text-white"
      )}
      {...props}
    />
  );

export const H4 = ({ className, ...props }: JSX.IntrinsicElements["h4"]) =>
  createHeaderLink(
    <h4
      className={cn(
        className,
        "my-4 text-xl font-bold leading-9 dark:text-white"
      )}
      {...props}
    />
  );
