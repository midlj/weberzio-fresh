import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="text-[34px] font-extrabold tracking-tight">404</p>
      <h1 className="mt-1 text-[16px] font-bold">Page not found</h1>
      <p className="mt-1.5 text-[13px] text-gray-500">
        That page doesn&apos;t exist, or it moved somewhere else.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-gray-800"
      >
        Back home
      </Link>
    </main>
  );
}
