(()=>{var t={n:o=>{var r=o&&o.__esModule?()=>o.default:()=>o;return t.d(r,{a:r}),r},d:(o,r)=>{for(var e in r)t.o(r,e)&&!t.o(o,e)&&Object.defineProperty(o,e,{enumerable:!0,get:r[e]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};(()=>{"use strict";t.r(o),t.d(o,{components:()=>_});const r=flarum.core.compat["common/extend"],e=flarum.core.compat["forum/app"];var n=t.n(e);const s=flarum.core.compat["forum/components/IndexPage"];var a=t.n(s);const i=flarum.core.compat["forum/states/DiscussionListState"];var c=t.n(i);function u(t,o){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,o){return t.__proto__=o,t},u(t,o)}function p(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,u(t,o)}const l=flarum.core.compat["common/Component"];var d=t.n(l);const f=flarum.core.compat["common/components/Button"];var b=t.n(f);const g=flarum.core.compat["common/utils/classList"];var v=t.n(g);function h(t){return t.startsWith("-")?t.substring(1):"-"+t}var S=function(t){function o(){return t.apply(this,arguments)||this}p(o,t);var r=o.prototype;return r.view=function(){var t=this.getSortDirection();return m(b(),{class:v()(["Button","Button--icon","Blomstra-SortDirectionToggle",{active:this.isExtendedSortField(),disabled:!this.oppositeFrontendSort()}]),onclick:this.toggleSortDirection.bind(this),"aria-label":n().translator.trans("blomstra-sort-order-toggle.forum.sort-toggle."+t+"-label"),icon:"desc"===t?"fas fa-sort-amount-down":"fas fa-sort-amount-up"})},r.getApiSort=function(){var t=n().search.params().sort,o=t&&n().discussions.extendedSortMap()[t];return o||(o=Object.values(n().discussions.sortMap())[0]),o},r.getSortDirection=function(){return this.getApiSort().startsWith("-")?"desc":"asc"},r.isExtendedSortField=function(){var t=n().search.params().sort;return t&&!n().discussions.sortMap()[t]&&n().discussions.extendedSortMap()[t]},r.oppositeFrontendSort=function(){var t=h(this.getApiSort()),o=n().discussions.extendedSortMap(),r=null;for(var e in o)if(o[e]===t){r=e;break}return r},r.toggleSortDirection=function(){var t=this.oppositeFrontendSort();t&&n().search.changeSort(t)},o}(d());const y=flarum.core.compat["common/components/Dropdown"];var x=t.n(y),O=function(t){function o(){return t.apply(this,arguments)||this}return p(o,t),o.prototype.view=function(){var t=n().discussions.sortMap(),o=Object.keys(t).reduce((function(t,o){return t[o]=n().translator.trans("core.forum.index_sort."+o+"_button"),t}),{}),r=n().search.params().sort,e=o[r]||Object.keys(t).map((function(t){return o[t]}))[0],s=n().discussions.extendedSortMap()[r];if(s&&t[r]!==s){var a=h(s);for(var i in e="N/A",t)if(t[i]===a){e=o[i];break}"N/A"===e&&console.warn("Could not find a label for REST sort "+a)}return x().component({buttonClassName:"Button",label:e,accessibleToggleLabel:n().translator.trans("core.forum.index_sort.toggle_dropdown_accessible_label")},Object.keys(o).map((function(e){var s=o[e],a=(r||Object.keys(t)[0])===e;return b().component({icon:!a||"fas fa-check",onclick:n().search.changeSort.bind(n().search,e),active:a},s)})))},o}(d()),_={SortDirectionToggler:S};n().initializers.add("blomstra/sort-order-toggle",(function(){(0,r.extend)(a().prototype,"viewItems",(function(t){"byobuPrivate"!==n().current.data.routeName&&t.has("sort")&&(t.add("sortDirectionToggle",m(S,null),100),t.setContent("sort",m(O,null)))})),c().prototype.extendedSortMap=function(){var t={};this.params.q&&(t.relevance="");var o=n().forum.attribute("sortOrderToggleExtendedMap")||{};for(var r in o)t[r]=o[r];return t},(0,r.extend)(c().prototype,"requestParams",(function(t){var o=this.params.sort&&this.extendedSortMap()[this.params.sort];o&&(t.sort=o)}))}))})(),module.exports=o})();
//# sourceMappingURL=forum.js.map