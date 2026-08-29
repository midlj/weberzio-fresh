import Link from "next/link";
import { notFound } from "next/navigation";

import CTA from "@/components/landing/CTA";
import JsonLd, { ORG_ID, breadcrumbs } from "@/components/seo/JsonLd";
import { posts, getPost } from "@/data/posts";
import { site } from "@/data/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const others = posts.filter((item) => item.slug !== post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    articleSection: post.category,
    inLanguage: "en",
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbs(site.url, [
          ["Home", "/"],
          ["Blog", "/blog"],
          [post.title, null],
        ])}
      />
      {/* Article header */}
      <section className="relative overflow-hidden bg-white px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[760px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e23a2e]/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-[#c02a20]">
            {post.category}
          </p>
          <h1 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight text-neutral-900 sm:text-[42px]">
            {post.title}
          </h1>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-neutral-500 sm:text-[16px]">
            {post.excerpt}
          </p>
          <p className="mt-6 border-t border-neutral-100 pt-6 font-body text-[13px] text-neutral-400">
            By <span className="font-medium text-neutral-700">{post.author}</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {post.dateLabel}
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {post.readTime}
          </p>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {post.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-[21px] font-semibold tracking-tight text-neutral-900 sm:text-[24px]">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="font-body text-[15px] leading-[1.8] text-neutral-600 sm:text-[16px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-neutral-100 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-display text-[14px] font-semibold text-neutral-900 transition-colors hover:text-[#c02a20]"
            >
              <span aria-hidden="true">←</span>
              All posts
            </Link>
          </div>
        </div>
      </section>

      {/* Keep reading */}
      <section className="border-t border-neutral-100 bg-neutral-50 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[22px] font-semibold tracking-tight text-neutral-900">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group rounded-2xl border border-neutral-200 bg-white p-7 transition-colors hover:border-[#e23a2e]/50"
              >
                <p className="font-body text-[12px] text-neutral-400">
                  <span className="font-semibold uppercase tracking-[0.12em] text-[#c02a20]">
                    {other.category}
                  </span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  {other.dateLabel}
                </p>
                <h3 className="mt-3 text-[17px] font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-[#c02a20]">
                  {other.title}
                </h3>
                <p className="mt-2.5 font-body text-[13.5px] leading-relaxed text-neutral-500">
                  {other.excerpt}
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
