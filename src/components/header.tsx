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
    <header className={classNames("relative z-40 w-full")}>
      <nav
        className="flex w-full justify-between items-center p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-2xl font-semibold">TSConfig Guide</span>
          </a>
        </div>
        <div className="">
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
              isSharing
                ? "bg-green-100 text-green-700 hover:bg-green-100"
                : "bg-white/10 hover:bg-white/20 text-white",
              "flex items-center rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm"
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
