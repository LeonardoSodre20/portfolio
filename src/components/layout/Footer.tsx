export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        {"// BUILT WITH "}
        <span style={{ color: "var(--color-magenta)" }}>{"<3"}</span>
        {" & MUITO CAFÉ — "}
        <span style={{ color: "var(--color-purple)" }}>{"© "}{new Date().getFullYear()}{" LEONARDO SODRÉ"}</span>
      </p>
    </footer>
  );
}
