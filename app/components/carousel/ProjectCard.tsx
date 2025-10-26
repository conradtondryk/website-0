export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  projectUrl,
}: ProjectCardProps) {
  return (
    <a
      href={projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-full sm:w-80 h-64 rounded-lg border border-black/[.08] dark:border-white/[.145] overflow-hidden transition-all hover:border-black/[.2] dark:hover:border-white/[.3] hover:shadow-lg"
    >
      <div className="w-full h-40 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-600">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="h-20 py-2 px-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-black dark:text-zinc-50 mb-1">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {description}
        </p>
        {!imageUrl && (
          <p className="text-sm text-zinc-400 dark:text-zinc-600 mt-1">placeholder</p>
        )}
      </div>
    </a>
  );
}
