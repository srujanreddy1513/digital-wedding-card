import "./Footer.css";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer({
  coupleInitials = "A & R",
  year = new Date().getFullYear(),
}) {
  return (
    <footer className="footer">
      <h2 className="footer-logo">{coupleInitials}</h2>

      <div className="footer-socials">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            className="footer-link"
          >
            {social.label}
          </a>
        ))}
      </div>

      <div className="footer-divider"></div>

      <p className="footer-copy">
        © {year} Invitwo. Made with love for {coupleInitials}.
      </p>
    </footer>
  );
}