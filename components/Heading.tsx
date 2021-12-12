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

const createHeaderLink = (children: JSX.Element) => {
  let slugger = new GithubSlugger();
  slugger.reset();
  // TODO: use id witch generate by export heading
  const id = slugger.slug(children.props.children);

  return (
    <a id={id} href={`#${id}`} className="anchor group flex relative">
      <div className="opacity-0 h-full flex group-hover:opacity-100 items-center absolute transform -translate-x-full transition-opacity dark:text-white">
        <LinkIcon className="h-6" />
      </div>
      {children}
    </a>
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

export const H4 = ({ className, ...props }: HeadingProps) => {
  // console.log(props);
  return createHeaderLink(
    <h4
      className={cn(
        className,
        "text-xl font-bold leading-9 my-4 dark:text-white"
      )}
      {...props}
    />
  );
};
