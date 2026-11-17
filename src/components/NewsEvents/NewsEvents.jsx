/* =====================================================
   NEWS & EVENTS
===================================================== */

import { useLanguage } from "../../context/LanguageContext";
import { images } from "../../assets";
import SectionHead from "../SectionHead/SectionHead";
import RevealItem from "../Reveal/RevealItem";
import { Chevron } from "../Icons/Icons";
import { preventDemoNavigation } from "../../utils/demoLink";
import "./NewsEvents.css";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: {
    title: "الأخبار والأحداث",
    text: "لمحات من الميدان، ومبادراتنا، وأعمالنا المشتركة.",
    meta: "محتوى تجريبي",
    read: "اقرأ الخبر",
    all: "جميع الأخبار والأحداث",
  },
  en: {
    title: "News & Events",
    text: "Updates from the field, our initiatives, and collaborative work.",
    meta: "Sample content",
    read: "Read Article",
    all: "View All News & Events",
  },
};

const featured = {
  image: images.siteVisit,
  ar: {
    alt: "مهندسون يراجعون مخططات المشروع",
    title: "من الميدان إلى خطط التنفيذ",
    excerpt:
      "جولة عمل تجمع المعاينة الهندسية والنقاش الفني، لفهم الاحتياجات وتطوير مسار واضح للمشروع قبل بدء التنفيذ.",
  },
  en: {
    alt: "Engineers reviewing a project plan",
    title: "From Site Visits to Execution Plans",
    excerpt:
      "A working visit combining engineering observations and technical discussions to understand project needs and establish a clear path before execution.",
  },
};

const sideArticles = [
  {
    id: "training-workshop",
    image: images.trainingWorkshop,
    ar: {
      alt: "ورشة تدريب مهنية",
      title: "ورش تدريب تبني الخبرة العملية",
      excerpt: "تجارب تعليمية تربط المعرفة بالتطبيق وتدعم المهارات المهنية.",
    },
    en: {
      alt: "Professional training workshop",
      title: "Practical Training Builds Expertise",
      excerpt:
        "Learning experiences that connect knowledge with practice and develop professional skills.",
    },
  },
  {
    id: "partnership-agreement",
    image: images.partnershipAgreement,
    ar: {
      alt: "اجتماع شراكة مهنية",
      title: "شراكات تعزز تكامل الأعمال",
      excerpt: "لقاءات وتعاون يربطان الخبرات ويفتحان فرصاً لمشاريع مشتركة.",
    },
    en: {
      alt: "Professional partnership meeting",
      title: "Partnerships Strengthen Collaboration",
      excerpt:
        "Professional exchange and cooperation bring different capabilities together.",
    },
  },
];

export default function NewsEvents() {
  const { lang } = useLanguage();
  const t = content[lang];
  const f = featured[lang];

  return (
    <section className="el-news" id="events" aria-labelledby="el-news-title">
      <div className="container">
        <SectionHead id="el-news-title" title={t.title} text={t.text} />

        <div className="el-news__layout">
          <RevealItem
            as="a"
            className="el-news__featured"
            href="#events"
            data-demo-link
            onClick={preventDemoNavigation}
          >
            <span className="el-news__featured-media">
              <img src={featured.image} alt={f.alt} loading="lazy" />
            </span>
            <span className="el-news__featured-copy">
              <span className="el-news__meta">{t.meta}</span>
              <strong>{f.title}</strong>
              <span className="el-news__excerpt">{f.excerpt}</span>
              <span className="el-news__read">
                {t.read}
                <Chevron />
              </span>
            </span>
          </RevealItem>

          <div className="el-news__side">
            {sideArticles.map((article) => (
              <RevealItem
                as="a"
                key={article.id}
                className="el-news__small"
                href="#events"
                data-demo-link
                onClick={preventDemoNavigation}
              >
                <span className="el-news__small-media">
                  <img src={article.image} alt={article[lang].alt} loading="lazy" />
                </span>
                <span className="el-news__small-copy">
                  <span className="el-news__meta">{t.meta}</span>
                  <strong>{article[lang].title}</strong>
                  <span className="el-news__excerpt">{article[lang].excerpt}</span>
                  <span className="el-news__read">
                    {t.read}
                    <Chevron />
                  </span>
                </span>
              </RevealItem>
            ))}
          </div>
        </div>

        <RevealItem
          as="a"
          className="el-news__all"
          href="#events"
          data-demo-link
          onClick={preventDemoNavigation}
        >
          <span>{t.all}</span>
          <Chevron />
        </RevealItem>
      </div>
    </section>
  );
}
