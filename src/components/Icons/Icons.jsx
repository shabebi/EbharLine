/* Small wrappers around the sprite symbols (see IconSprite.jsx) */

export function Chevron() {
  return (
    <svg className="el-chevron" aria-hidden="true">
      <use href="#icon-chevron" />
    </svg>
  );
}

export function DownIcon() {
  return (
    <svg className="down-icon" aria-hidden="true">
      <use href="#icon-down" />
    </svg>
  );
}
