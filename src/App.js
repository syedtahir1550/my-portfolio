import { useEffect, useState } from 'react';
import './App.css';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

const skillGroups = [
  {
    title: 'Backend',
    items: ['Java', 'Spring Boot', 'Microservices', 'Hibernate', 'REST APIs', 'Google Guice'],
  },
  {
    title: 'AI and Data',
    items: ['Google Gemini API', 'Prompt Engineering', 'MySQL', 'Spanner Database', 'PostgreSQL'],
  },
  {
    title: 'Cloud and DevOps',
    items: ['Google Cloud Platform', 'Azure', 'Kafka', 'Docker'],
  },
  {
    title: 'Frontend and Testing',
    items: ['React.js', 'HTML5', 'CSS3', 'JUnit', 'Mockito', 'Pytest', 'Jest', 'Postman'],
  },
];

const experience = [
  {
    company: 'Tata Consultancy Services',
    role: 'Software Engineer',
    period: 'Sep 2025 - Present',
    highlight:
      'Contributing to the USAA onboarding journey by building reliable services for customer prefill and account data retrieval.',
    bullets: [
      'Built and enhanced Spring Boot microservices that support customer lookup and prefill workflows during onboarding.',
      'Designed REST APIs and validation flows around mobile number and SSN checks to improve accuracy and reduce manual input.',
      'Integrated event-driven processing for downstream verification and service updates across dependent systems.',
      'Strengthened logging, retries, and exception handling to improve production reliability and traceability.',
    ],
  },
  {
    company: 'Cognizant Technology Solutions',
    role: 'Associate',
    period: 'Sep 2024 - Jul 2025',
    highlight:
      'Delivered sentiment and feedback analysis features for a Google support workflow, with a focus on production readiness and usable insights.',
    bullets: [
      'Built backend flows for sentiment analysis and feedback analysis to help teams evaluate customer interactions at scale.',
      'Designed prompt structures and response patterns that improved consistency across generated outputs.',
      'Optimized Spanner queries and service integration points for efficient storage and retrieval of analysis results.',
      'Improved the Angular experience for reviewing outputs and capturing structured feedback from users.',
    ],
  },
  {
    company: 'Cognizant Technology Solutions',
    role: 'Programmer Analyst',
    period: 'Sep 2023 - Sep 2024',
    highlight:
      'Worked on case summarization and feedback analysis features for a Google project, combining service development with user-facing workflow improvements.',
    bullets: [
      'Built service components that supported case summarization workflows and reduced the effort needed to review complex support cases.',
      'Developed Spring Boot APIs and data access layers for summary retrieval, feedback capture, and related case operations.',
      'Connected frontend modules with backend services to streamline review flows and improve visibility for end users.',
      'Collaborated across delivery teams to refine features, resolve issues, and keep releases stable in production environments.',
    ],
  },
  {
    company: 'Cognizant Technology Solutions',
    role: 'Programmer Analyst Trainee',
    period: 'Sep 2022 - Sep 2023',
    highlight:
      'Built early delivery experience on a Google project by supporting playbooks, parsers, and core application workflows used by internal teams.',
    bullets: [
      'Worked on parser logic and supporting services to structure operational data for downstream processing and case handling.',
      'Contributed to playbook-related features that helped standardize troubleshooting steps and internal support workflows.',
      'Assisted with backend development, testing, and defect fixes across shared project modules.',
      'Strengthened core engineering fundamentals by working closely with senior developers on implementation and release tasks.',
    ],
  },
];

const projects = [
  {
    title: 'USAA Prefill Feature',
    type: 'Team Delivery',
    description:
      'A production onboarding feature delivered for USAA that streamlines customer prefill through validated lookup flows, service integration, and dependable backend orchestration.',
    stack: ['Spring Boot', 'Microservices', 'Kafka', 'REST APIs'],
  },
  {
    title: 'Sentiment Score Analysis',
    type: 'Production AI Feature',
    description:
      'An LLM-assisted sentiment evaluation workflow that scores customer case comments with explainable output and feedback loops for support teams.',
    stack: ['Google Gemini', 'Spring Boot', 'Spanner', 'Reactjs'],
  },
  {
    title: 'AI Case Summarization Platform',
    type: 'Production AI Feature',
    description:
      'A case summarization system that reduces reading time for support agents by combining prompt design, backend services, and real-time frontend insights.',
    stack: ['Google Gemini', 'Spring Boot', 'Reactjs', 'MySQL', 'Spanner'],
  },
];

const certifications = [
  'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
  'Microsoft Certified: Azure AI Engineer Associate',
  'Hackerrank Certified: Java Programming',
  'Top 10 percent on LeetCode with solutions beating 92.7 percent of submissions',
  'Cognizant Java Full Stack Developer training completion',
];

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [showHeader, setShowHeader] = useState(false);
  const [showConversationMenu, setShowConversationMenu] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    elements.forEach((element) => revealObserver.observe(element));

    return () => {
      elements.forEach((element) => revealObserver.unobserve(element));
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const syncHeader = () => {
      setShowHeader(window.scrollY > 80);
    };

    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });

    return () => window.removeEventListener('scroll', syncHeader);
  }, []);

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (!event.target.closest('.conversation-menu')) {
        setShowConversationMenu(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const syncActiveSection = () => {
      const probeY = window.innerHeight * 0.32;
      const currentSection =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= probeY && rect.bottom >= probeY;
        }) ?? sections[0];

      if (currentSection?.id) {
        setActiveSection(currentSection.id);
      }
    };

    syncActiveSection();
    window.addEventListener('scroll', syncActiveSection, { passive: true });
    window.addEventListener('resize', syncActiveSection);

    return () => {
      window.removeEventListener('scroll', syncActiveSection);
      window.removeEventListener('resize', syncActiveSection);
    };
  }, []);

  return (
    <div className="page-shell">
      <header className={`site-header ${showHeader ? 'site-header-visible' : 'site-header-hidden'}`}>
        <a className="brand" href="#top">
          <span className="brand-text">
            <strong>Tahiruddin Syed</strong>
            <span>Software Engineer</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              className={activeSection === item.id ? 'active' : ''}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy" data-reveal="up">
            <h1>Tahiruddin Syed</h1>
            <span className="eyebrow">Software Engineer • Java Fullstack Developer</span>
            <p className="hero-lead">
              Software engineer with 4 years of experience building scalable and reliable applications using Java, Spring Boot, and modern full-stack technologies. My work spans microservices, API development, enterprise integrations, and intelligent product features built for real-world use.
            </p>
            <p className="hero-summary">
              Based in Hyderabad, I have delivered production-ready solutions across Cognizant and Tata Consultancy Services for platforms supporting Google and USAA.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                View Projects
              </a>
              <a className="button secondary" href="#contact">
                Contact Me
              </a>
            </div>
          </div>

          <aside className="hero-panel" data-reveal="up">
            <div className="metric-card">
              <span className="metric-label">Current Focus</span>
              <strong>Applied AI, LLM Integrations & Microservices</strong>
            </div>
            <div className="metric-card">
              <span className="metric-label">Primary Stack</span>
              <strong>Java, Spring Boot, Reactjs, Microservices, PostgreSQL, Kafka</strong>
            </div>
            <div className="metric-card">
              <span className="metric-label">Recent Impact</span>
              <ul className="metric-list">
                <li>Delivered AI-powered backend systems supporting Google cloud technical support engineers.</li>
                <li>Implemented the USAA Prefill onboarding feature, improving customer data retrieval and onboarding efficiency.</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="section section-alt" id="about">
          <div className="section-heading about-heading" data-reveal="up">
            <span className="eyebrow">About</span>
            <h2>Engineering-first approach with a focus on applied AI.</h2>
          </div>
          <div className="about-grid">
            <article className="content-card" data-reveal="up">
              <p>
                Hi, I am Tahiruddin Syed, a Software Engineer based in Hyderabad, India. I completed my Bachelor of Technology in Computer Science and Engineering from Annamacharya Institute of Technology and Sciences, where I built a strong foundation in data structures, algorithms, databases, operating systems, and computer networks.
              </p>
              <p>
                Professionally, I have built my career across Cognizant and Tata Consultancy Services, working on enterprise products for Google and USAA. My experience spans Java full-stack development, Spring Boot microservices, React and Angular interfaces, event-driven systems, and production features ranging from case summarization and sentiment analysis to customer onboarding and prefill workflows.
              </p>
            </article>
            <article className="content-card compact" data-reveal="up">
              <span className="mini-title">Snapshot</span>
              <ul className="snapshot-list">
                <li>4 years of software engineering experience across TCS and Cognizant</li>
                <li>Computer Science graduate with a strong foundation in core concepts</li>
                <li>Production experience with Google Gemini AI integrations</li>
                <li>Hands-on with Spring Boot, Kafka, Spanner, and React</li>
                <li>Azure AI Engineer and OCI Generative AI certified</li>
                <li>Leetcode enthusiast with a focus on problem-solving</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-heading skills-heading" data-reveal="up">
            <span className="eyebrow">Skills</span>
            <h2>Built for thoughtful products and scalable digital experiences.</h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article
                className="content-card skill-card"
                data-reveal="up"
                style={{ transitionDelay: `${index * 80}ms` }}
                key={group.title}
              >
                <span className="mini-title">{group.title}</span>
                <div className="tag-list">
                  {group.items.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-alt" id="experience">
          <div className="section-heading experience-heading" data-reveal="up">
            <span className="eyebrow">Experience</span>
            <h2>Shaped by hands-on delivery, ownership, and steady growth.</h2>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <article
                className="timeline-item"
                data-reveal="up"
                key={`${item.company}-${item.period}`}
              >
                <div className="timeline-marker" />
                <div className="timeline-content content-card">
                  <div className="timeline-topline">
                    <div>
                      <h3>{item.role}</h3>
                      <p className="timeline-company">{item.company}</p>
                    </div>
                    <span className="timeline-period">{item.period}</span>
                  </div>
                  <p className="timeline-highlight">{item.highlight}</p>
                  <ul className="detail-list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading projects-heading" data-reveal="up">
            <span className="eyebrow">Projects</span>
            <h2>Work worth pausing on, not just scrolling past.</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className="project-card"
                data-reveal="up"
                style={{ transitionDelay: `${index * 100}ms` }}
                key={project.title}
              >
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">
                  {project.stack.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-alt" id="certifications">
          <div className="section-heading certifications-heading" data-reveal="up">
            <span className="eyebrow">Certifications</span>
            <h2>Proof points that support the engineering story.</h2>
          </div>
          <div className="certification-grid">
            {certifications.map((item, index) => (
              <article
                className="content-card cert-card"
                data-reveal="up"
                style={{ transitionDelay: `${index * 60}ms` }}
                key={item}
              >
                <span className="cert-index">0{index + 1}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-heading contact-heading" data-reveal="up">
            <span className="eyebrow">Contact</span>
            <h2>Available for backend, full-stack, and applied AI roles.</h2>
          </div>
          <div className="contact-panel" data-reveal="up">
            <div>
              <p className="contact-copy">
                I am open to software engineering opportunities across backend, full-stack, and
                intelligent product development. If you are hiring for teams that value reliable
                delivery, scalable systems, and thoughtful execution, I would be glad to connect.
              </p>
              <div className="contact-links">
                <a href="mailto:syedtahir1550@gmail.com">
                  <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M4 6.75h16a1.25 1.25 0 0 1 1.25 1.25v8A1.25 1.25 0 0 1 20 17.25H4A1.25 1.25 0 0 1 2.75 16V8A1.25 1.25 0 0 1 4 6.75Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="m4 8 8 6 8-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>syedtahir1550@gmail.com</span>
                </a>
                <a href="tel:+919848877736">
                  <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M7.6 3.75h2.1a1 1 0 0 1 .98.8l.58 3.02a1 1 0 0 1-.29.92L9.5 9.97a13.35 13.35 0 0 0 4.53 4.53l1.48-1.47a1 1 0 0 1 .92-.29l3.02.58a1 1 0 0 1 .8.98v2.1a1 1 0 0 1-.9 1c-7.53.73-13.42-5.16-12.69-12.69a1 1 0 0 1 .94-.96Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>+91-9848877736</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/tahiruddin-syed-045a80167/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M6.8 8.25a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1ZM5.4 9.75h2.8v8.85H5.4V9.75Zm4.6 0h2.68v1.21h.04c.37-.7 1.29-1.44 2.66-1.44 2.85 0 3.37 1.88 3.37 4.32v4.76h-2.8v-4.22c0-1.01-.02-2.3-1.4-2.3-1.4 0-1.61 1.1-1.61 2.23v4.29H10V9.75Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="contact-actions conversation-menu">
              <button
                className="button primary conversation-toggle"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowConversationMenu((current) => !current);
                }}
                aria-expanded={showConversationMenu}
              >
                Start a Conversation
              </button>
              {showConversationMenu ? (
                <div className="conversation-options">
                  <a href="mailto:syedtahir1550@gmail.com">Email</a>
                  <a href="tel:+919848877736">Call</a>
                  <a
                    href="https://www.linkedin.com/in/tahiruddin-syed-045a80167/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
