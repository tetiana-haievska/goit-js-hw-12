import{a as L,S as w,i as b}from"./assets/vendor-tnUJPedx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();const S="47504647-de6fca25d262a81a07b30a07f",v="https://pixabay.com/api/";async function y(e,r=1,s=15){const o=`${v}?key=${S}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${s}`;try{return(await L.get(o)).data}catch(t){throw console.error("Error fetching images:",t.message),t}}let u;function h(e){const r=document.querySelector(".gallery"),s=e.map(o=>`
    <a href="${o.largeImageURL}" class="gallery__item">
      <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${o.likes}</p>
        <p><b>Views:</b> ${o.views}</p>
        <p><b>Comments:</b> ${o.comments}</p>
        <p><b>Downloads:</b> ${o.downloads}</p>
      </div>
    </a>`).join("");r.innerHTML+=s,u?u.refresh():u=new w(".gallery a",{captionDelay:250,captionsData:"alt"})}function $(){const e=document.querySelector(".gallery");e.innerHTML=""}function m(){document.querySelector(".loader").classList.remove("hidden")}function p(){document.querySelector(".loader").classList.add("hidden")}function c(e,r="info"){b[r]({title:"Notification",message:e,position:"topRight"})}let i="",a=1,g=0;const q=document.querySelector(".search-form"),f=document.querySelector(".load-more"),E=document.querySelector(".gallery");function l(e){e?f.classList.remove("hidden"):f.classList.add("hidden")}q.addEventListener("submit",async e=>{if(e.preventDefault(),i=e.target.querySelector(".search-input").value.trim(),!!i){a=1,$(),l(!1),m();try{const r=await y(i,a);g=r.totalHits,r.hits.length===0?(c("Sorry, no images found.","error"),l(!1)):(h(r.hits),l(!0))}catch{c("Something went wrong. Please try again.","error")}finally{p()}}});f.addEventListener("click",async()=>{a+=1,m();try{const e=await y(i,a);e.hits.length===0||a*15>=g?(c("We're sorry, but you've reached the end of search results.","info"),l(!1)):(h(e.hits),I())}catch{c("Something went wrong. Please try again.","error")}finally{p()}});function I(){const e=E.lastElementChild,{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map