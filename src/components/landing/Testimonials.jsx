import { testimonials } from "@/data/testimonials";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="text-[12px] text-[#f5c451]">
          ★
        </span>
      ))}
    </div>
  );
}

function Card({ item }) {
  return (
    <figure className="w-[330px] shrink-0 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:w-[380px]">
      <Stars />
      <blockquote className="mt-4 font-body text-[15px] leading-relaxed text-neutral-700">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t border-neutral-200 pt-4">
        <p className="text-[14px] font-medium text-neutral-900">{item.name}</p>
        <p className="mt-0.5 font-body text-[12.5px] text-neutral-500">
          {item.role}
        </p>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-16 overflow-hidden bg-white px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-body text-[13px] uppercase tracking-[0.18em] text-[#e23a2e]">
            Testimonials
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-neutral-800 sm:text-[46px]">
            What our clients
            <br />
            are saying.
          </h2>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-neutral-500">
            A few kind words from the founders, product leaders, and
            engineering teams we&apos;ve had the privilege of building with.
          </p>
        </div>
      </div>

      {/* Track is duplicated so the -50% marquee translate loops seamlessly. */}
      <div className="mt-14 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <div className="hr-marquee flex w-max gap-5">
          {[...testimonials, ...testimonials].map((item, index) => (
            <Card key={`${item.name}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
