/* eslint-disable */
/*! Dark mode switcheroo | MIT License | jrvs.io/darkmode */
// Note: Using sessionStorage instead of localStorage for the iframe'd example, since we're sandboxed from the parent window here.
(function(){var e=window,t=e.document,i=t.body.classList,a=sessionStorage,c="dark_mode_pref_example",d=a.getItem(c),n="dark",o="light",r=o,s=t.querySelector(".dark-mode-toggle"),m=r===n,l=function(e){i.remove(n,o);i.add(e);m=e===n};d===n&&l(n);d===o&&l(o);if(!d){var f=function(e){return"(prefers-color-scheme: "+e+")"};e.matchMedia(f(n)).matches?l(n):e.matchMedia(f(o)).matches?l(o):l(r);e.matchMedia(f(n)).addListener((function(e){e.matches&&l(n)}));e.matchMedia(f(o)).addListener((function(e){e.matches&&l(o)}))}if(s){s.style.visibility="visible";s.addEventListener("click",(function(){if(m){l(o);a.setItem(c,o)}else{l(n);a.setItem(c,n)}}),!0)}})();
