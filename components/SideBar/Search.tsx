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
          className="p-2 w-full rounded flex items-center bg-stone-100 dark:bg-stone-700 text-gray-400 dark:text-stone-400 focus:ring ring-sky-200 dark:ring-sky-700"
          onClick={onOpen}
        >
          <SearchIcon className="h-5 w-5 mx-2 text-stone-500 dark:text-stone-300" />
          搜索
          <kbd className="ml-auto DocSearch-Button-Key">/</kbd>
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
