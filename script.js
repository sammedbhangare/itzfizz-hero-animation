gsap.registerPlugin(ScrollTrigger);

// Split headline into letters for the staggered reveal
const headline = document.querySelector(".headline");
headline.innerHTML = headline.textContent
  .split("")
  .map(c => (c === " " ? '<span class="sp"></span>' : `<span class="ch">${c}</span>`))
  .join("");

// 1) Intro animation on load
const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
intro
  .from(".ch", { yPercent: 70, opacity: 0, duration: 0.9, stagger: 0.05 })
  .from(".stat", { y: 30, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.3");

// 2) Scroll-driven animation (tied to scroll progress, not time)
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=300%",
      pin: ".stage",
      scrub: 1,          // 1s smoothing/interpolation
      invalidateOnRefresh: true,
    },
  });

  tl.to(".car", { y: () => -window.innerHeight * 0.85, scale: 1.15, ease: "none" }, 0)
    .to(".lines", { yPercent: -50, ease: "none" }, 0)
    .to(".headline", { scale: 1.12, ease: "none" }, 0);
});