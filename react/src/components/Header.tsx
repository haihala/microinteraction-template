import { NavLink, NavLinkRenderProps } from "react-router";

// Bit of a hack, but I think this is how you would get the same look
// as the original page using the latest react-router
//
// You could also use the useLocation hook and render components conditionally.
// You don't need NavLink for that, a Link will suffice
function hideWhenActive({ isActive }: NavLinkRenderProps) {
  if (isActive) return { display: "None" };
}

export function Header() {
  return (
    <header
      style={{
        backgroundColor: "rgb(200, 200, 240)",
        padding: "1rem",
      }}
    >
      <h1>Sample stats site</h1>
      <p>
        For demonstration purposes.{" "}
        <NavLink to="/" style={hideWhenActive}>
          Table
        </NavLink>
        <NavLink to="/form" style={hideWhenActive}>
          Form
        </NavLink>
      </p>
    </header>
  );
}
