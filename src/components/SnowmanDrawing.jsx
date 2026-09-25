// Front-elevation line study of the Snowman SM-300, with dimension marks and callouts.
const LABEL = {
  fill: "#CFC8BC",
  fontFamily: "Hanken Grotesk, system-ui, sans-serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "2.2px",
};

function Label({ x, y, lines, anchor = "start" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} style={LABEL}>
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 18}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export default function SnowmanDrawing({ callouts = true, className = "" }) {
  const panel = { fill: "#26231F", stroke: "#CFC8BC", strokeWidth: 1.2 };
  const line = { fill: "none", stroke: "#CFC8BC", strokeWidth: 1.2 };
  const dim = { fill: "none", stroke: "#8C8478", strokeWidth: 1, strokeDasharray: "3 4" };
  const tick = { stroke: "#8C8478", strokeWidth: 1 };

  return (
    <svg
      viewBox={callouts ? "0 40 540 620" : "90 60 300 580"}
      role="img"
      aria-label="Line drawing of the Snowman SM-300 ice shaver, front elevation"
      className={className}
    >
      <g transform="translate(130 70) scale(1.2)">
        <rect {...panel} x="30" y="8" width="170" height="124" rx="18" />
        <rect {...line} x="39" y="17" width="152" height="106" rx="13" />
        <circle {...line} cx="115" cy="31" r="7" />
        <circle {...line} cx="115" cy="31" r="2.5" />
        <rect {...line} x="89" y="62" width="52" height="14" rx="3" />
        <rect {...panel} x="204" y="20" width="14" height="42" rx="6" />
        <line {...line} x1="211" y1="62" x2="211" y2="92" />
        <rect {...panel} x="198" y="94" width="34" height="12" rx="3" />
        <circle {...line} cx="222" cy="100" r="9" />
        <rect {...panel} x="38" y="132" width="10" height="268" />
        <rect {...panel} x="182" y="132" width="10" height="268" />
        <rect {...panel} x="56" y="132" width="118" height="12" rx="2" />
        <rect {...panel} x="62" y="144" width="106" height="66" rx="4" />
        {[80, 98, 132, 150].map((x) => (
          <line key={x} {...line} x1={x} y1="150" x2={x} y2="204" />
        ))}
        <path {...line} d="M104 170 l12 10 l-12 10" />
        <ellipse {...panel} cx="115" cy="384" rx="74" ry="7" />
        <rect {...line} x="109" y="391" width="12" height="9" />
        <rect {...panel} x="25" y="400" width="180" height="30" rx="6" />
        <line {...line} x1="33" y1="412" x2="197" y2="412" />
        <rect {...panel} x="34" y="430" width="12" height="7" rx="1" />
        <rect {...panel} x="184" y="430" width="12" height="7" rx="1" />
      </g>

      {callouts && (
        <>
          <line {...dim} x1="100" y1="80" x2="100" y2="594" />
          <line {...tick} x1="93" y1="80" x2="107" y2="80" />
          <line {...tick} x1="93" y1="594" x2="107" y2="594" />
          <line {...dim} x1="160" y1="614" x2="376" y2="614" />
          <line {...tick} x1="160" y1="607" x2="160" y2="621" />
          <line {...tick} x1="376" y1="607" x2="376" y2="621" />
          <Label x={40} y={326} lines={["H", "600", "MM"]} />
          <Label x={268} y={642} lines={["W 300 · D 400 MM"]} anchor="middle" />

          <g stroke="#C9B48A" strokeWidth="1">
            <line x1="392" y1="118" x2="420" y2="118" />
            <line x1="332" y1="281" x2="420" y2="281" />
            <line x1="349" y1="530" x2="420" y2="530" />
          </g>
          <g fill="#C9B48A">
            <circle cx="392" cy="118" r="3.5" />
            <circle cx="332" cy="281" r="3.5" />
            <circle cx="349" cy="530" r="3.5" />
          </g>
          <Label x={428} y={114} lines={["LEVER", "OPERATION"]} />
          <Label x={428} y={277} lines={["CARTRIDGE", "CUP"]} />
          <Label x={428} y={526} lines={["ROTATING", "TRAY"]} />
        </>
      )}
    </svg>
  );
}
