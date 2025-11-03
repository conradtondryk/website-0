import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import ThemeToggleButton from '@/app/components/buttons/ThemeToggleButton';
import './blog-styles.css';

export default function TodoProjectBlog() {
  const markdownPath = path.join(process.cwd(), 'app', 'blog', 'todo-project', 'blog_post.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* Sticky Buttons */}
      <div className="fixed top-6 left-6 z-50">
        <ThemeToggleButton />
      </div>

      <a
        href="https://github.com/conradtondryk/todo-project"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg text-sm font-medium"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        View on GitHub
      </a>

      <main className="flex min-h-screen w-full max-w-3xl flex-col pt-8 pb-32 px-6 sm:px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center sm:items-start mb-8">
          <Link
            href="/"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            ← back to home
          </Link>
          <div className="w-full border-t border-black/[.08] dark:border-white/[.145] my-4"></div>
        </div>

        <article className="blog-content prose prose-zinc dark:prose-invert max-w-none text-black dark:text-white
          prose-headings:font-semibold prose-headings:text-black dark:prose-headings:text-white
          prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:leading-tight
          prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:pb-3 prose-h2:border-b prose-h2:border-black/[.08] dark:prose-h2:border-white/[.145]
          prose-h3:text-2xl prose-h3:mb-5 prose-h3:mt-10 prose-h3:font-medium
          prose-p:text-base prose-p:leading-8 prose-p:mb-6 prose-p:text-black dark:prose-p:text-white
          prose-li:text-base prose-li:leading-8 prose-li:mb-2 prose-li:text-black dark:prose-li:text-white
          prose-code:text-sm prose-code:bg-amber-50 prose-code:dark:bg-amber-950/40
          prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-amber-900 dark:prose-code:text-amber-200
          prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
          prose-code:border prose-code:border-amber-200/50 dark:prose-code:border-amber-800/50
          prose-pre:text-black dark:prose-pre:text-white
          prose-pre:border prose-pre:border-slate-200 prose-pre:dark:border-zinc-700
          prose-pre:p-6 prose-pre:my-8 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-sm
          prose-a:text-black prose-a:dark:text-white prose-a:underline prose-a:decoration-2 prose-a:underline-offset-2
          prose-strong:text-black prose-strong:dark:text-white prose-strong:font-semibold
          prose-ul:my-6 prose-ul:space-y-2 prose-ol:my-6 prose-ol:space-y-2 prose-ul:list-disc prose-ol:list-decimal
          prose-hr:border-black/[.08] dark:prose-hr:border-white/[.145] prose-hr:my-12
        ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {markdownContent}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
