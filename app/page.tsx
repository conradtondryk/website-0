'use client';

import { useState } from "react";
import SocialButtons from "./components/buttons/SocialButtons";
import Carousel from "./components/carousel/Carousel";
import ProjectModal, { ModalButton } from "./components/ProjectModal";

export default function Home() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    buttons: ModalButton[];
  }>({
    isOpen: false,
    title: '',
    buttons: []
  });

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
      onClick: () => setModalState({
        isOpen: true,
        title: 'CLI Todo List',
        buttons: [
          {
            label: 'View on GitHub',
            href: 'https://github.com/conradtondryk/todo-project',
            external: true,
            icon: 'github',
            variant: 'primary'
          },
          {
            label: 'Read Blog Post',
            href: '/blog/todo-project',
            variant: 'secondary'
          }
        ]
      }),
      asciiArt: `
  [ ] 1. task one
  [✓] 2. task two
  [ ] 3. task three
`
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col pt-8 pb-32 px-6 sm:px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center sm:items-start">
          <SocialButtons
            githubUrl="https://github.com/conradtondryk"
            linkedInUrl="https://www.linkedin.com/in/conrad-tondryk/"
            emailUrl="mailto:conrad@ctondryk.dev"
            cvUrl="/Conrad_Tondryk_CV.pdf"
          />
          <div className="w-full border-t border-black/[.08] dark:border-white/[.145] my-4"></div>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
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

        <div className="w-full border-t border-black/[.08] dark:border-white/[.145] my-4"></div>

        <div className="mt-12">
          <Carousel
            projects={projects}
            width="w-full"
            imageHeight="h-40"
            textHeight="h-12"
            cardWidth="w-52"
          />
        </div>
      </main>

      <ProjectModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        buttons={modalState.buttons}
      />
    </div>
  );
}
