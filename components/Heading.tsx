import cn from "classnames";
import GithubSlugger from "github-slugger";
import { LinkIcon } from "@heroicons/react/solid";

export interface HeadingProps {
  className?: string;
  isPageAnchor?: boolean;
  children: React.ReactNode;
  id?: string;
  as?: any;
}

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
        className="anchor flex opacity-0 h-full group-hover:opacity-100 items-center absolute top-0 transform -translate-x-full transition-opacity dark:text-white"
      >
        <LinkIcon className="h-6" />
      </a>
    </div>
  );
};

export const H1 = ({ className, ...props }: HeadingProps) =>
  createHeaderLink(
    <h1
      className={cn(
        className,
        "text-5xl font-bold leading-tight dark:text-white"
      )}
      {...props}
    />
  );

export const H2 = ({ className, ...props }: HeadingProps) =>
  createHeaderLink(
    <h2
      className={cn(
        "text-3xl leading-10 text-primary dark:text-primary-dark font-bold my-6 dark:text-white",
        className
      )}
      {...props}
    />
  );

export const H3 = ({ className, ...props }: HeadingProps) =>
  createHeaderLink(
    <h3
      className={cn(
        className,
        "text-2xl leading-9 text-primary dark:text-primary-dark font-bold my-6 dark:text-white"
      )}
      {...props}
    />
  );

export const H4 = ({ className, ...props }: HeadingProps) =>
  createHeaderLink(
    <h4
      className={cn(
        className,
        "text-xl font-bold leading-9 my-4 dark:text-white"
      )}
      {...props}
    />
  );
