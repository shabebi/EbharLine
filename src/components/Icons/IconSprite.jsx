/* SVG ICON SYSTEM — rendered once at the top of the app.
   Icons are used with  <use href="#icon-chevron" />  /  <use href="#icon-down" /> */

export default function IconSprite() {
  return (
    <svg
      className="icon-defs"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <symbol id="icon-chevron" viewBox="0 0 24 24">
        <path
          d="M15.5 5.5 9 12l6.5 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </symbol>
      <symbol id="icon-down" viewBox="0 0 20 10">
        <path
          d="M2 2 10 7 18 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </symbol>
    </svg>
  );
}
