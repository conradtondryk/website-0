'use client';

import GithubButton from './GithubButton';
import LinkedInButton from './LinkedInButton';
import EmailButton from './EmailButton';
import DownloadCVButton from './DownloadCVButton';
import ThemeToggleButton from './ThemeToggleButton';

interface SocialButtonsProps {
  githubUrl?: string;
  linkedInUrl?: string;
  emailUrl?: string;
  cvUrl?: string;
}

export default function SocialButtons({
  githubUrl = '',
  linkedInUrl = '',
  emailUrl = '',
  cvUrl = '',
}: SocialButtonsProps) {
  return (
    <div className="flex gap-2 sm:gap-4 items-center justify-center sm:justify-start">
      <GithubButton href={githubUrl} />
      <LinkedInButton href={linkedInUrl} />
      <EmailButton href={emailUrl} />
      <DownloadCVButton href={cvUrl} />
      <ThemeToggleButton />
    </div>
  );
}
