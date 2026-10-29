const year = document.querySelector("#year");

if (year) {
	year.textContent = new Date().getFullYear();
}

// Scroll-reveal animations: sections and cards fade/slide in as you scroll,
// with siblings (e.g. project cards) staggering in one by one.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const targets = document.querySelectorAll(
	".section-heading, .project-item, .about-copy, .contact-copy, .contact-link, .contact-links"
);

if (!("IntersectionObserver" in window)) {
	targets.forEach((el) => el.classList.add("is-visible"));
} else if (reduceMotion) {
	// Reduced motion: show everything immediately, no animation.
} else {
	const groups = new Map();

	targets.forEach((el) => {
		el.classList.add("reveal");
		const index = groups.get(el.parentElement) ?? 0;
		groups.set(el.parentElement, index + 1);
		el.style.setProperty("--delay", `${Math.min(index * 90, 360)}ms`);
	});

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
	);

	targets.forEach((el) => observer.observe(el));
}
