import { useState, useEffect, type ReactNode } from "react";
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
  // title,
  // desc,
  detail,
}: {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  link: string;
  title: string;
  desc: string;
  detail:ReactNode;
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
                   border border-black/10 flex flex-col"
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
        <div className="p-6 space-y-1 overflow-y-auto flex-1 max-h-[calc(90vh-220px)]
             [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2
             [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full
             [&::-webkit-scrollbar-track]:bg-gray-100">
          <h2 className="text-xl md:text-2xl">프로젝트 설명</h2>
          {detail}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg
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
    detail: ReactNode | null;
  }>({ open: false, imageSrc: "", link: "", title: "", desc: "",detail: null, });

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
      detail: (
      <>
        <h3 className="mb-1">영어 회화 학습을 돕는 웹 기반 서비스</h3>
  <p className="text-gray-700 whitespace-pre-line mb-4">
    AI 학습 콘텐츠를 기반으로 영어 회화 학습을 지원하는 웹 서비스입니다. 
    사용자는 주제별 대화 영상과 문장 반복 학습 기능을 통해 자연스러운 회화를 연습할 수 있습니다.
  </p>

  {/* 💡 주요 기능 및 특징 */}
<h4 className="font-medium text-lg mb-2">💡 주요 기능 및 특징</h4>
<ul className="list-disc list-inside text-gray-700 space-y-1 mb-5">
  <li>
    <b>딕테이션(Dictation)</b> — 영어 문장 소리를 듣고 직접 받아쓰며
    청취력을 향상시키는 학습 기능
  </li>
  <li>
    <b>쉐도잉(Shadowing)</b> — 원어민 발음을 그대로 따라 말하며
    발음·억양 교정과 회화 실력 향상에 도움을 주는 기능
  </li>
  <li>
    <b>사용자 맞춤 학습 콘텐츠</b> — 학습 영상을 기반으로
    개인 수준에 맞게 학습 콘텐츠를 자동 분할·제공
  </li>
</ul>

  {/* 👩‍💻 담당 역할 및 구현 */}
<h4 className="font-medium text-lg mb-2">👩‍💻 담당 역할 및 구현</h4>
<ul className="list-disc list-inside text-gray-700 space-y-1 mb-5">
  <li>정적 페이지 퍼블리싱 및 UI 구조 설계(Figma 기준 간격/타이포 맞춤)</li>
  <li>모달 열기/닫기, 탭/아코디언 등 간단한 UI 인터랙션 자바스크립트로 구현</li>
  <li>딕테이션/쉐도잉 학습 화면의 자막 토글·반복 재생 버튼과 같은 UI 제어 로직 연동</li>
</ul>

  {/* ⚙️ 트러블슈팅 */}
<h4 className="font-medium text-lg mb-2">⚙️ 트러블슈팅</h4>
<ul className="space-y-4 text-gray-800 mb-5">

  {/* 1. Enter/Space 포커스 이동 이슈 */}
  <li className="rounded-lg border p-4">
    <p>
      <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">문제점</span>
      딕테이션 입력 화면에서 <code>Enter</code>/<code>Space</code>로 다음 칸 이동 시,
      문장부호가 글자로 인식되어 포커스가 비정상 이동하거나 <code>disabled</code> 필드에 걸림.
    </p>
    <p className="mt-2">
      <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">원인</span>
      입력값 토큰화 시 비영문 문자가 섞여 인덱스 계산이 어긋났고,
      다음 요소 탐색 시 비활성 필드 예외 처리가 없었음.
    </p>
    <p className="mt-2">
      <span className="inline-flex items-center text-xs font-semibold bg-emerald-100 px-2 py-0.5 rounded mr-2">해결</span>
      정규식으로 영문만 유지(<code>/[a-z]/gi</code>)하고, 현재 필드의 숫자 인덱스를
      <code>replace(/\D/g,'')</code>로 추출해 <b>다음 사용 가능 필드</b>(<code>!disabled</code>)를
      <code>while</code> 루프로 탐색. 기본 동작은 <code>event.preventDefault()</code>로 차단.
    </p>
    <p className="mt-2">
      <span className="inline-flex items-center text-xs font-semibold bg-blue-100 px-2 py-0.5 rounded mr-2">효과</span>
      포커스 점프/막힘 현상 제거, 키보드만으로 연속 입력 가능해져 입력 속도와 완주율 향상.
    </p>
  </li>

  {/* 2. 문장 끝/줄바꿈 커서 튐 */}
  <li className="rounded-lg border p-4">
    <p>
      <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">문제점</span>
      문장 끝 칸에서 줄바꿈 시 커서가 처음 칸으로 튀거나 수정 불가 상태 발생.
    </p>
    <p className="mt-2">
      <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">원인</span>
      경계(끝 인덱스) 조건이 누락되어 다음 요소가 없을 때도 이동을 시도함.
    </p>
    <p className="mt-2">
      <span className="inline-flex items-center text-xs font-semibold bg-emerald-100 px-2 py-0.5 rounded mr-2">해결</span>
      배열 길이 기준으로 경계 체크 후 조기 종료하고, 유효 시에만
      <code>document.getElementById(nextId)?.focus()</code> 호출.
    </p>
    <p className="mt-2">
      <span className="inline-flex items-center text-xs font-semibold bg-blue-100 px-2 py-0.5 rounded mr-2">효과</span>
      경계에서의 비정상 점프 제거, 오입력/재입력 빈도 감소.
    </p>
  </li>

</ul>
      </>
    ),
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
      detail: (
      <>
        <h3 className="mb-5">여행 일정을 공유하고 검색할 수 있는 커뮤니티</h3>
        <p className="text-gray-700 whitespace-pre-line">상세내용</p>
        <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
          <li>마이페이지 UI/UX 구현</li>
          <li>검색 및 알림 기능 개발</li>
          <li>React + Zustand 상태관리 적용</li>
        </ol>
      </>
    ),
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
      detail: (
      <>
        <h3 className="mb-5">캠핑 정보를 모아 보고 예약까지 한 번에</h3>
        <p className="text-gray-700 whitespace-pre-line">상세내용</p>
        <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
          <li>Google OAuth 로그인 연동</li>
          <li>헤더 검색 · 필터링 UX 최적화</li>
          <li>챗봇 FAQ/가이드 플로우 구현</li>
        </ol>
      </>
    ),
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
      detail: (
      <>
        <h3 className="mb-5">취향 기반 AI 여가 추천 & 이벤트 탐색</h3>
        <p className="text-gray-700 whitespace-pre-line">상세내용</p>
        <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
          <li>프롬프트 설계로 챗봇 추천 정밀도 개선</li>
          <li>행사/모임 목록 검색·필터·정렬 구현</li>
          <li>추천 배치/캐시 전략으로 UX 지연 감소</li>
        </ol>
      </>
    ),
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
                detail: p.detail,
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
        detail={modal.detail}
      />
    </>
  );
}

export default App;