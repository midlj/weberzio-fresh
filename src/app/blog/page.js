import Link from "next/link";

import PageHeader from "@/components/landing/PageHeader";
import CTA from "@/components/landing/CTA";
import { posts } from "@/data/posts";

export const metadata = {
  title: "Web Development Blog & Engineering Insights",
  description:
    "Writing on how we build, design, and ship software at Weberzio.",
  alternates: { canonical: "/blog" },
};

function PostMeta({ post, className = "" }) {
  return (
    <p className={`font-body text-[12.5px] text-neutral-400 ${className}`}>
      <span className="font-semibold uppercase tracking-[0.12em] text-[#c02a20]">
        {post.category}
      </span>
      <span className="mx-2" aria-hidden="true">
        ·
      </span>
      {post.dateLabel}
      <span className="mx-2" aria-hidden="true">
        ·
      </span>
      {post.readTime}
    </p>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Web development notes from the workshop."
        intro="Writing on how we build, design, and ship software at Weberzio."
      >
        <p
          data-hero-copy
          className="mt-6 font-body text-[13px] text-neutral-400"
        >
          Latest — {posts.length} posts
        </p>
      </PageHeader>

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-2xl border border-neutral-200 bg-neutral-50 p-8 transition-colors hover:border-[#e23a2e]/50 hover:bg-white sm:p-12"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
              Featured
            </p>
            <PostMeta post={featured} className="mt-5" />
            <h2 className="mt-4 max-w-3xl text-[26px] font-semibold leading-tight tracking-tight text-neutral-900 transition-colors group-hover:text-[#c02a20] sm:text-[34px]">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-2xl font-body text-[15px] leading-relaxed text-neutral-500">
              {featured.excerpt}
            </p>
            <p className="mt-7 inline-flex items-center gap-2 font-display text-[14px] font-semibold text-neutral-900 transition-colors group-hover:text-[#c02a20]">
              Read article
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </Link>

          {/* Remaining posts */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-neutral-200 p-8 transition-colors hover:border-[#e23a2e]/50 hover:bg-neutral-50"
              >
                <PostMeta post={post} />
                <h3 className="mt-4 text-[20px] font-semibold leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-[#c02a20]">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 font-body text-[14px] leading-relaxed text-neutral-500">
                  {post.excerpt}
                </p>
                <p className="mt-6 font-body text-[12.5px] text-neutral-400">
                  {post.author}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
