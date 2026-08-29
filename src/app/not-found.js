import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black px-5 py-24 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[700px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hr-red/12 blur-[140px]"
      />

      <div className="relative">
        <p className="font-body text-[13px] uppercase tracking-[0.18em] text-hr-red">
          404
        </p>
        <h1 className="mt-4 text-[32px] font-semibold tracking-tight sm:text-[46px]">
          This page doesn&rsquo;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md font-body text-[15px] leading-relaxed text-white/55">
          The page you were looking for may have moved, or never existed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-black transition-colors hover:bg-white/85"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-hr-red" />
          Back to home
        </Link>
      </div>
    </section>
  );
}
