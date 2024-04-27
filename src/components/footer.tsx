export default function Footer() {
  return (
    <footer className="mt-12 text-md text-slate-500">
      <p className="mb-4">
        Have a recommendation for this generator?{" "}
        <a
          className="text-white "
          target="_blank"
          href="https://github.com/blakewilson/tsconfig.guide/issues/new"
        >
          Open an issue!
        </a>
      </p>

      <p className="">
        This project is made by{" "}
        <a className="text-white " href="https://blake.id" target="_blank">
          Blake Wilson
        </a>{" "}
        and is{" "}
        <a
          className="text-white "
          target="_blank"
          href="https://github.com/blakewilson/tsconfig.guide"
        >
          open source
        </a>
        .{" "}
        <a
          className="text-white "
          target="_blank"
          href="https://twitter.com/sundaycode"
        >
          Follow me on X
        </a>
        .
      </p>
    </footer>
  );
}
