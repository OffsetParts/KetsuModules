import { c as createComponent, r as renderTemplate, a as addAttribute, b as renderHead, d as renderComponent, e as renderSlot, f as createAstro } from '../chunks/astro/server_TA1ylB5y.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                 */
import React, { useEffect } from 'react';
import { useLanyard } from 'react-use-lanyard';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { twMerge } from 'tailwind-merge';
export { renderers } from '../renderers.mjs';

const Navigation = () => {
  const items = {
    information: ["#information", "Information"]
  };
  return /* @__PURE__ */ React.createElement("header", { className: "w-min h-12 bg-zinc-900 border border-zinc-700 rounded fixed isolate overflow-hidden top-4 start-0 end-0 ms-auto me-auto z-50 flex items-center px-3" }, /* @__PURE__ */ React.createElement("nav", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-purple-400" }, "mke"), /* @__PURE__ */ React.createElement("b", null, "|"), /* @__PURE__ */ React.createElement("ul", { className: "flex gap-2" }, Object.entries(items).map(([key, [href, text]]) => /* @__PURE__ */ React.createElement("a", { key, href, className: "hover:text-purple-400" }, text)))));
};

const $$Astro = createAstro();
const $$Home = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Home;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navigation", Navigation, {})} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/lifei/OneDrive/Dokumente/Github/Ketsu Modules/verdant-velocity/src/layouts/Home.astro", void 0);

const Bento = () => {
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-zinc-900 py-12 text-zinc-50 flex justify-center items-center" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto grid max-w-4xl grid-cols-12 gap-2" }, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement(Projects, null), /* @__PURE__ */ React.createElement(Experience, null), /* @__PURE__ */ React.createElement(Contact, null), /* @__PURE__ */ React.createElement(NowPlaying, null), /* @__PURE__ */ React.createElement(UpcomingProjects, null)));
};
const variant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 }
};
const Block = ({ className, ...rest }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  return /* @__PURE__ */ React.createElement(
    motion.div,
    {
      variants: variant,
      ref,
      initial: "hidden",
      animate: control,
      className: twMerge(
        "col-span-4 border rounded border-zinc-700 hover:border-indigo-400 bg-zinc-800 p-3",
        className
      ),
      ...rest
    }
  );
};
const Header = () => /* @__PURE__ */ React.createElement(Block, { className: "row-span-2 md:col-span-7" }, /* @__PURE__ */ React.createElement("h1", { className: "mb-10 text-3xl font-medium leading-tight" }, "i ", /* @__PURE__ */ React.createElement("span", { className: "text-rose-400" }, "procrastinate"), " quite a bit"));
const Projects = () => /* @__PURE__ */ React.createElement(Block, { className: "row-span-2 md:col-span-5" }, /* @__PURE__ */ React.createElement("h1", { className: "mb-3 text-2xl font-medium leading-tight" }, "Projects"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", { href: "https://github.com/HeyDadCoolWhip/quote" }, /* @__PURE__ */ React.createElement("span", { className: "text-indigo-500 hover:text-indigo-300 hover:underline" }, "Quote")), " - A quote grabber made for a CS class"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("span", { className: "text-indigo-500" }, "mke"), " - This website")));
const ExperienceText = ({ language, languageColor, timeLearned, howManyProjects, ...rest }) => {
  return /* @__PURE__ */ React.createElement("p", { className: "py-1" }, /* @__PURE__ */ React.createElement("span", { className: languageColor, ...rest }, language), " | ", timeLearned, " year experience | ", howManyProjects, " projects completed");
};
const Experience = () => {
  const experience = {
    javascript: ["JavaScript", "text-javascript", "<1", "1"],
    python: ["Python", "text-python", "1", "N/A"],
    nodejs: ["NodeJS", "text-nodejs", "3+", "1"],
    lua: ["Lua/Luau", "text-python", "<6", "2"]
  };
  return /* @__PURE__ */ React.createElement(Block, { className: "row-span-2 md:col-span-6" }, /* @__PURE__ */ React.createElement("h1", { className: "mb-3 text-2xl font-medium leading-tight" }, "Experience"), /* @__PURE__ */ React.createElement("ul", null, Object.entries(experience).map(([key, [languageName, languageClass, timeLearned, projects]]) => /* @__PURE__ */ React.createElement(ExperienceText, { key, language: languageName, languageColor: languageClass, timeLearned, howManyProjects: projects }))));
};
const Contact = () => {
  return /* @__PURE__ */ React.createElement(Block, { className: "row-span-2 md:col-span-3" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-medium leading-tight" }, /* @__PURE__ */ React.createElement("a", { href: "", className: "text-[#6228d7] hover:underline decoration-white" }, "rikter"), " ", /* @__PURE__ */ React.createElement("br", null), " co-dev/friend ", /* @__PURE__ */ React.createElement("a", { className: "text-yxn underline animate-wave", href: "https://yxn.rikter.xyz/" }, "yxn")));
};
const NowPlaying = () => {
  const { loading, status, websocket } = useLanyard({
    userId: "685927736916705296",
    socket: true
  });
  const activity = status?.discord_status;
  const songName = status?.spotify?.song;
  status?.spotify?.album_art_url;
  const trackId = status?.spotify?.track_id;
  const artist = status?.spotify?.artist;
  const statusMap = {
    online: ["online", "text-online"],
    offline: ["offline", "text-offline"],
    idle: ["idling", "text-idle"],
    dnd: ["on do not disturb", "text-dnd"]
  };
  const [activityStatusText, activityStatusColor] = statusMap[activity] || ["offline", "text-offline"];
  return /* @__PURE__ */ React.createElement(Block, { className: "row-span-2 md:col-span-3" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-medium leading-tight" }, "I am ", /* @__PURE__ */ React.createElement("span", { className: `${activityStatusColor}` }, activityStatusText)), songName && /* @__PURE__ */ React.createElement("p", { className: "text-lg" }, "Listening to ", /* @__PURE__ */ React.createElement("a", { href: `spotify:track:${trackId}` }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-500 underline decoration-white" }, songName)), " ", artist && /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("br", null), "by ", artist)));
};
const UpcomingProjects = () => /* @__PURE__ */ React.createElement(Block, { className: "row-span-2 md:col-span-12" }, /* @__PURE__ */ React.createElement("h1", { className: "mb-3 text-2xl font-medium leading-tight" }, "Upcoming Projects"), /* @__PURE__ */ React.createElement("ul", { className: "pl-4" }, /* @__PURE__ */ React.createElement("p", null, "Sparrow - A Roblox tycoon with an isometric camera system to act as if a bird is overwatching a company", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("b", { className: "pl-4" }, "Features"), /* @__PURE__ */ React.createElement("ul", { className: "pl-6" }, "- Isometric Camera system ", /* @__PURE__ */ React.createElement("span", null, "("), " pretty much the only feature thats worth noting ", /* @__PURE__ */ React.createElement("span", null, ")"))), /* @__PURE__ */ React.createElement("p", null, "More soon")));

const Main = () => {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("section", { id: "information" }, /* @__PURE__ */ React.createElement(Bento, null)));
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Home", $$Home, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/lifei/OneDrive/Dokumente/Github/Ketsu Modules/verdant-velocity/src/components/Main", "client:component-export": "Main" })} ` })}`;
}, "C:/Users/lifei/OneDrive/Dokumente/Github/Ketsu Modules/verdant-velocity/src/pages/index.astro", void 0);

const $$file = "C:/Users/lifei/OneDrive/Dokumente/Github/Ketsu Modules/verdant-velocity/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
