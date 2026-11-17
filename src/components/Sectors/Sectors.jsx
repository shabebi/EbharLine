/* =====================================================
   SECTORS  (Work Sectors)
===================================================== */

import { useLanguage } from "../../context/LanguageContext";
import { images } from "../../assets";
import SectionHead from "../SectionHead/SectionHead";
import SectorCard from "./SectorCard";
import "./Sectors.css";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: {
    title: "قطاعات العمل",
    text: "من التخطيط والدراسة إلى الإدارة والتنفيذ؛ خبرات تتكامل لخدمة المشروع.",
    cta: "استكشف القطاع",
  },
  en: {
    title: "Work Sectors",
    text: "From planning and consultancy to management and delivery.",
    cta: "Explore Sector",
  },
};

const sectors = [
  {
    id: "engineering-consultancy",
    image: images.engineeringConsultancy,
    ar: {
      alt: "مخططات هندسية",
      title: "الاستشارات الهندسية",
      description: "نحوّل متطلبات المشروع إلى دراسات وتصاميم دقيقة تدعم القرار.",
    },
    en: {
      alt: "Engineering plans",
      title: "Engineering Consultancy",
      description:
        "We turn project requirements into informed studies and precise engineering designs.",
    },
  },
  {
    id: "project-management",
    image: images.projectManagement,
    ar: {
      alt: "إدارة مشروع إنشائي",
      title: "إدارة المشاريع",
      description: "ننسّق الموارد والوقت والجودة لضمان تقدّم كل مرحلة بوضوح.",
    },
    en: {
      alt: "Project management",
      title: "Project Management",
      description:
        "We coordinate resources, schedules, and quality throughout every project stage.",
    },
  },
  {
    id: "construction",
    image: images.construction,
    ar: {
      alt: "موقع إنشاءات",
      title: "الإنشاءات والمقاولات",
      description: "نترجم المخططات إلى أعمال تنفيذية وفق المواصفات المعتمدة.",
    },
    en: {
      alt: "Construction site",
      title: "Construction & Contracting",
      description:
        "We translate project plans into construction works that meet approved standards.",
    },
  },
  {
    id: "infrastructure-energy",
    image: images.energy,
    ar: {
      alt: "منظومة بنية تحتية للطاقة",
      title: "البنية التحتية والطاقة",
      description: "نطوّر منظومات ومرافق تدعم الخدمات الأساسية واستمراريتها.",
    },
    en: {
      alt: "Energy infrastructure",
      title: "Infrastructure & Energy",
      description:
        "We develop facilities and systems that support essential services and long-term operation.",
    },
  },
  {
    id: "logistics",
    image: images.logistics,
    ar: {
      alt: "ميناء وحاويات شحن",
      title: "الخدمات اللوجستية",
      description: "نربط التوريد والنقل والتجهيز باحتياجات العمل الميداني.",
    },
    en: {
      alt: "Logistics and shipping",
      title: "Logistics Services",
      description:
        "We connect procurement, transport, and site operations through practical support.",
    },
  },
  {
    id: "professional-training",
    image: images.professionalTraining,
    ar: {
      alt: "تدريب مهني",
      title: "التدريب المهني",
      description: "نطوّر المهارات العملية ونبني جاهزية الكوادر للعمل.",
    },
    en: {
      alt: "Professional training",
      title: "Professional Training",
      description:
        "We develop practical skills and strengthen professional readiness.",
    },
  },
];

export default function Sectors() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="el-sectors" id="sectors" aria-labelledby="el-sectors-title">
      <div className="container">
        <SectionHead id="el-sectors-title" title={t.title} text={t.text} />

        <div className="el-sectors__grid">
          {sectors.map((item) => (
            <SectorCard key={item.id} item={item} lang={lang} cta={t.cta} />
          ))}
        </div>
      </div>
    </section>
  );
}
