/* eslint-disable */
'use client';

import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useEffect } from 'react';
import 'lite-youtube-embed/src/lite-yt-embed.css';

type YoutubeProps = {
  videoId: string;
  title?: string;
};

type LiteYoutubeElement = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  videoid: string;
  videotitle?: string;
  params?: string;
  playlistid?: string;
};

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'lite-youtube': LiteYoutubeElement;
    }
  }
}

const Youtube = ({ videoId, title }: YoutubeProps) => {
  useEffect(() => {
    void import('lite-youtube-embed/src/lite-yt-embed');
  }, []);

  return <lite-youtube videoid={videoId} videotitle={title} />;
};

export default Youtube;
