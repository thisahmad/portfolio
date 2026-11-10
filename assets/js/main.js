(()=>{"use strict";
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>[...root.querySelectorAll(s)];
const year=$("[data-year]");if(year)year.textContent=new Date().getFullYear();
const body=document.body,menu=$(".menu"),nav=$(".nav"),progress=$(".scroll-progress"),header=$(".header"),topButton=$(".back-to-top");
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const closeMenu=()=>{if(!menu||!nav)return;nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation")};
if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close navigation":"Open navigation")});$$("a",nav).forEach(a=>a.addEventListener("click",closeMenu));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()})}
const updateScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(max>0?scrollY/max*100:0)+"%";if(header)header.classList.toggle("scrolled",scrollY>20);if(topButton)topButton.classList.toggle("visible",scrollY>500)};
addEventListener("scroll",updateScroll,{passive:true});updateScroll();
if(topButton)topButton.addEventListener("click",()=>scrollTo({top:0,behavior:reduce?"auto":"smooth"}));
const reveal=$$(".reveal");if(!reduce&&"IntersectionObserver"in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});reveal.forEach(el=>observer.observe(el))}else reveal.forEach(el=>el.classList.add("visible"));
const themeButton=$(".theme-toggle");let savedTheme="light";try{savedTheme=localStorage.getItem("ahmad-theme")||"light"}catch{}const applyTheme=theme=>{const dark=theme==="dark";body.classList.toggle("dark-theme",dark);body.classList.remove("light-theme");document.documentElement.style.colorScheme=dark?"dark":"light";const themeMeta=$('meta[name="theme-color"]');if(themeMeta)themeMeta.content=dark?"#10130f":"#f3f2ed";if(themeButton){themeButton.textContent=dark?"☀":"◐";themeButton.setAttribute("aria-label",dark?"Switch to light theme":"Switch to dark theme");themeButton.title=dark?"Switch to light theme":"Switch to dark theme"}};applyTheme(savedTheme);themeButton?.addEventListener("click",()=>{const next=body.classList.contains("dark-theme")?"light":"dark";applyTheme(next);try{localStorage.setItem("ahmad-theme",next)}catch{}});
const overlay=$(".command-overlay"),openCommand=$(".command-open"),closeCommand=$(".command-close"),input=$(".command-input"),results=$$(".command-results a");
const showCommand=()=>{if(!overlay)return;overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");setTimeout(()=>input?.focus(),30)};
const hideCommand=()=>{if(!overlay)return;overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");if(input){input.value="";results.forEach(a=>a.hidden=false)}};
openCommand?.addEventListener("click",showCommand);closeCommand?.addEventListener("click",hideCommand);overlay?.addEventListener("click",e=>{if(e.target===overlay)hideCommand()});
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();showCommand()}if(e.key==="Escape")hideCommand();if(overlay?.classList.contains("open")&&e.key==="Enter"){const first=results.find(a=>!a.hidden);if(first)location.href=first.href}});
input?.addEventListener("input",()=>{const q=input.value.trim().toLowerCase();results.forEach(a=>a.hidden=!a.textContent.toLowerCase().includes(q))});
const toast=$(".toast");let toastTimer;const notify=message=>{if(!toast)return;toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)};
$$("[data-copy]").forEach(button=>button.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(button.dataset.copy);notify("Email address copied")}catch{notify("Copy unavailable — select the email address instead")}}));
const filters=$(".filter-btn"),cards=$(".project-card"),empty=$(".filter-empty");filters.forEach(button=>{button.setAttribute("aria-pressed",String(button.classList.contains("active")));button.addEventListener("click",()=>{filters.forEach(item=>{const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active))});let count=0;cards.forEach(card=>{const show=button.dataset.filter==="all"||card.dataset.category===button.dataset.filter;card.hidden=!show;if(show)count++});if(empty)empty.hidden=count!==0})});


/* Pointer-driven depth and ambient spotlight */
if(!reduce && matchMedia("(pointer:fine)").matches){
 const tiltTargets=$$(".focus-card,.project-card,.roadmap-content,.contact-option,.featured-project");
 tiltTargets.forEach(card=>{
  card.addEventListener("pointermove",event=>{
   const rect=card.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
   card.style.setProperty("--tilt-x",((.5-y)*5).toFixed(2)+"deg");
   card.style.setProperty("--tilt-y",((x-.5)*7).toFixed(2)+"deg");
   card.classList.add("is-tilting");
  });
  card.addEventListener("pointerleave",()=>card.classList.remove("is-tilting"));
 });
 document.addEventListener("pointermove",event=>{
  document.body.style.setProperty("--pointer-x",event.clientX+"px");
  document.body.style.setProperty("--pointer-y",event.clientY+"px");
 },{passive:true});
}
})();