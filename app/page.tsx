'use client';

import SocialButtons from "./components/buttons/SocialButtons";
import Carousel from "./components/carousel/Carousel";

export default function Home() {

  const projects = [
    {
      title: "advent of code.",
      imageUrl: "",
      projectUrl: "https://github.com/conradtondryk/advent",
      asciiArt: `
         ★
        >o<
       >o*o<
      >o*o*o<
     >o*o*o*o<
    >o*o*o*o*o<
   >o*o*o*o*o*o<
  >o*o*o*o*o*o*o<
 >o*o*o*o*o*o*o*o<
        |||
        |||
       [___]
`
    },
    {
      title: "cli todo list.",
      imageUrl: "",
      projectUrl: "/blog/todo-project",
      asciiArt: `
  [ ] 1. task one
  [✓] 2. task two
  [ ] 3. task three
`
    },
  ];

  return (
    <div className="flex h-dvh sm:min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex h-full w-full max-w-3xl flex-col justify-evenly px-6 sm:gap-0 sm:py-8 sm:px-16 sm:min-h-screen sm:justify-start bg-white dark:bg-black">
        <div className="flex flex-col items-center sm:items-start flex-shrink-0">
          <SocialButtons
            githubUrl="https://github.com/conradtondryk"
            linkedInUrl="https://www.linkedin.com/in/conrad-tondryk/"
            emailUrl="mailto:conrad@ctondryk.dev"
            cvUrl="/Conrad_Tondryk_CV.pdf"
          />
          <div className="w-full border-t border-black/[.08] dark:border-white/[.145] mt-4 sm:my-4"></div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:gap-6 text-center sm:items-start sm:text-left flex-shrink-0">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            conrad tondryk
          </h1>
          <p className="max-w-md text-sm leading-6 text-black dark:text-zinc-50">
            rust, next.js, react.

          </p>
          <p className="max-w-md text-sm leading-6 text-black dark:text-zinc-50">
            i'm a software engineer, using rust and next.js. check out my projects below, or feel free to contact me.
          </p>
        </div>

        <div className="w-full border-t border-black/[.08] dark:border-white/[.145] sm:my-4 flex-shrink-0"></div>

        <div className="sm:mt-12 flex-shrink-0">
          <Carousel
            projects={projects}
            width="w-full"
            imageHeight="h-32 sm:h-40"
            textHeight="h-10 sm:h-12"
            cardWidth="w-52"
          />
        </div>
      </main>
    </div>
  );
}
