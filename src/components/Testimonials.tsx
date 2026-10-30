import { useEffect, useState } from "react";
import { Star, ArrowUpRight, X } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { supabase } from "@/lib/supabase";

type Review = {
  id: string;
  name: string;
  service: string;
  rating: number;
  review: string;
  created_at: string;
};

const services = [
  "Full Project Writing",
  "Research Proposal",
  "Literature Review",
  "Editing & Proofreading",
  "Data Presentation",
  "Formatting & Documentation",
];

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    rating: 5,
    review: "",
  });

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, service, rating, review, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data);
    }

    setLoading(false);
  }

  function updateForm(
    field: keyof typeof form,
    value: string | number
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function submitReview(event: React.FormEvent) {
    event.preventDefault();

    if (!form.name || !form.email || !form.service || !form.review) {
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("reviews").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      service: form.service,
      rating: form.rating,
      review: form.review.trim(),
      status: "pending",
    });

    setSubmitting(false);

    if (error) {
      console.error(error);
      return;
    }

    setForm({
      name: "",
      email: "",
      service: "",
      rating: 5,
      review: "",
    });

    setShowForm(false);
    setSuccess(true);
  }

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <SectionHeading
        eyebrow="Client feedback"
        title="What clients say about working with us."
        description="Real experiences from people who have received research and academic project support."
      />

      {/* Reviews */}
      <div className="mt-14">
        {loading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-3xl border border-border bg-muted/30 px-6 py-14 text-center">
            <p className="font-display text-xl font-semibold">
              Be the first to leave a review.
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              If you've worked with us, we'd love to hear about your
              experience.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              Leave a Review
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <Reveal key={review.id} delay={index * 70}>
                  <article className="group h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`h-4 w-4 ${
                              starIndex < review.rating
                                ? "fill-current text-accent"
                                : "text-muted-foreground/20"
                            }`}
                          />
                        ))}
                      </div>

                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Verified
                      </span>
                    </div>

                    <p className="mt-6 text-sm leading-7 text-muted-foreground">
                      “{review.review}”
                    </p>

                    <div className="mt-8 border-t border-border pt-5">
                      <p className="font-semibold">{review.name}</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {review.service}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-muted/40 p-7 sm:flex-row sm:items-center sm:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Worked with us?
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-semibold">
                    Share your experience.
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Your review will be checked before it is published.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                >
                  Leave a Review
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </>
        )}
      </div>

      {/* Review Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowForm(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-border bg-background p-7 shadow-2xl sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-muted"
              aria-label="Close review form"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Client feedback
            </p>

            <h3 className="mt-3 font-display text-3xl font-semibold">
              Leave a Review
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Tell us about your experience. Your review will be reviewed
              before appearing publicly.
            </p>

            <form onSubmit={submitReview} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-medium">
                  Your name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) =>
                    updateForm("name", event.target.value)
                  }
                  placeholder="John Doe"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Email address
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    updateForm("email", event.target.value)
                  }
                  placeholder="john@example.com"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Service received
                </label>

                <select
                  required
                  value={form.service}
                  onChange={(event) =>
                    updateForm("service", event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
                >
                  <option value="">Select a service</option>

                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Your rating
                </label>

                <div className="mt-3 flex gap-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const rating = index + 1;

                    return (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => updateForm("rating", rating)}
                        aria-label={`${rating} star${
                          rating > 1 ? "s" : ""
                        }`}
                      >
                        <Star
                          className={`h-6 w-6 transition-transform hover:scale-110 ${
                            rating <= form.rating
                              ? "fill-current text-accent"
                              : "text-muted-foreground/20"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Your review
                </label>

                <textarea
                  required
                  rows={5}
                  value={form.review}
                  onChange={(event) =>
                    updateForm("review", event.target.value)
                  }
                  placeholder="Tell us about your experience..."
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
                />
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                Reviews are manually checked before publication. By
                submitting, you agree that your name, service and review may
                be displayed on this website if approved.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="fixed bottom-5 right-5 z-[60] max-w-sm rounded-2xl border border-border bg-background p-5 shadow-2xl">
          <p className="font-semibold">Thank you for your review!</p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Your review has been submitted and is awaiting approval.
          </p>

          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="mt-4 text-xs font-semibold underline underline-offset-4"
          >
            Dismiss
          </button>
        </div>
      )}
    </section>
  );
}