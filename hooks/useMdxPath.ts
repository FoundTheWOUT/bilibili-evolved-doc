import { useRouter } from "next/router";

interface Ops {
  endWithIndex: boolean;
}

export const useMdxPath = (options?: Ops) => {
  const { endWithIndex } = Object.assign({ endWithIndex: false }, options);
  const {
    query: { slug },
  } = useRouter();
  if (!Array.isArray(slug)) return "";
  if (slug.length == 1 && endWithIndex) return slug.concat(["index"]).join("/");
  return "/docs/" + slug.join("/");
};
