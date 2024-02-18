import{a as b,i,S as m}from"./assets/vendor-17e9a240.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))g(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const f of n.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&g(f)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function g(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();const L="https://pixabay.com/api/",I="42274052-b5209bd40b827282c0377ed93",O={key:I,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40},h=async(e,r)=>{const{data:s}=await b.get(`${L}`,{params:{...O,q:e,page:r}});return s},o={form:document.querySelector(".search-form"),input:document.querySelector(".input"),searchBtn:document.querySelector(".search-btn"),list:document.querySelector(".gallery"),loader:document.querySelector(".loader"),sentinel:document.querySelector(".sentinel")};let c=1,u="",a=0,l=0,d;o.form.addEventListener("submit",v);async function v(e){if(p.disconnect(o.sentinel),e.preventDefault(),o.loader.classList.remove("hidden"),c=1,u="",a=0,l=0,!e.currentTarget.searchQuery.value.trim()){i.error({message:"Sorry, your search query is empty. Please try again.",position:"topRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft",backgroundColor:"orange"}),o.loader.classList.add("hidden"),o.list.innerHTML="";return}try{u=e.currentTarget.searchQuery.value.trim();const r=await h(e.currentTarget.searchQuery.value.trim(),c);R(r),a>=l&&a>0&&i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft"})}catch(r){o.loader.classList.add("hidden"),i.error({message:`${r.message}`,position:"topRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft",backgroundColor:"orange"})}p.observe(o.sentinel),e.target.reset()}function R(e){if(o.loader.classList.add("hidden"),!e.totalHits){i.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft",backgroundColor:"orange"}),o.list.innerHTML="";return}c+=1,l=e.totalHits,a+=e.hits.length,i.success({message:`Hooray! We found ${e.totalHits} images.`,position:"topRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft",backgroundColor:"green"}),o.list.innerHTML=y(e),d=new m(".gallery a",{captionDelay:250}),d.refresh()}function y({hits:e}){return e.map(s=>`<a class="link" href=${s.largeImageURL} id=${s.id}><div class="photo-card" >
    <div class="img-wrap"><img src=${s.webformatURL} alt=${s.tags} loading="lazy"/></div>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            <span>${s.likes}</span>
        </p>
        <p class="info-item">
            <b>Views</b>
            <span>${s.views}</span>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <span>${s.comments}</span>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <span>${s.downloads}</span>
        </p>
    </div>
</div></a>`).join("")}async function S(){d.destroy();try{const e=await h(u,c);o.list.insertAdjacentHTML("beforeend",y(e)),c+=1,a+=e.hits.length,d=new m(".gallery a",{captionDelay:250}),a>=l&&i.info({message:"We're sorry, but you've reached the end of search results.",position:"toptopRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft"})}catch(e){i.error({message:`${e.message}`,position:"topRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft"})}}const w=e=>{e.forEach(r=>{r.isIntersecting&&u!==""&&a<l&&S()})},p=new IntersectionObserver(w,{rootMargin:"200px"});
//# sourceMappingURL=commonHelpers.js.map
