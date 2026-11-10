(()=>{const y=document.querySelector("[data-year]");if(y)y.textContent=new Date().getFullYear();
const menu=document.querySelector(".menu"),nav=document.querySelector(".nav");
if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close navigation":"Open navigation")});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));document.addEventListener("keydown",e=>{if(e.key==="Escape"){nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}})}
const bar=document.querySelector(".progress"),header=document.querySelector(".header");
const update=()=>{if(bar){const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?scrollY/max*100:0)+"%"}if(header)header.classList.toggle("scrolled",scrollY>18)};
addEventListener("scroll",update,{passive:true});update();
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const els=document.querySelectorAll(".reveal");
if(!reduce&&"IntersectionObserver"in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});els.forEach(el=>io.observe(el))}else els.forEach(el=>el.classList.add("visible"));
/* Subtle pointer tilt follows the reference-style animated card hover treatment. */
if(!reduce&&matchMedia("(hover:hover) and (pointer:fine)").matches){document.querySelectorAll(".card").forEach(card=>{card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty("--spot-x",(x*100)+"%");card.style.setProperty("--spot-y",(y*100)+"%");card.style.setProperty("--card-rx",((.5-y)*5)+"deg");card.style.setProperty("--card-ry",((x-.5)*7)+"deg")});card.addEventListener("pointerleave",()=>{card.style.removeProperty("--spot-x");card.style.removeProperty("--spot-y");card.style.removeProperty("--card-rx");card.style.removeProperty("--card-ry")})})}
/* A scroll-snap carousel that remains usable with touch, mouse and keyboard. */
document.querySelectorAll(".cards").forEach((track,index)=>{const cards=[...track.querySelectorAll(".card")];if(cards.length<2)return;
const wrapper=document.createElement("div");wrapper.className="cards-carousel";track.parentNode.insertBefore(wrapper,track);wrapper.append(track);
const controls=document.createElement("div");controls.className="carousel-controls";controls.setAttribute("aria-label","Learning cards carousel controls");
const count=document.createElement("span");count.className="carousel-count";count.setAttribute("aria-live","polite");
const prev=document.createElement("button");prev.type="button";prev.className="carousel-arrow";prev.textContent="←";prev.setAttribute("aria-label","Previous cards");
const next=document.createElement("button");next.type="button";next.className="carousel-arrow";next.textContent="→";next.setAttribute("aria-label","Next cards");
controls.append(count,prev,next);wrapper.append(controls);
const step=()=>{const c=track.querySelector(".card");return c?c.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap||0):track.clientWidth};
const refresh=()=>{const max=Math.max(0,track.scrollWidth-track.clientWidth-2),position=track.scrollLeft;const current=Math.min(cards.length,Math.max(1,Math.round(position/step())+1));count.innerHTML="<strong>"+String(current).padStart(2,"0")+"</strong> / "+String(cards.length).padStart(2,"0");prev.disabled=position<=2;next.disabled=position>=max-2};
prev.addEventListener("click",()=>track.scrollBy({left:-step(),behavior:reduce?"auto":"smooth"}));next.addEventListener("click",()=>track.scrollBy({left:step(),behavior:reduce?"auto":"smooth"}));track.addEventListener("scroll",refresh,{passive:true});addEventListener("resize",refresh);track.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();track.scrollBy({left:step(),behavior:reduce?"auto":"smooth"})}if(e.key==="ArrowLeft"){e.preventDefault();track.scrollBy({left:-step(),behavior:reduce?"auto":"smooth"})}});refresh();
});
document.querySelectorAll(".art,.mock").forEach(el=>{if(reduce)return;el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty("--pointer-x",(x*2).toFixed(3));el.style.setProperty("--pointer-y",(y*2).toFixed(3))});el.addEventListener("pointerleave",()=>{el.style.removeProperty("--pointer-x");el.style.removeProperty("--pointer-y")})});
})();