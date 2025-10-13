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
    className={`relative group cursor-pointer ml-27 hover:scale-[1.02] transition-transform 
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

    {/* 🪄 Hover 오버레이 */}
    <div
      className="absolute inset-0 rounded-lg bg-black/20 flex items-center justify-center
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                 pointer-events-none group-hover:pointer-events-auto"
    >
      <button
        onClick={onClick}
        className="px-4 py-2 bg-white text-gray-900 font-medium rounded-lg shadow
                   hover:bg-gray-100 transition"
      >
        자세히 보기
      </button>
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
        className="relative w-[92vw] max-w-[800px] min-h-[70vh] max-h-[90vh]
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
    <h3 className="mb-1">여행 일정을 공유하고 검색할 수 있는 커뮤니티</h3>
    <p className="text-gray-700 whitespace-pre-line mb-4">
      사용자들이 자신의 여행 일정을 카드/캘린더 형태로 공유하고, 관심 지역·기간·태그로 손쉽게 검색할 수 있는 서비스입니다.
      댓글/좋아요/스크랩과 팔로우 기반 알림으로 상호작용을 강화했습니다.
    </p>

    {/* 💡 주요 기능 및 특징 */}
    <h4 className="font-medium text-lg mb-2">💡 주요 기능 및 특징</h4>
    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-5">
      <li><b>일정 공유</b> — 카드/캘린더 보기 지원, 태그·사진 첨부</li>
      <li><b>고급 검색</b> — 키워드·지역·기간·태그 복합 필터 및 정렬</li>
      <li><b>알림</b> — 댓글/좋아요/팔로우 이벤트 실시간 드롭다운 알림</li>
      <li><b>마이페이지</b> — 나의 일정/스크랩/활동 통계 확인</li>
    </ul>

    {/* 👩‍💻 담당 역할 및 구현 */}
    <h4 className="font-medium text-lg mb-2">👩‍💻 담당 역할 및 구현</h4>
    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-5">
      <li>마이페이지 UI/UX 구성(반응형 그리드, 접근성 고려 탭/카드)</li>
      <li>검색 상태 전역 관리(Zustand) + <code>URLSearchParams</code> 동기화로 공유 가능한 검색 URL 구현</li>
      <li>알림 드롭다운/토스트 컴포넌트, 읽음 처리/페이징 및 무한 스크롤(<code>IntersectionObserver</code>)</li>
    </ul>

    {/* ⚙️ 트러블슈팅 */}
    <h4 className="font-medium text-lg mb-2">⚙️ 트러블슈팅</h4>
    <ul className="space-y-4 text-gray-800 mb-5">
      <li className="rounded-lg border p-4">
        <p>
          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">문제점</span>
          브라우저 뒤로가기 시 검색 필터가 초기화되어 사용자 혼란 발생.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">원인</span>
          초기 마운트 시 전역 상태를 기본값으로 재설정, URL→상태 복원 로직 누락.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-emerald-100 px-2 py-0.5 rounded mr-2">해결</span>
          <code>useEffect</code>에서 최초 1회 <b>URL→Store</b> 복원 후, 이후 변경은 <b>Store→URL</b>로 반영.
          <code>history.replaceState</code> 사용으로 히스토리 오염 방지.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-blue-100 px-2 py-0.5 rounded mr-2">효과</span>
          뒤로가기/새로고침에서도 동일 검색 컨텍스트 유지, 이탈률 감소.
        </p>
      </li>

      <li className="rounded-lg border p-4">
        <p>
          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">문제점</span>
          무한 스크롤 구간에서 API 중복 호출 및 중복 카드 렌더링.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">원인</span>
          관찰 대상이 로딩 중에도 계속 관찰되어 <code>onIntersect</code>가 재실행, 로딩 플래그/커서 검증 부재.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-emerald-100 px-2 py-0.5 rounded mr-2">해결</span>
          <code>inFlight</code> 플래그 + <code>cursor</code> 기반 페이지네이션, 요청 전 <code>unobserve</code> → 완료 후 재등록.
          스로틀/디바운스 200~300ms 적용.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-blue-100 px-2 py-0.5 rounded mr-2">효과</span>
          API 중복 호출 제거, 스크롤 체감 지연 감소.
        </p>
      </li>
    </ul>
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
    <h3 className="mb-1">캠핑 정보를 모아 보고 예약까지 한 번에</h3>
    <p className="text-gray-700 whitespace-pre-line mb-4">
      전국 캠핑장 정보를 검색/필터링하고 지도로 탐색하며, 외부 예약 링크로 빠르게 이동할 수 있는 통합 플랫폼입니다.
      서비스명 <b>Tember</b>는 <b>Tent</b>와 불꽃을 뜻하는 <b>ember</b>의 합성어로, “텐트 위에서 타오르는 불”을
      떠올리게 하는 캠핑 이미지를 담았습니다.
    </p>

    {/* 💡 주요 기능 및 특징 */}
    <h4 className="font-medium text-lg mb-2">💡 주요 기능 및 특징</h4>
    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-5">
      <li><b>OAuth 로그인</b> — Google 계정으로 간편 인증</li>
      <li><b>통합 검색</b> — 키워드/지역/테마/편의시설/가격대 복합 필터</li>
      <li><b>지도 탐색</b> — 지도 범위 내 결과만 보기 &amp; 클러스터링</li>
      <li><b>챗봇</b> — 예약/장비/주의사항 등 FAQ 대화 플로우 제공</li>
    </ul>

    {/* 👩‍💻 담당 역할 및 구현 */}
    <h4 className="font-medium text-lg mb-2">👩‍💻 담당 역할 및 구현</h4>
    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-5">
      <li>Google OAuth 연동(상태 토큰/nonce 검증, 토큰 갱신/만료 처리)</li>
      <li>헤더 검색·필터링 컴포넌트(멀티셀렉트, 접근성 고려 키보드 내비게이션)</li>
      <li>챗봇 시나리오(FAQ 트리·가이드 플로우, 퀵 액션 버튼) 설계/구현</li>
    </ul>

    {/* ⚙️ 트러블슈팅 */}
    <h4 className="font-medium text-lg mb-2">⚙️ 트러블슈팅</h4>
    <ul className="space-y-4 text-gray-800 mb-5">
      <li className="rounded-lg border p-4">
        <p>
          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">문제 상황</span>
          OpenAI API로 받은 챗봇 응답이 네트워크 요청은 정상인데 화면에 전혀 표시되지 않는 현상 발생.
        </p>

        <p className="mt-3">
          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">원인 분석</span>
          응답 객체에서 메시지 추출 경로를 잘못 사용하여 <code>choices</code> 배열만 접근하고 있었음.
          실제 응답 구조는 아래와 같았고, 텍스트는 <code>data.choices[0].message.content</code>에 존재.
        </p>

        <pre className="mt-3 bg-gray-50 border rounded-md p-3 overflow-x-auto text-sm">
{`{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "안녕하세요, 무엇을 도와드릴까요?"
      }
    }
  ]
}`}
        </pre>

        <p className="mt-3">
          <span className="inline-flex items-center text-xs font-semibold bg-emerald-100 px-2 py-0.5 rounded mr-2">해결 방법</span>
          콘솔로 응답 전체를 확인한 뒤 경로를 <code>data.choices[0].message.content</code>로 수정하여
          정확히 파싱. 이 후 정상적으로 화면에 챗봇 응답이 표시됨.
        </p>

        <p className="mt-3">
          <span className="inline-flex items-center text-xs font-semibold bg-blue-100 px-2 py-0.5 rounded mr-2">배운 점</span>
          문서만 읽는 것에 그치지 않고 실제 응답 구조를 콘솔로 검증하는 디버깅 습관의 중요성 확인.
          작아 보이는 접근 경로 오류 하나가 전체 기능을 막을 수 있으므로, 데이터 흐름을 끝까지 추적·검증할 것.
        </p>
      </li>
    </ul>
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
    <h3 className="mb-1">취향 기반 AI 여가 추천 & 이벤트 탐색</h3>
    <p className="text-gray-700 whitespace-pre-line mb-4">
      사용자 취향/상황(날짜·지역·예산 등)에 맞춰 활동/이벤트를 추천하고,
      모임을 개설·탐색할 수 있는 서비스입니다.
      <span className="block mt-1 text-sm text-gray-500">
        🌟 백엔드 리소스 종료로 실서비스 중단(2025.08)
      </span>
    </p>

    {/* 💡 주요 기능 및 특징 */}
    <h4 className="font-medium text-lg mb-2">💡 주요 기능 및 특징</h4>
    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-5">
      <li><b>챗봇 추천</b> — 프롬프트 설계/후처리로 맥락 유지·중복 제거</li>
      <li><b>행사/모임 탐색</b> — 검색·필터(지역/카테고리/날짜)·정렬</li>
      <li><b>추천 성능</b> — 캐시/배치 프리컴퓨트로 첫 화면 지연 감소</li>
      <li><b>즐겨찾기/스크랩</b> — 개인화된 저장/재추천 루프</li>
    </ul>

    {/* 👩‍💻 담당 역할 및 구현 */}
    <h4 className="font-medium text-lg mb-2">👩‍💻 담당 역할 및 구현</h4>
    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-5">
      <li>챗봇 프롬프트 엔지니어링(시스템/사용자 프롬프트 분리, 안전 가드레일)</li>
      <li>행사/모임 목록 검색·필터·정렬 UI, 가상 스크롤·스켈레톤 적용</li>
      <li>추천 캐시 전략(쿼리 키 설계, 사전 패치/프리페치, 낙관적 업데이트)으로 UX 지연 최소화</li>
    </ul>

    {/* ⚙️ 트러블슈팅 */}
    <h4 className="font-medium text-lg mb-2">⚙️ 트러블슈팅</h4>
    <ul className="space-y-4 text-gray-800 mb-5">
      <li className="rounded-lg border p-4">
        <p>
          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">문제점</span>
          챗봇이 유사한 항목을 반복 추천하거나 특정 카테고리에 편향.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">원인</span>
          프롬프트 장황 및 후처리 중복 제거 미흡, 컨텍스트 길이 초과로 요약 손실.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-emerald-100 px-2 py-0.5 rounded mr-2">해결</span>
          결과 <b>디듀프</b>(타이틀 정규화·유사도 임계), <b>카테고리 다양성 제약</b> 추가,
          토큰 상한/스톱시퀀스 도입 및 대화 요약 단계 삽입.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-blue-100 px-2 py-0.5 rounded mr-2">효과</span>
          추천 다양성·신뢰도 향상, 이탈 감소.
        </p>
      </li>

      <li className="rounded-lg border p-4">
        <p>
          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">문제점</span>
          필터 연속 변경 시 리스트 재렌더가 과도하여 프레임 드랍 발생.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded mr-2">원인</span>
          동기 요청 누적 및 취소 불가, 메모이제이션 미흡으로 불필요한 재계산.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-emerald-100 px-2 py-0.5 rounded mr-2">해결</span>
          요청 <b>취소</b>(<code>AbortController</code>) + <b>디바운스</b>,
          리스트 <b>가상화</b>(예: <code>react-window</code>) 및 <code>useMemo</code>/<code>useCallback</code> 최적화.
        </p>
        <p className="mt-2">
          <span className="inline-flex items-center text-xs font-semibold bg-blue-100 px-2 py-0.5 rounded mr-2">효과</span>
          FPS 및 입력 반응성 개선, 체감 속도 상승.
        </p>
      </li>
    </ul>
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
            성장하는 프론트엔드 개발자
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