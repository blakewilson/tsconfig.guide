"use client";

import { ShareIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import { useState } from "react";

export default function Header() {
  const shareLink = "https://tsconfig.guide";
  let shareButtonText = "Share";
  let shareButtonTextClicked = "Share link copied!";
  const [isSharing, setIsSharing] = useState(false);

  return (
    <header className={classNames("block lg:fixed z-40 bg-slate-900 w-full")}>
      <nav
        className="mx-auto flex max-w-full items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-2xl font-semibold">TSConfig Guide</span>
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              setIsSharing(true);

              setTimeout(() => {
                setIsSharing(false);
              }, 2500);
            }}
            className={classNames(
              "flex items-center rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20",
              isSharing ? "bg-green-500 hover:bg-green-500" : undefined
            )}
          >
            <ShareIcon className="mr-2" width={16} height={16} />{" "}
            {isSharing ? shareButtonTextClicked : shareButtonText}
          </button>
        </div>
      </nav>
    </header>
  );
}
