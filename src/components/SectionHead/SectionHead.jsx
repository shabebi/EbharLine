/* Shared heading block used by Sectors / Project Fields / News & Events */

import RevealItem from "../Reveal/RevealItem";

export default function SectionHead({ id, title, text }) {
  return (
    <RevealItem className="el-section-head">
      <h2 id={id}>{title}</h2>
      <p>{text}</p>
    </RevealItem>
  );
}
