const { useState } = React;
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyOaRPOGWIDPMIFCpb7PzoToHzFt8KgKE3sqz0rVjiNRv2zPGytqcze-lStsgybQjiYUg/exec";

const courseData = [
  {
    name: "PCMB",
    details1: "English + Kannada / Sanskrit",
    details2: "Physics, Chemistry, Maths, Biology"
  },
  {
    name: "PCMC",
    details1: "English + Kannada / Sanskrit",
    details2: "Physics, Chemistry, Maths, Computer Science"
  }
];

const rankersData = [
  { image: "https://randomuser.me/api/portraits/men/11.jpg", exam: "PU BOARD", rank: "State Rank 5", name: "Rahul Kumar", stream: "PCMB" },
  { image: "https://randomuser.me/api/portraits/women/12.jpg", exam: "NEET", rank: "AIR 150", name: "Ananya Sharma", stream: "PCMB" },
  { image: "https://randomuser.me/api/portraits/men/13.jpg", exam: "JEE MAIN", rank: "AIR 220", name: "Ravi Patel", stream: "PCMC" },
  { image: "https://randomuser.me/api/portraits/women/14.jpg", exam: "KCET", rank: "State Rank 90", name: "Sneha Reddy", stream: "PCMB" },
  { image: "https://randomuser.me/api/portraits/men/15.jpg", exam: "JEE MAIN", rank: "AIR 300", name: "Arjun Verma", stream: "PCMC" },
  { image: "https://randomuser.me/api/portraits/women/16.jpg", exam: "PU BOARD", rank: "State Rank 12", name: "Pooja Singh", stream: "PCMB" }
];

const statsData = [
  { label: "PU Board Results", value: "98.6%" },
  { label: "NEET Qualifiers", value: "340+" },
  { label: "JEE/CET Selections", value: "410+" },
  { label: "State Ranks", value: "12" }
];

const testimonials = [
  {
    name: "Pranav K (PCMC)",
    text: "Daily practice tests and doubt-clearing sessions helped me score well in KCET."
  },
  {
    name: "Likitha S (PCMB)",
    text: "The PU board and NEET preparation were balanced very well by the lecturers."
  },
  {
    name: "Naveen M (PCMB)",
    text: "Weekly revision plans and mentor support kept me focused throughout 2nd PU."
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#courses", label: "Courses" },
    { href: "#admissions", label: "Admissions" },
    { href: "#rankers", label: "Top Rankers" },
    { href: "#contact", label: "Contact" }
  ];

  function postToGoogleScript(payload) {
    let sinkFrame = document.getElementById("admission-submit-sink");
    if (!sinkFrame) {
      sinkFrame = document.createElement("iframe");
      sinkFrame.id = "admission-submit-sink";
      sinkFrame.name = "admission-submit-sink";
      sinkFrame.style.display = "none";
      document.body.appendChild(sinkFrame);
    }

    const tempForm = document.createElement("form");
    tempForm.method = "POST";
    tempForm.action = APPS_SCRIPT_URL;
    tempForm.target = "admission-submit-sink";
    tempForm.style.display = "none";

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      tempForm.appendChild(input);
    });

    document.body.appendChild(tempForm);
    tempForm.submit();
    document.body.removeChild(tempForm);
  }

  async function handleAdmissionSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const name = data.get("name");
    const course = data.get("course");
    const payload = {
      time: new Date().toLocaleString(),
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      course: data.get("course")
    };

    try {
      setIsSubmitting(true);
      setFormMessage("");
      postToGoogleScript(payload);

      setFormMessage(`Thanks ${name}! Your ${course} admission request was submitted successfully.`);
      form.reset();
    } catch (error) {
      setFormMessage("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <p className="badge">Admissions 2026-27 Open</p>
        <h1>Chetana PU Science College</h1>
        <p className="subtitle">II PUC Academic Excellence | CET | NEET | JEE Coaching Support</p>
      </header>

      <nav className="top-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <button
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-nav-links"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <div className="spacer" />
        </div>
        <div id="primary-nav-links" className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a className="nav-link" key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="page">
        <div className="hero">
          <div className="hero-content">
            <h2>Strong Foundation for I & II PUC Science</h2>
            <p>Integrated classroom coaching, disciplined study hours, and exam-focused preparation for board and competitive exams.</p>
            <a href="#admissions" className="hero-cta">Apply Now</a>
          </div>
          <img
            src="https://lh3.googleusercontent.com/gpms-cs-s/ABJJf52HoZvC3mPUHSUNjgx3k4_Bkp2DsY1qrOHFlaCvYAvERRHA69c4-FdYGnpGzq8f7qrSwcJsB39UsbUCeTQjdSpHm1libASM1Ckz2TOejVDKpYPIiIENAw0wqH87vz-6GsEB3KBKJA"
            alt="Chetana PU Science College campus"
            loading="eager"
          />
        </div>

        <div className="stats-grid">
          {statsData.map((item) => (
            <div key={item.label} className="stat-card">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="section" id="courses">
          <h2>Our Courses</h2>
          <p className="section-subtitle">Science stream combinations with focused preparation for CET, NEET, and JEE.</p>
          <div className="courses">
            {courseData.map((course, index) => (
              <div
                key={course.name}
                className="card"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <h3>{course.name}</h3>
                <p>{course.details1}</p>
                <p>{course.details2}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section" id="admissions">
          <h2>Apply for Admission</h2>
          <p className="section-subtitle">Admissions open for I PUC Science. Submit details for counseling and seat availability.</p>
          <form onSubmit={handleAdmissionSubmit}>
            <input type="text" name="name" placeholder="Full Name" autoComplete="name" required />
            <br />
            <input type="email" name="email" placeholder="Email Address" autoComplete="email" required />
            <br />
            <input type="tel" name="phone" placeholder="Phone Number" autoComplete="tel" inputMode="numeric" pattern="[0-9]{10}" title="Enter a 10-digit phone number" required />
            <br />
            <select name="course" required>
              <option value="">Select Course</option>
              <option>PCMB</option>
              <option>PCMC</option>
            </select>
            <br />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Apply Now"}
            </button>
          </form>
          {formMessage && (
            <p className={`form-message ${formMessage.startsWith("Submission failed") ? "error" : ""}`}>
              {formMessage}
            </p>
          )}
        </div>

        <div className="section" id="rankers">
          <h2>Board & Competitive Exam Achievers</h2>
          <p className="section-subtitle">Proud results from PU Board, KCET, NEET, and JEE across recent batches.</p>
          <div className="rankers">
            {rankersData.map((ranker, index) => (
              <div
                key={`${ranker.rank}-${ranker.name}`}
                className="card rank-card"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="exam-pill">{ranker.exam}</span>
                <img src={ranker.image} alt={ranker.name} loading="lazy" />
                <h3>{ranker.rank}</h3>
                <p>{ranker.name}</p>
                <p className="stream-tag">{ranker.stream}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section" id="testimonials">
          <h2>Student & Parent Feedback</h2>
          <p className="section-subtitle">Experiences from our PU science batches.</p>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <div key={item.name} className="testimonial-card">
                <p>"{item.text}"</p>
                <h4>- {item.name}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="section contact-section" id="contact">
          <h2>Contact Us</h2>
          <p>Office Hours: 9:00 AM - 5:30 PM (Mon-Sat)</p>
          <p>Email: info@chetanapucollege.com</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </main>

      <a href="#" className="back-to-top" aria-label="Back to top">Top</a>

      <footer>
        <p>© 2026 Chetana PU Science College</p>
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
