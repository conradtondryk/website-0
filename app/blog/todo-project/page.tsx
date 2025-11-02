import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

export default function TodoProjectBlog() {
  const markdownPath = path.join(process.cwd(), 'public', 'blog_post.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
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

        <article className="prose prose-zinc dark:prose-invert max-w-none text-black dark:text-white
          prose-headings:font-semibold prose-headings:text-black dark:prose-headings:text-white
          prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-0 prose-h1:leading-tight
          prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b prose-h2:border-black/[.08] dark:prose-h2:border-white/[.145]
          prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:font-medium
          prose-p:text-base prose-p:leading-7 prose-p:mb-4 prose-p:text-black dark:prose-p:text-white
          prose-li:text-base prose-li:leading-7 prose-li:text-black dark:prose-li:text-white
          prose-code:text-sm prose-code:bg-zinc-100 prose-code:dark:bg-zinc-800
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-black dark:prose-code:text-white
          prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
          prose-pre:bg-zinc-100 prose-pre:dark:bg-zinc-800 prose-pre:text-black dark:prose-pre:text-white
          prose-pre:border prose-pre:border-black/[.08] prose-pre:dark:border-white/[.145]
          prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
          prose-a:text-black prose-a:dark:text-white prose-a:underline prose-a:decoration-2 prose-a:underline-offset-2
          prose-strong:text-black prose-strong:dark:text-white prose-strong:font-semibold
          prose-ul:my-4 prose-ol:my-4 prose-ul:list-disc prose-ol:list-decimal
          prose-hr:border-black/[.08] dark:prose-hr:border-white/[.145] prose-hr:my-8
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdownContent}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
