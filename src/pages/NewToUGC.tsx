import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import Footer from "@/components/Footer";
import BrandWatermark from "@/components/BrandWatermark";
import { trackClick } from "@/lib/analytics";
import jcMark from "@/assets/jc-mark.png";
import portrait from "@/assets/hero-portrait.jpg";

// Web version of Jess's "Brand's guide to working with me" PDF, for smaller
// brands new to UGC. The wording follows the PDF, which is also offered as a
// download from this page.
const EMAIL = "my.lifeafterlaw@gmail.com";
const PDF = "/Jess-Cousin-Guide-to-UGC.pdf";
const OX = "#5C1220";
const INK = "#2E1419";

const receive = [
  "An edited vertical video, 15 to 60 seconds",
  "An opening that catches attention",
  "A clear message about your product",
  "A next step for viewers, like visiting your website",
];

const usage = [
  ["Social posts (no paid promotion)", "Included"],
  ["Paid advertising", "Additional fee"],
  ["Longer use or raw footage", "Quoted separately"],
  ["Copyright", "Stays with me"],
];

const steps = [
  ["Brief and ideas", "We agree your goals and direction."],
  ["Signed agreement", "Timings, usage and payment, agreed in writing."],
  ["Product delivery", "If needed, I confirm where to send it."],
  ["Filming and draft", "Draft typically 5 to 7 working days after delivery."],
  ["Feedback and edits", "Two rounds of minor edits included."],
  ["Final files", "Delivered via Google Drive once paid."],
];

const compare = [
  { label: "UGC creation", who: "Your brand, on its channels or in ads.", buy: "Videos and agreed usage rights.", highlight: true },
  { label: "Influencer posting", who: "The creator, on their account.", buy: "A post shared with the creator’s audience.", highlight: false },
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-heading text-2xl sm:text-3xl mb-3" style={{ color: OX }}>{children}</h2>
);

const Rule = () => <hr className="my-10 border-0 h-px" style={{ background: "rgba(92,18,32,0.14)" }} />;

const PdfButton = ({ tone }: { tone: "light" | "dark" }) => (
  <a
    href={PDF}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackClick("Download UGC guide PDF", "new-to-ugc")}
    className="inline-flex items-center gap-2 font-body text-sm font-semibold px-5 py-2.5 rounded-full border-2 transition-colors"
    style={
      tone === "light"
        ? { borderColor: OX, color: OX }
        : { borderColor: "#F4ECDC", color: "#F4ECDC" }
    }
  >
    <Download className="w-4 h-4" />
    Download as PDF
  </a>
);

const NewToUGC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "New to UGC? A brand’s guide to working with me | Jess Cousin";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <>
      {/* Header band */}
      <header className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #5C1220 0%, #470c17 100%)" }}>
        <BrandWatermark />
        <div className="container max-w-4xl relative z-10 pt-6 pb-10">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" aria-label="Jess Cousin home">
              <img src={jcMark} alt="JC — Jess Cousin monogram" width={36} height={36} className="w-9 h-9" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-body text-sm font-medium transition-colors"
              style={{ color: "rgba(244,236,220,0.85)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to portfolio
            </Link>
          </div>
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="font-heading text-2xl sm:text-4xl leading-tight" style={{ color: "#FFFAF0" }}>
                Jess Cousin <span style={{ color: "rgba(244,236,220,0.5)" }}>|</span>{" "}
                <span className="italic" style={{ color: "#F2B8B5" }}>Lawyer turned UGC creator</span>
              </p>
              <p className="mt-2 font-body text-xs sm:text-sm tracking-[0.12em]" style={{ color: "rgba(244,236,220,0.7)" }}>
                Beauty · Wellness · Tech · Travel · Lifestyle
              </p>
            </div>
            <img
              src={portrait}
              alt="Jess Cousin"
              className="hidden sm:block w-24 h-24 rounded-full object-cover shrink-0"
              style={{ border: "3px solid #F2B8B5", objectPosition: "50% 20%" }}
            />
          </div>
        </div>
      </header>

      <main style={{ background: "#F4ECDC", color: INK }}>
        <div className="container max-w-4xl py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <p className="font-body text-xs uppercase tracking-[0.28em]" style={{ color: "rgba(46,20,25,0.6)" }}>
              A brand&rsquo;s guide to working with&nbsp;me
            </p>
            <p className="flex items-baseline gap-3">
              <span className="font-body text-xs uppercase tracking-[0.28em]" style={{ color: "rgba(46,20,25,0.6)" }}>
                See my work
              </span>
              <Link
                to="/#portfolio"
                className="font-heading text-lg underline underline-offset-4 decoration-1"
                style={{ color: OX }}
              >
                Example videos &rarr;
              </Link>
            </p>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4" style={{ color: OX }}>
            Show customers what makes your product worth choosing.
          </h1>
          <p className="font-body text-base leading-relaxed max-w-3xl">
            Good content is more than filming a product: it&rsquo;s knowing what grabs attention, what to say and what
            viewers should do next. I shape the idea with you, then film and edit natural, relatable videos. As a
            former lawyer, I bring careful attention to your brief and clear communication.
          </p>
          <div className="mt-6">
            <PdfButton tone="light" />
          </div>

          <Rule />

          <H2>What is UGC, and who posts it?</H2>
          <p className="font-body text-base mb-6">
            UGC (user-generated content) shows real people using products, so it feels like a recommendation.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {compare.map((c) => (
              <div
                key={c.label}
                className="rounded-xl p-5 border"
                style={
                  c.highlight
                    ? { background: "#F0DDCF", borderColor: "rgba(92,18,32,0.18)" }
                    : { background: "#FFFDF9", borderColor: "rgba(46,20,25,0.10)" }
                }
              >
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: c.highlight ? OX : "rgba(46,20,25,0.6)" }}>
                  {c.label}
                </p>
                <p className="font-body text-sm font-semibold">Who posts it?</p>
                <p className="font-body text-sm mb-3">{c.who}</p>
                <p className="font-body text-sm font-semibold">What are you buying?</p>
                <p className="font-body text-sm">{c.buy}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-sm mt-4" style={{ color: "rgba(46,20,25,0.65)" }}>
            Posting on my own account is a separate, paid service.
          </p>

          <Rule />

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <H2>What you receive</H2>
              <ul className="space-y-2 mt-4">
                {receive.map((r) => (
                  <li key={r} className="flex gap-3 font-body text-base">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#C98A8F" }} />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="font-body text-sm mt-4" style={{ color: "rgba(46,20,25,0.65)" }}>
                Start with one; ongoing collaborations work best.
              </p>
            </div>
            <div>
              <H2>Where you can use it</H2>
              <dl className="mt-4 divide-y" style={{ borderColor: "rgba(92,18,32,0.12)" }}>
                {usage.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-2.5" style={{ borderColor: "rgba(92,18,32,0.12)" }}>
                    <dt className="font-body text-base">{k}</dt>
                    <dd className="font-body text-sm font-semibold text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <Rule />

          <H2>How a project works</H2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-6">
            {steps.map(([title, desc], i) => (
              <li key={title} className="flex gap-4">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-heading text-base"
                  style={{ border: `1.5px solid ${OX}`, color: OX }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-body text-base font-semibold">{title}</p>
                  <p className="font-body text-sm" style={{ color: "rgba(46,20,25,0.7)" }}>{desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <Rule />

          <figure className="rounded-r-xl p-6 sm:p-8" style={{ background: "#F0DDCF", borderLeft: `4px solid ${OX}` }}>
            <blockquote className="font-heading text-lg sm:text-xl leading-relaxed" style={{ color: INK }}>
              &ldquo;She had a fast turnaround, delivered everything promptly, and was highly professional and
              detail-oriented throughout the process. &hellip; We&rsquo;d be happy to work with her again.&rdquo;
            </blockquote>
            <figcaption className="font-body text-sm mt-4" style={{ color: "rgba(46,20,25,0.7)" }}>
              <span className="font-semibold" style={{ color: INK }}>Ef Barte</span>, Marketing Coordinator, Hume Health
              {" · "}
              <Link to="/" className="underline underline-offset-2">Read the full review</Link>
            </figcaption>
          </figure>
        </div>
      </main>

      {/* Call to action */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #5C1220 0%, #470c17 100%)" }}>
        <BrandWatermark />
        <div className="container max-w-4xl relative z-10 py-14 sm:py-16 text-center sm:text-left">
          <h2 className="font-heading text-3xl sm:text-4xl mb-3" style={{ color: "#F4ECDC" }}>
            Let&rsquo;s create content for your brand.
          </h2>
          <p className="font-body text-base max-w-xl mx-auto sm:mx-0" style={{ color: "rgba(244,236,220,0.75)" }}>
            Send me your website or product link and any target date, and ask me about my rates. I&rsquo;ll come back
            with ideas and a&nbsp;quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-7 items-center sm:items-start">
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent("UGC enquiry")}`}
              onClick={() => trackClick("Email me", "new-to-ugc")}
              className="inline-flex items-center font-body font-semibold px-7 py-3 rounded-full border-2 transition-colors"
              style={{ background: "#F4ECDC", borderColor: "#F4ECDC", color: OX }}
            >
              Email me
            </a>
            <Link
              to="/#portfolio"
              className="inline-flex items-center font-body font-semibold px-7 py-3 rounded-full border-2 transition-colors"
              style={{ borderColor: "#F4ECDC", color: "#F4ECDC" }}
            >
              See the portfolio
            </Link>
            <PdfButton tone="dark" />
          </div>
          <p className="font-body text-sm mt-6" style={{ color: "rgba(244,236,220,0.6)" }}>
            {EMAIL} · @MyLifeAfterLaw
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NewToUGC;
