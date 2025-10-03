import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./App.css";

// 🧭 프로젝트 카드 컴포넌트
type ProjectCardProps = {
  title: string;
  desc: string;
  link: string;
  imageSrc: string;
  tech: string[];
  bgColor: string;
  onClick: () => void;
};

function ProjectCard({
  title,
  desc,
  link,
  tech,
  bgColor,
  onClick,
}: ProjectCardProps) {
  return (
    <div
      className={`ml-27 hover:scale-[1.02] transition-transform 
shadow-[6px_6px_15px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_20px_rgba(0,0,0,0.45)] 
flex flex-col shrink-0 p-4 mt-5 w-[300px] h-[350px] rounded-lg ${bgColor}`}
      onClick={onClick}
    >
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-lg mb-3 leading-snug whitespace-pre-line">{desc}</p>
      <a
        href={link}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        className="self-start px-3 py-1.5 mt-auto text-sm break-all bg-white/80 text-amber-400 hover:opacity-80 rounded-lg"
      >
        🔗 {link}
      </a>
      <div className="mt-7 flex gap-2 w-6 h-6">
        {tech.map((src) => (
          <img key={src} src={src} alt="tech" />
        ))}
      </div>
    </div>
  );
}

// 🪄 Modal (포털 + 오버레이 추가)
function Modal({
  open,
  onClose,
  imageSrc,
  link,
  title,
  desc,
}: {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  link: string;
  title: string;
  desc: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal
    >
      <div
        className="relative w-[92vw] max-w-[560px] min-h-[70vh] max-h-[90vh]
                   bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                   border border-black/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 w-8 h-8 grid place-items-center
                     rounded-full text-gray-500 hover:text-black hover:bg-black/5"
          onClick={onClose}
          aria-label="close"
        >
          ✕
        </button>

        {/* 1) 상단 이미지 */}
        <div className="relative h-[220px]">
          <img src={imageSrc} alt="" className="w-full h-full object-cover" />
        </div>

        {/* 2) 본문(설명/상세/기능) */}
        <div className="p-6 space-y-5">
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>

          <section>
            <h3 className="font-semibold mb-1">프로젝트 설명</h3>
            <p className="text-gray-700 whitespace-pre-line">{desc}</p>
          </section>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg
                         bg-black/5 hover:bg-black/10 transition"
            >
              🔗 사이트 바로가기
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function App() {
  const [modal, setModal] = useState<{
    open: boolean;
    imageSrc: string;
    link: string;
    title: string;
    desc: string;
  }>({ open: false, imageSrc: "", link: "", title: "", desc: "" });

  const projects = [
    {
      title: "영어 회화 학습 서비스",
      desc: "😀 FE 2명, BE 1명\n🫡 기여: 퍼블리싱, 콘텐츠 제작",
      link: "https://growengup.com/home.php",
      imageSrc: "/growengup.png",
      tech: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      ],
      bgColor: "bg-emerald-100",
    },
    {
      title: "여행 일정 공유 커뮤니티",
      desc: "😀 FE 5명\n🫡 기여: 마이페이지, 검색, 알림",
      link: "https://clinquant-kangaroo-7d97f3.netlify.app/",
      imageSrc: "/travelmate.png",
      tech: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg",
      ],
      bgColor: "bg-emerald-200",
    },
    {
      title: "캠핑 통합 플랫폼",
      desc: "😀 FE 5명\n🫡 기여: 구글 로그인, 헤더(검색, 필터링), 챗봇",
      link: "https://tember.netlify.app/",
      imageSrc: "/tember.png",
      tech: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg",
      ],
      bgColor: "bg-emerald-100",
    },
    {
      title: "AI 기반 여가생활 추천 서비스",
      desc:
        "😀 FE 4명, BE 5명\n🫡 기여: 챗봇 추천, 행사/모임 페이지(검색,필터링,정렬,추천)\n\n🌟 백엔드 리소스 종료로 실서비스 중단(2025.08)",
      link: "https://funfunhage.vercel.app/",
      imageSrc: "/funfun.png",
      tech: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      ],
      bgColor: "bg-emerald-200",
    },
  ];

  return (
    <>
      {/* 🧍‍♀️ 소개 섹션 (생략 가능) */}
      <div className="ml-26 flex flex-col md:flex-row items-center px-6 md:px-12 min-h-screen gap-8">
        <img src="/유진.png" className="w-[200px] md:w-[250px]" />
        <div className="flex flex-col items-start text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
            안녕하세요,<br />
            프론트엔드 개발자
            <br />
            심유진입니다.
          </h1>
          <a
            href="https://github.com/youjin430"
            target="_blank"
            className="mt-4 text-xl bg-white border-b-4 border-amber-300 inline-block px-4 py-2 rounded-lg"
          >
            Github
          </a>
        </div>
      </div>

      {/* 💻 Skills / Tools */}
      <div className="ml-26 px-6 md:px-12 mb-20 text-2xl md:text-3xl flex flex-col md:flex-row gap-12">
        <section>
          <h2 className="mb-3 font-semibold border-b-2 border-amber-300 inline-block">
            Skills
          </h2>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" />
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg" />
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
          </div>
        </section>

        <section className="ml-6">
          <h2 className="mb-3 font-semibold border-b-2 border-amber-300 inline-block">
            Tools
          </h2>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg" />
            <img className="w-10 h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" />
          </div>
        </section>
      </div>

      {/* 🧱 Projects */}
      <div className="ml-26 px-6 md:px-12 text-3xl font-bold mb-5">Project</div>
      <p className="ml-26 px-6 md:px-12 text-base md:text-lg text-gray-600 mb-4">
        카드를 눌러서 프로젝트의 세부사항을 확인해보세요
      </p>

      <div className="flex flex-wrap px-6 md:px-12 gap-8 mb-15 justify-center md:justify-start">
        {projects.map((p) => (
          <ProjectCard
            key={p.title}
            title={p.title}
            desc={p.desc}
            link={p.link}
            imageSrc={p.imageSrc}
            tech={p.tech}
            bgColor={p.bgColor}
            onClick={() =>
              setModal({
                open: true,
                imageSrc: p.imageSrc,
                link: p.link,
                title: p.title,
                desc: p.desc,
              })
            }
          />
        ))}
      </div>

      <Modal
        open={modal.open}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
        imageSrc={modal.imageSrc}
        link={modal.link}
        title={modal.title}
        desc={modal.desc}
      />
    </>
  );
}

export default App;