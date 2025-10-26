import Image from "next/image";
import SocialButtons from "./components/buttons/SocialButtons";
import Carousel from "./components/carousel/Carousel";

export default function Home() {
  const projects = [
    {
      title: "",
      description: "",
      imageUrl: "",
      projectUrl: "",
    },
    {
      title: "",
      description: "",
      imageUrl: "",
      projectUrl: "",
    },
    {
      title: "",
      description: "",
      imageUrl: "",
      projectUrl: "",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col pt-8 pb-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center sm:items-start">
          <SocialButtons
            githubUrl=""
            linkedInUrl=""
            emailUrl=""
            cvUrl=""
          />
          <div className="w-full border-t border-black/[.08] dark:border-white/[.145] my-4"></div>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            conrad tondryk
          </h1>
          <p className="max-w-md text-sm leading-6 text-black  ">
            rust, next.js, react.

          </p>
          <p className="max-w-md text-sm leading-6 text-black ">
            i'm a software engineer, experienced in rust and next.js. check out my projects below, or contact me if you need my services.
          </p>
        </div>

        <div className="w-full border-t border-black/[.08] dark:border-white/[.145] my-4"></div>

        <div className="mt-12">
          <Carousel
            projects={projects}
            width="w-full"
            imageHeight="h-40"
            textHeight="h-12"
          />
        </div>
      </main>
    </div>
  );
}
