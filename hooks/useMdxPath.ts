import { useRouter } from "next/router";

interface Ops {
  endWithIndex: boolean;
}

export const useMdxPath = (options?: Ops) => {
  const { endWithIndex } = Object.assign({ endWithIndex: false }, options);
  let {
    query: { slug },
  } = useRouter();
  if (!endWithIndex) {
    slug = (slug as string[]).filter((v) => v !== "index");
  }
  if (!Array.isArray(slug)) return "";
  if (slug.length == 1 && endWithIndex) return slug.concat(["index"]).join("/");
  return "/docs/" + slug.join("/");
};
