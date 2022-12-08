import { SearchIcon } from "@heroicons/react/solid";
import { useDocSearchKeyboardEvents, DocSearchModal } from "@docsearch/react";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import config from "constant/config";

const Search = ({ ...props }) => {
  const [isModelShow, setModelShow] = useState(false);

  const onOpen = useCallback(
    function onOpen() {
      setModelShow(true);
    },
    [setModelShow]
  );

  const onClose = useCallback(
    function onClose() {
      setModelShow(false);
    },
    [setModelShow]
  );

  useDocSearchKeyboardEvents({
    isOpen: isModelShow,
    onClose,
    onOpen,
  });

  return (
    <>
      <div {...props}>
        <button
          type="button"
          className="flex w-full items-center rounded bg-stone-100 p-2 text-gray-400 ring-sky-200 focus:ring dark:bg-stone-700 dark:text-stone-400 dark:ring-sky-700"
          onClick={onOpen}
        >
          <SearchIcon className="mx-2 h-5 w-5 text-stone-500 dark:text-stone-300" />
          搜索
          <kbd className="DocSearch-Button-Key ml-auto">/</kbd>
        </button>
      </div>
      {isModelShow &&
        createPortal(
          <DocSearchModal
            apiKey={config.algolia.apiKey}
            appId={config.algolia.appId}
            indexName={config.algolia.indexName}
            initialScrollY={window.scrollY}
            onClose={onClose}
            transformItems={(items: any[]) => {
              return items.map((item) => {
                const url = new URL(item.url);
                return {
                  ...item,
                  url: item.url.replace(url.origin, "").replace("#__next", ""),
                };
              });
            }}
          />,
          document.body
        )}
    </>
  );
};

export default Search;
