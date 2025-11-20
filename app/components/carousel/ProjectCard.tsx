import { ModalButton } from '../ProjectModal';

export interface ProjectCardProps {
  title: string;
  imageUrl: string;
  projectUrl?: string;
  onClick?: () => void;
  imageHeight?: string;
  textHeight?: string;
  cardWidth?: string;
  asciiArt?: string;
  modalConfig?: {
    title: string;
    buttons: ModalButton[];
  };
}

export default function ProjectCard({
  title,
  imageUrl,
  projectUrl,
  onClick,
  imageHeight = 'h-40',
  textHeight = 'h-12',
  cardWidth = 'w-52',
  asciiArt,
}: ProjectCardProps) {
  const content = (
    <>
      {asciiArt ? (
        <pre className="text-[8px] leading-[0.9] text-green-600 dark:text-green-400 font-mono whitespace-pre overflow-hidden flex items-center justify-center w-full h-full p-2 select-none">
          {asciiArt}
        </pre>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <svg
          className="w-16 h-16 text-zinc-400 dark:text-zinc-600"
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
      )}
    </>
  );

  return (
    <div className={`flex-shrink-0 ${cardWidth} rounded-lg border border-black/[.08] dark:border-white/[.145] overflow-hidden transition-all hover:border-black/[.2] dark:hover:border-white/[.3] hover:shadow-lg flex flex-col`}>
      {/* Image Box */}
      {onClick ? (
        <div
          onClick={onClick}
          className={`w-full ${imageHeight} bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center cursor-pointer`}
        >
          {content}
        </div>
      ) : (
        <a
          href={projectUrl}
          className={`w-full ${imageHeight} bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center cursor-pointer`}
        >
          {content}
        </a>
      )}

      {/* Text Box */}
      <div className={`w-full ${textHeight} flex items-center justify-center text-center select-none`}>
        <p className="text-sm text-black dark:text-zinc-50">{title}</p>
      </div>
    </div>
  );
}
