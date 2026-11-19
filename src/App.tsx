import { useEffect, useRef } from "react";
import "./App.css";
import {
  GAME_DOWNLOAD_URL,
  GAME_FILE_SIZE,
  GAME_RELEASE_STATUS,
  GAME_VERSION,
  OFFICIAL_DOCUMENTS,
  isValidResourceUrl,
} from "./config/resources";

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isGameAvailable = isValidResourceUrl(GAME_DOWNLOAD_URL);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealTargets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const parallaxSections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-parallax]")
    );

    if (prefersReducedMotion) {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    root.classList.add("js-scroll-ready");

    const revealIfInView = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 1.05 && rect.bottom >= -40) {
        el.classList.add("is-visible");
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "120px 0px 120px 0px",
      }
    );

    revealTargets.forEach((el) => {
      if (!revealIfInView(el)) {
        observer.observe(el);
      }
    });

    let rafId = 0;

    const updateScrollMotion = () => {
      rafId = 0;
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 1;

      root.style.setProperty("--scroll-y", String(scrollY));

      revealTargets.forEach((el) => {
        if (!el.classList.contains("is-visible") && revealIfInView(el)) {
          observer.unobserve(el);
        }
      });

      parallaxSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const centerOffset =
          (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
        const clamped = Math.max(-1.2, Math.min(1.2, centerOffset));
        section.style.setProperty("--section-offset", clamped.toFixed(4));
      });
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScrollMotion);
      }
    };

    updateScrollMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="website" ref={rootRef}>
      <div className="site-bg-forest" aria-hidden="true"></div>
      <div className="vhs-noise" aria-hidden="true"></div>
      <div className="vhs-tracking-line" aria-hidden="true"></div>

      <nav className="navbar">
        <a href="#home" className="logo">
          JOJO'S <span>GAS STATION</span>
        </a>

        <div className="nav-links">
          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#gallery">GALLERY</a>
          <a href="#gameplay">GAMEPLAY</a>
          <a href="#download">DOWNLOAD</a>
          <a href="#documents">DOCUMENTS</a>
          <a href="#team">OUR TEAM</a>
        </div>
      </nav>

      <section className="hero" id="home" data-parallax>
        <div className="hero-forest" aria-hidden="true"></div>
        <div className="hero-fog" aria-hidden="true"></div>
        <div className="hero-overlay" aria-hidden="true"></div>

        <div className="hero-cam-hud" aria-hidden="true">
          <span className="rec-dot"></span>
          <span>REC // CAM_EXT_01</span>
        </div>

        <div className="hero-content">
          <p className="eyebrow" data-reveal data-delay="0">
            A FIRST-PERSON HORROR EXPERIENCE
          </p>
          <h1
            data-text="NIGHTSHIFT: JOJO'S GAS STATION"
            data-reveal
            data-delay="1"
          >
            NIGHTSHIFT:
            <br />
            <span>JOJO'S GAS STATION</span>
          </h1>

          <p className="hero-description" data-reveal data-delay="2">
            A quiet night. An isolated gas station.
            <br />
            Something is waiting in the darkness.
          </p>

          <a
            href="#about"
            className="primary-button"
            data-reveal
            data-delay="3"
          >
            EXPLORE THE GAME
          </a>
        </div>

        <div className="hero-bottom" data-reveal data-delay="3">
          <span>DON'T TRUST THE NIGHT</span>
          <span>01 — THE BEGINNING</span>
        </div>
      </section>

      <section className="intro section" id="about" data-parallax>
        <p className="section-label" data-reveal data-delay="0">
          WELCOME TO THE NIGHT SHIFT
        </p>
        <h2 data-reveal data-delay="1">
          YOUR JOB IS SIMPLE.
          <br />
          <span>JUST SURVIVE THE NIGHT.</span>
        </h2>

        <p className="section-description" data-reveal data-delay="2">
          Deep inside a remote forest stands Jojo's Gas Station.
          What seems like an ordinary night-shift job slowly turns
          into a terrifying experience. Serve customers, maintain
          the store, and face the strange things hiding in the dark.
        </p>
      </section>

      <section className="trailer section" id="trailer" data-parallax>
        <p className="section-label" data-reveal data-delay="0">
          GET A GLIMPSE OF THE NIGHT
        </p>
        <h2 data-reveal data-delay="1">OFFICIAL GAME TRAILER</h2>

        <div className="video-placeholder trailer-frame">
          <div className="vhs-hud" aria-hidden="true">
            <span className="vhs-rec">
              <span className="rec-dot"></span> REC
            </span>
            <span>CAM 01 // TRAILER_TAPE</span>
          </div>

          <video
            className="trailer-video"
            src="/videos/trailer.mp4"
            controls
            preload="metadata"
            playsInline
            poster="/images/gas-station.png"
          >
            <source src="/videos/trailer.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="gallery section" id="gallery" data-parallax>
        <div className="gallery-backdrop" aria-hidden="true"></div>

        <p className="section-label" data-reveal data-delay="0">
          A LOOK INTO THE DARKNESS
        </p>
        <h2 data-reveal data-delay="1">GAME GALLERY</h2>
        <p className="section-description" data-reveal data-delay="2">
          Explore the places where your night shift unfolds.
        </p>

        <div className="gallery-grid">
          <div
            className="gallery-card gallery-store"
            data-reveal
            data-delay="1"
            title="Inside the Store — Actual convenience store interior with shelves, refrigerators, cashier counter, and fluorescent lighting."
          >
            <div className="gallery-meta">
              <span className="gallery-title">
                <span className="gallery-arrow" aria-hidden="true">▸</span>
                01 / INSIDE THE STORE
              </span>
              <p className="gallery-caption">
                Convenience store interior with shelves, refrigerators, cashier counter, and fluorescent lighting.
              </p>
            </div>
          </div>

          <div
            className="gallery-card gallery-station"
            data-reveal
            data-delay="2"
            title="The Gas Station — Actual gas station exterior surrounded by a dark forest."
          >
            <div className="gallery-meta">
              <span className="gallery-title">
                <span className="gallery-arrow" aria-hidden="true">▸</span>
                02 / THE GAS STATION
              </span>
              <p className="gallery-caption">
                Isolated gas station exterior surrounded by a dark, silent forest.
              </p>
            </div>
          </div>

          <div
            className="gallery-card gallery-house"
            data-reveal
            data-delay="3"
            title="The House — Concept scene matching the game's horror atmosphere."
          >
            <div className="gallery-meta">
              <span className="gallery-title">
                <span className="gallery-arrow" aria-hidden="true">▸</span>
                03 / THE HOUSE
              </span>
              <p className="gallery-caption">
                Dimly lit interior shrouded in shadow and late-night dread.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gameplay section" id="gameplay" data-parallax>
        <p className="section-label" data-reveal data-delay="0">
          EXPERIENCE THE GAME
        </p>
        <h2 data-reveal data-delay="1">GAMEPLAY FOOTAGE</h2>

        <div className="video-placeholder trailer-frame gameplay-video">
          <div className="vhs-hud" aria-hidden="true">
            <span className="vhs-rec">
              <span className="rec-dot"></span> REC
            </span>
            <span>CAM 02 // NIGHT_SHIFT</span>
          </div>

          <video
            className="trailer-video"
            src="/videos/play.mp4"
            controls
            preload="metadata"
            playsInline
            poster="/images/store.png"
          >
            <source src="/videos/play.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="download section" id="download" data-parallax>
        <p className="section-label" data-reveal data-delay="0">
          SYSTEM ARCHIVE // GAME BUILD
        </p>
        <h2 data-reveal data-delay="1">
          DOWNLOAD <span>THE GAME</span>
        </h2>
        <p className="section-description" data-reveal data-delay="2">
          Your night shift is waiting. Prepare yourself before entering the darkness.
        </p>

        <div className="archive-panel" data-reveal data-delay="3">
          <div className="archive-topbar">
            <span className="archive-node">
              <span
                className={`status-dot ${isGameAvailable ? "is-available" : ""}`}
                aria-hidden="true"
              ></span>
              SYSTEM ARCHIVE // DISTRIBUTION_NODE_01
            </span>
            <span
              className={`archive-badge ${isGameAvailable ? "is-available" : ""}`}
            >
              {isGameAvailable ? "ACCESS GRANTED" : GAME_RELEASE_STATUS}
            </span>
          </div>

          <div className="archive-specs">
            <div className="spec-item">
              <span className="spec-label">GAME TITLE</span>
              <span className="spec-value">Nightshift: Jojo's Gas Station</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">GENRE</span>
              <span className="spec-value">
                Psychological Horror / First-Person Horror
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">PLATFORM</span>
              <span className="spec-value">Windows PC</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">GAME VERSION</span>
              <span className="spec-value">{GAME_VERSION}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">FILE SIZE</span>
              <span className="spec-value">{GAME_FILE_SIZE}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">RELEASE STATUS</span>
              <span
                className={`spec-value spec-status ${isGameAvailable ? "is-available" : ""}`}
              >
                {isGameAvailable ? "AVAILABLE NOW" : GAME_RELEASE_STATUS}
              </span>
            </div>
          </div>

          <div className="archive-actions">
            <span className="archive-status-text">
              {isGameAvailable
                ? "FILE STATUS: AVAILABLE — READY FOR RETRIEVAL"
                : "FILE STATUS: UNAVAILABLE — BUILD NOT YET PUBLISHED"}
            </span>

            {isGameAvailable ? (
              <a
                href={GAME_DOWNLOAD_URL}
                className="primary-button download-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOWNLOAD GAME
              </a>
            ) : (
              <button
                type="button"
                className="primary-button download-button is-disabled"
                disabled
                aria-disabled="true"
              >
                DOWNLOAD GAME
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="documents section" id="documents" data-parallax>
        <p className="section-label" data-reveal data-delay="0">
          RESTRICTED DATABASE // OFFICIAL FILES
        </p>
        <h2 data-reveal data-delay="1">
          OFFICIAL DOCUMENTS <span>&amp; RESOURCES</span>
        </h2>
        <p className="section-description" data-reveal data-delay="2">
          Project files, documentation, and additional information.
        </p>

        <div className="documents-grid">
          {OFFICIAL_DOCUMENTS.map((doc, index) => {
            const isAvailable = isValidResourceUrl(doc.url);
            const delay = (index % 2) + 1;

            return (
              <article
                key={doc.id}
                className={`document-card ${isAvailable ? "is-available" : ""}`}
                data-reveal
                data-delay={delay}
              >
                <div className="document-topbar">
                  <span className="document-code">
                    OFFICIAL FILE // {doc.fileCode}
                  </span>
                  <span
                    className={`document-badge ${isAvailable ? "is-available" : ""}`}
                  >
                    {isAvailable
                      ? "FILE STATUS: AVAILABLE"
                      : "FILE STATUS: UNAVAILABLE"}
                  </span>
                </div>

                <div className="document-body">
                  <div className="document-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    >
                      <path d="M14 2H6a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                      <polyline points="14 2 14 7 19 7" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                      <line x1="8" y1="16" x2="13" y2="16" />
                    </svg>
                  </div>

                  <div className="document-info">
                    <h3>{doc.title}</h3>
                    <p>{doc.description}</p>
                  </div>
                </div>

                <div className="document-footer">
                  <span
                    className={`document-availability ${isAvailable ? "is-available" : ""}`}
                  >
                    {isAvailable ? "ACCESS GRANTED" : "FILE NOT AVAILABLE"}
                  </span>

                  {isAvailable ? (
                    <a
                      href={doc.url}
                      className="document-button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VIEW / DOWNLOAD
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="document-button is-disabled"
                      disabled
                      aria-disabled="true"
                    >
                      VIEW / DOWNLOAD
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="team section" id="team" data-parallax>
        <p className="section-label" data-reveal data-delay="0">
          THE PEOPLE BEHIND THE NIGHT
        </p>
        <h2 data-reveal data-delay="1">MEET THE DEVELOPERS</h2>
        <p className="section-description" data-reveal data-delay="2">
          We are the team behind Nightshift: Jojo's Gas Station.
          This game is our take on a chilling first-person horror experience.
        </p>

        <div className="team-placeholder" data-reveal data-delay="3">
          <div className="team-frame">
            <img
              src="/images/developers.jpg"
              alt="Classified Personnel Log — Developers: Jacob, Glessly, Aliyah, Addy, Aiza, Emmanuela"
              className="team-photo"
              loading="lazy"
            />
          </div>
          <p className="team-roster" aria-hidden="true">
            JACOB · GLESSLY · ALIYAH · ADDY · AIZA · EMMANUELA
          </p>
        </div>
      </section>

      <footer data-parallax>
        <h3 data-reveal data-delay="0">NIGHTSHIFT: JOJO'S GAS STATION</h3>
        <p data-reveal data-delay="1">THE NIGHT IS NEVER WHAT IT SEEMS.</p>
        <span data-reveal data-delay="2">© 2026 NIGHTSHIFT GAME PROJECT</span>
      </footer>
    </div>
  );
}

export default App;
