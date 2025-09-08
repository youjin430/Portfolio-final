import { useEffect, useState } from 'react';
import './App.css'

function Modal({
  open,
  onClose,
  imageSrc,
  link
}:{
    open:boolean;
    onClose:()=>void;
    imageSrc:string;
    link:string;
}){
  useEffect(()=>{
    if(!open) return;
    const onKey=(e:KeyboardEvent)=>e.key==="Escape" && onClose();
    window.addEventListener("keydown",onKey);
    const prev=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{
      window.removeEventListener("keydown",onKey);
      document.body.style.overflow=prev;
    }
  },[open,onClose])

  if(!open) return null;

  return(
    <div
    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30"
    onClick={onClose}>
      <div
      className="relative w-full max-w-[760px]"
      onClick={(e)=>e.stopPropagation()}>
        <button
        className="hover:border-transparent absolute top-3 right-3 z-50 outline-none focus:outline-none focus:ring-0"
        onClick={onClose}>✕</button>
        <img src={imageSrc} />
        {link && (
    <div className="absolute inset-0 flex items-center justify-center">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          px-4 py-2 rounded-lg
          bg-white text-amber-200 text-lg font-semibold
          border border-white/40 shadow-lg
          transition translate-y-26
        "
      >
        🔗 {link}
      </a>
    </div>
  )}
        </div>
        </div>
  )
}

function App() {
const [modal,setModal]=useState<{
  open:boolean;
  imageSrc:string;
  link:string;
}>({open:false,imageSrc:"",link:""})
  return (
    <>
    <div className="flex items-center ml-50 min-h-screen">
      <img src="/유진.png" className="mr-10" />
      <div className="flex flex-col items-start">
        <h1 className="text-3xl font-bold">
    안녕하세요,<br></br>프론트엔드 개발자<br></br>심유진입니다.
  </h1>
  <a href="https://github.com/youjin430"
  target="_blank"
  className="mt-2 text-xl bg-white border-b-4 border-amber-200 inline-block p-2 rounded-lg"
  >
    Github
  </a>
      </div>
    </div>
    <div className="flex ml-50 mb-20 text-3xl gap-150">
      <section>
      <h2 className="mb-5">Skills</h2>
      <div className="flex gap-4 w-10 h-10">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />            
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />            
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg" />            
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
            </div>
            </section>
            <section>
    <h2 className="mb-5">Tools</h2>
    <div className="flex gap-4 w-10 h-10">      
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg" />            
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" />                    
    </div>
  </section>
    </div>
    <div className="ml-50 text-3xl">
      <h2>PROJECT</h2>
    </div>
    <div className="flex flex-wrap pl-50 gap-10 w-full text-xl mb-10">
      <div className="hover:cursor-pointer flex flex-col shrink-0  p-4 mt-5 3xl:w-[350px] w-[250px] h-[350px] bg-emerald-100 rounded-lg"
            onClick={()=>
              setModal({
                open:true,
                imageSrc:"/growengup.png",
                link:"https://growengup.com/home.php"
              })
            }
            onKeyDown={(e)=>e.key===(e.currentTarget as HTMLDivElement).click()}
      >
      영어 회화 학습 서비스
      <br></br>GROWENG-UP<br></br><br></br>
      😀 개발인원 : 3명<br></br>
      🫡 기여한 부분 : 퍼블리싱, 콘텐츠 제작
<a
  href="https://growengup.com/home.php"
  target="_blank"
  onClick={(e) => e.stopPropagation()}
  className="px-3 py-1.5 mt-3 text-sm break-all bg-white/80 text-amber-300 hover:opacity-80 rounded-lg"
>
  🔗 https://growengup.com/home.php
</a>

      <div className="mt-auto flex gap-4 w-8 h-8">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
    </div>
      </div>
      <div className="hover:cursor-pointer flex flex-col shrink-0  p-4 mt-5 3xl:w-[350px] w-[250px] h-[350px] bg-emerald-200 rounded-lg">
      여행 일정 공유 커뮤니티
      <br></br>TravelMate
      <br></br><br></br>
      😀 개발인원 : 5명<br></br>
      🫡 기여한 부분 : 마이페이지, 검색, 알림
      <a
  href="https://clinquant-kangaroo-7d97f3.netlify.app/"
  target="_blank"
  onClick={(e) => e.stopPropagation()}
  className="px-3 py-1.5 mt-3 text-sm break-all bg-white/90 text-amber-400 hover:opacity-80 rounded-lg"
>
  🔗 https://clinquant-kangaroo-7d97f3.netlify.app/
</a>
      <div className="mt-auto flex gap-4 w-8 h-8">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />            
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg" />
    </div>
    </div>
    <div className="hover:cursor-pointer flex flex-col shrink-0  p-4 mt-5 3xl:w-[350px] w-[250px] h-[350px] bg-emerald-100 rounded-lg">
      캠핑 통합 플랫폼
      <br></br>Tember
      <br></br><br></br>
      😀 개발인원 : 5명<br></br>
      🫡 기여한 부분 :<br></br>
      구글 로그인,
헤더(검색,필터링),
챗봇
<a
  href="https://tember.netlify.app/"
  target="_blank"
  onClick={(e) => e.stopPropagation()}
  className="self-start px-3 py-1.5 mt-3 text-sm break-all bg-white/80 text-amber-300 hover:opacity-80 rounded-lg"
>
  🔗 https://tember.netlify.app/
</a>
      <div className="mt-auto flex gap-4 w-8 h-8">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />           
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg" />
    </div>
    </div>
    <div className="hover:cursor-pointer flex flex-col shrink-0  p-4 mt-5 3xl:w-[350px] w-[280px] h-[450px] bg-emerald-200 rounded-lg">
      ai 기반 여가생활 추천 서비스
      <br></br>FUNFUN<br></br><br></br>
      😀 개발인원 :<br></br>프론트엔드 4명, 백엔드 5명<br></br>
      🫡 기여한 부분 :<br></br>
      챗봇 추천,
      행사/모임 페이지(검색,필터링,정렬,추천)
      <a
  href="https://funfunhage.vercel.app/"
  target="_blank"
  onClick={(e) => e.stopPropagation()}
  className="self-start px-3 py-1.5 mt-3 mb-3 text-sm break-all bg-white/90 text-amber-400 hover:opacity-80 rounded-lg"
>
  🔗 https://funfunhage.vercel.app/
</a>
🌟백엔드 리소스 종료로 실서비스 중단(2025.08)
      <div className="mt-auto flex gap-4 w-8 h-8">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />            
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg" />            
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
    </div>
    </div>
    </div>
    <Modal
    open={modal.open}
    onClose={()=>setModal((m)=>({...m,open:false}))}
    imageSrc={modal.imageSrc}
    link={modal.link}
    />
    </>
  )
}

export default App