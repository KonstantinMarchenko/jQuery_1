!function(n){var e={};function t(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=n,t.c=e,t.d=function(n,e,o){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:o})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)t.d(o,r,function(e){return n[e]}.bind(null,r));return o},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(n,e,t){"use strict";t.r(e);t(1);$('<label class="container">All<input type="radio" checked="checked" name="settings" value="1"><span class="checkmark"></span></label><label class="container">Gold<input type="radio" name="settings" value="2"><span class="checkmark"></span></label><label class="container">Silver<input type="radio" name="settings" value="3"><span class="checkmark"></span></label><label class="container">Bronze<input type="radio" name="settings" value="4"><span class="checkmark"></span></label>').appendTo("#radio"),$("#radio").hide(),$('input[name="settings"]').on("change",(function(){"1"===$(this).val()?($(s[0]).show(),$(s[1]).show(),$(s[2]).show()):"2"===$(this).val()?($(s[0]).hide(),$(s[1]).hide(),$(s[2]).show()):"3"===$(this).val()?($(s[0]).hide(),$(s[1]).show(),$(s[2]).hide()):"4"===$(this).val()&&($(s[0]).show(),$(s[1]).hide(),$(s[2]).hide())})),$(document).ready((function(){$("#radio").show(),new Promise((n,e)=>{n()}).then(p)}));let o,r,a=0,i=[],l=[],c=[],s=[".table__row_bronze",".table__row_silver",".table__row_gold"],d=["login","id","contributions","group","company","location","email"],u=["login","id","contributions","company","location","email"];function p(){fetch("https://api.github.com/repos/thomasdavis/backbonetutorials/contributors").then(n=>n.json()).then(n=>{$.each(n,(function(e){l[e]||(l[e]=[]),l[e][0]=n[e].login,l[e][1]=n[e].id,l[e][2]=n[e].contributions,l[e][2]<=10?l[e][3]="Bronze":l[e][2]<=100?l[e][3]="Silver":l[e][3]="Gold",i.push(n[e].url)}))}).then(f).catch(n=>{console.log(n)})}function f(){for(let n=0;n<30;n++)fetch(i[n]).then(n=>n.json()).then(e=>{l[n][4]=e.company,l[n][5]=e.location,l[n][6]=e.email,a++,30===a&&b()}).catch(n=>{console.log(n)})}function b(){$('<table id="tbl_1" class="table"></table>').appendTo(".main"),$('<thead id="th_1"></thead>').appendTo(".table"),$('<tr id="tr_headers"></tr>').appendTo("#th_1"),$("<th></th>").appendTo("#tr_headers");for(let n=0;n<7;n++)$('<th class="table__header" id="th_'+n+'">'+d[n]+"</th>").appendTo("#tr_headers");$('<tbody id="tb_1"></tbody>').appendTo(".table");for(let n=0;n<l.length;n++){$('<tr id="tr_'+n+'" class="table__row"></tr>').appendTo("#tb_1"),$('<button class="button-edit-profile">Edit Profile</button>').appendTo("#tr_"+n);for(let e=0;e<7;e++)3===e&&("Bronze"===l[n][e]?$("#tr_"+n).addClass("table__row_bronze"):"Silver"===l[n][e]?$("#tr_"+n).addClass("table__row_silver"):$("#tr_"+n).addClass("table__row_gold")),$('<td id="td_'+d[e]+"_"+n+'" class="table__cell">'+l[n][e]+"</td>").appendTo("#tr_"+n)}!function(){const n=(n,e)=>n.children[e].innerText||n.children[e].textContent;document.querySelectorAll(".table__header").forEach((function(e){e.addEventListener("click",(function(){const t=e.closest(".table");var o,r;Array.from(t.querySelectorAll(".table__row")).sort((o=Array.from(e.parentNode.children).indexOf(e),r=this.asc=!this.asc,(e,t)=>{return a=n(r?e:t,o),i=n(r?t:e,o),""===a||""===i||isNaN(a)||isNaN(i)?a.toString().localeCompare(i):a-i;var a,i})).forEach((function(n){t.appendChild(n)}))}))}))}()}$(".main").on("click",".button-edit-profile",(function(){c=$(this).closest("tr").attr("id").split("_"),function(n){for(let e=0;e<u.length;e++)o=`#td_${u[e]}_${n}`,"null"===$(o).text()||"undefined"===$(o).text()?$("#field_"+u[e]).val(""):$("#field_"+u[e]).val($(o).text())}(c[1]),$(".modal").css("display","block")})),$(".modal__content").on("click",".close, .cancel",(function(){$(".modal").css("display","none"),$("#label_login, #label_id, #label_contributions, #label_email").text("")})).on("click",".save",(function(){!function(n){let e=!0;for(let n=0;n<3;n++)0===$("#field_"+u[n]).val().length&&($("#label_"+u[n]).text("Please specify "+u[n]),e=!1);for(let n=1;n<3;n++)0!==$("#field_"+u[n]).val().length&&(r=/^\d+$/.test($("#field_"+u[n]).val()),r||($("#label_"+u[n]).text(u[n]+" field should only contain numbers"),e=!1));if(0!==$("#field_email").val().length){$("#field_email").val().includes("@")||($("#label_email").text("Email field must contain @"),e=!1)}if(e){for(let e=0;e<u.length;e++)$(`#td_${u[e]}_`+n).text($("#field_"+u[e]).val());o="#field_contributions",$(o).val()<=10?($("#td_group_"+n).text("Bronze"),$("#tr_"+n).removeClass("table__row_silver table__row_gold").addClass("table__row_bronze")):$(o).val()<=100?($("#td_group_"+n).text("Silver"),$("#tr_"+n).removeClass("table__row_bronze table__row_gold").addClass("table__row_silver")):($("#td_group_"+n).text("Gold"),$("#tr_"+n).removeClass("table__row_bronze table__row_silver").addClass("table__row_gold")),$(".modal").css("display","none"),$("#label_login, #label_id, #label_contributions, #label_email").text("")}}(c[1])}));let h=document.getElementById("modal_1");window.onclick=function(n){n.target===h&&($(".modal").hide(),$("#label_login, #label_id, #label_contributions, #label_email").text(""))}},function(n,e,t){var o=t(2),r=t(3);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[n.i,r,""]]);var a={insert:"head",singleton:!1},i=(o(r,a),r.locals?r.locals:{});n.exports=i},function(n,e,t){"use strict";var o,r=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},a=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),i=[];function l(n){for(var e=-1,t=0;t<i.length;t++)if(i[t].identifier===n){e=t;break}return e}function c(n,e){for(var t={},o=[],r=0;r<n.length;r++){var a=n[r],c=e.base?a[0]+e.base:a[0],s=t[c]||0,d="".concat(c," ").concat(s);t[c]=s+1;var u=l(d),p={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(i[u].references++,i[u].updater(p)):i.push({identifier:d,updater:_(p,e),references:1}),o.push(d)}return o}function s(n){var e=document.createElement("style"),o=n.attributes||{};if(void 0===o.nonce){var r=t.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(n){e.setAttribute(n,o[n])})),"function"==typeof n.insert)n.insert(e);else{var i=a(n.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(e)}return e}var d,u=(d=[],function(n,e){return d[n]=e,d.filter(Boolean).join("\n")});function p(n,e,t,o){var r=t?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(n.styleSheet)n.styleSheet.cssText=u(e,r);else{var a=document.createTextNode(r),i=n.childNodes;i[e]&&n.removeChild(i[e]),i.length?n.insertBefore(a,i[e]):n.appendChild(a)}}function f(n,e,t){var o=t.css,r=t.media,a=t.sourceMap;if(r?n.setAttribute("media",r):n.removeAttribute("media"),a&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleSheet)n.styleSheet.cssText=o;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(o))}}var b=null,h=0;function _(n,e){var t,o,r;if(e.singleton){var a=h++;t=b||(b=s(e)),o=p.bind(null,t,a,!1),r=p.bind(null,t,a,!0)}else t=s(e),o=f.bind(null,t,e),r=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return o(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;o(n=e)}else r()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=r());var t=c(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var o=0;o<t.length;o++){var r=l(t[o]);i[r].references--}for(var a=c(n,e),s=0;s<t.length;s++){var d=l(t[s]);0===i[d].references&&(i[d].updater(),i.splice(d,1))}t=a}}}},function(n,e,t){(e=t(4)(!1)).push([n.i,'.body_no-margins {\n  margin: 0px;\n  text-align: center;\n}\n\n.main {\n  padding: 100px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n.table {\n  margin-left: auto;\n  margin-right: auto;\n  border-collapse: collapse;\n  border: 1px solid black;\n}\n.table__cell {\n  border: 1px solid black;\n  width: 150px;\n}\n.table__header {\n  border: 1px solid black;\n  cursor: pointer;\n}\n.table__row {\n  color: black;\n}\n.table__row_silver {\n  color: silver;\n}\n.table__row_gold {\n  color: gold;\n}\n\n.button-edit-profile {\n  width: 100px;\n}\n.button-edit-profile:hover {\n  cursor: pointer;\n}\n\n.radio {\n  padding: 20px;\n}\n\n.modal {\n  display: none;\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: scroll;\n  background-color: black;\n  background-color: rgba(0, 0, 0, 0.4);\n}\n.modal__content {\n  background-color: #fefefe;\n  margin: 5% auto;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 40%;\n  text-align: left;\n}\n\n.info-label {\n  display: inline-block;\n  width: 100px;\n}\n.info-label_error {\n  color: red;\n}\n.info-input {\n  display: inline-block;\n}\n\n.close {\n  color: #aaa;\n  float: right;\n  font-size: 28px;\n  font-weight: bold;\n}\n.close:hover, .close :focus {\n  color: black;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.container {\n  display: inline-block;\n  position: relative;\n  padding-left: 35px;\n  margin: 12px;\n  cursor: pointer;\n  font-size: 22px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.container input {\n  position: absolute;\n  opacity: 0;\n  cursor: pointer;\n  height: 0;\n  width: 0;\n}\n\n.checkmark {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 25px;\n  width: 25px;\n  background-color: #eee;\n  border-radius: 50%;\n}\n\n.container:hover input ~ .checkmark {\n  background-color: #ccc;\n}\n\n.container input:checked ~ .checkmark {\n  background-color: #2196F3;\n}\n\n.checkmark:after {\n  content: "";\n  position: absolute;\n  display: none;\n}\n\n.container input:checked ~ .checkmark:after {\n  display: block;\n}\n\n.container .checkmark:after {\n  top: 9px;\n  left: 9px;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: white;\n}\n',""]),n.exports=e},function(n,e,t){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=function(n,e){var t=n[1]||"",o=n[3];if(!o)return t;if(e&&"function"==typeof btoa){var r=(i=o,l=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(c," */")),a=o.sources.map((function(n){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(n," */")}));return[t].concat(a).concat([r]).join("\n")}var i,l,c;return[t].join("\n")}(e,n);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,o){"string"==typeof n&&(n=[[null,n,""]]);var r={};if(o)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(r[i]=!0)}for(var l=0;l<n.length;l++){var c=[].concat(n[l]);o&&r[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),e.push(c))}},e}}]);