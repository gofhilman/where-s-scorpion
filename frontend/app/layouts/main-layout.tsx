import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="mx-auto flex min-h-screen flex-col gap-10 px-5 py-12">
      <Outlet />
      <footer className="mt-auto flex flex-col items-center">
        <p>
          Game by{" "}
          <a
            href="https://github.com/gofhilman"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hilman Fikry
          </a>
        </p>
        <p>
          Illustrations by{" "}
          <a
            href="https://gus-morais.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gus Morais
          </a>
        </p>
      </footer>
    </div>
  );
}
