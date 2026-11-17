/* =====================================================
   PROJECT FIELDS
   Desktop hover / keyboard focus image preview,
   ported from main.js section 06.
===================================================== */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { images } from "../../assets";
import SectionHead from "../SectionHead/SectionHead";
import RevealItem from "../Reveal/RevealItem";
import { Chevron } from "../Icons/Icons";
import { preventDemoNavigation } from "../../utils/demoLink";
import "./ProjectFields.css";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: {
    title: "مجالات المشاريع",
    text: "مساحات نطبّق فيها خبراتنا، من احتياجات المجتمع إلى تطوير المرافق.",
    other: "مشاريع أخرى",
  },
  en: {
    title: "Project Fields",
    text: "Where our capabilities are applied, from community needs to better facilities.",
    other: "Other Projects",
  },
};

const fields = [
  {
    id: "water-environment",
    image: images.waterEnvironment,
    ar: {
      title: "المياه والبيئة",
      description: "منشآت المياه والمعالجة والحلول البيئية.",
    },
    en: {
      title: "Water & Environment",
      description: "Water facilities, treatment, and environmental solutions.",
    },
  },
  {
    id: "energy-systems",
    image: images.energy,
    ar: {
      title: "أنظمة الطاقة",
      description: "محطات وشبكات نقل وتوزيع الطاقة.",
    },
    en: {
      title: "Energy Systems",
      description: "Power transmission, distribution, and supporting facilities.",
    },
  },
  {
    id: "roads-transport",
    image: images.infrastructure,
    ar: {
      title: "الطرق والنقل",
      description: "شبكات الحركة والربط وتطوير الطرق.",
    },
    en: {
      title: "Roads & Transport",
      description: "Mobility networks, connections, and road development.",
    },
  },
];

export default function ProjectFields() {
  const { lang } = useLanguage();
  const t = content[lang];

  const [activeIndex, setActiveIndex] = useState(0);
  const [previewSrc, setPreviewSrc] = useState(fields[0].image);
  const [switching, setSwitching] = useState(false);

  const currentSrc = useRef(fields[0].image); // what the preview <img> shows now
  const changeToken = useRef(0); // invalidates older pending image requests
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function selectField(index) {
    const source = fields[index].image;
    const token = ++changeToken.current;

    setActiveIndex(index);

    if (source === currentSrc.current) {
      setSwitching(false);
      return;
    }

    const incoming = new Image();

    incoming.onload = () => {
      if (token !== changeToken.current) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        currentSrc.current = source;
        setPreviewSrc(source);
        return;
      }

      setSwitching(true);

      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        if (token !== changeToken.current) return;

        currentSrc.current = source;
        setPreviewSrc(source);

        requestAnimationFrame(() => setSwitching(false));
      }, 120);
    };

    incoming.src = source;
  }

  const onPointerEnter = (event, index) => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (event.pointerType === "mouse" && finePointer.matches) selectField(index);
  };

  return (
    <section className="el-fields" id="fields" aria-labelledby="el-fields-title">
      <div className="container">
        <SectionHead id="el-fields-title" title={t.title} text={t.text} />

        <div className="el-fields__layout">
          <div className="el-fields__list">
            {fields.map((field, index) => (
              <RevealItem
                as="a"
                key={field.id}
                className={`el-fields__item${activeIndex === index ? " is-previewed" : ""}`}
                href="#fields"
                data-demo-link
                data-preview={field.image}
                onClick={preventDemoNavigation}
                onPointerEnter={(event) => onPointerEnter(event, index)}
                onFocus={() => selectField(index)}
              >
                <img
                  className="el-fields__thumb"
                  src={field.image}
                  alt=""
                  loading="lazy"
                />
                <span className="el-fields__item-copy">
                  <strong>{field[lang].title}</strong>
                  <span>{field[lang].description}</span>
                </span>
                <Chevron />
              </RevealItem>
            ))}

            <RevealItem
              as="a"
              className="el-fields__other"
              href="#fields"
              data-demo-link
              onClick={preventDemoNavigation}
            >
              <span>{t.other}</span>
              <Chevron />
            </RevealItem>
          </div>

          <RevealItem className="el-fields__preview" aria-hidden="true">
            <img
              src={previewSrc}
              alt=""
              className={switching ? "is-switching" : undefined}
            />
          </RevealItem>
        </div>
      </div>
    </section>
  );
}
