import urlParser from "js-video-url-parser";

import getVideoEmbedHTml from "../../components/basic/VideoEmbed";

import drupalConfig from "../../config/drupal/drupal.config";

const getVideoURL = (provider: string, id: string) => {
  if (provider === 'youtube') {
    return `https://www.youtube.com/embed/${id}`
  } else if (provider === 'vimeo') {
    return `https://player.vimeo.com/video/${id}`
  } else if (provider === 'dailymotion') {
    return `https://www.dailymotion.com/embed/video/${id}`
  }
}

/**
 * Util function to parse HTML returned by Drupal.
 */

const parseHTML = (html: String): String => {
  
  const EMBED_WRAPPER_START = '<p>';
  const EMBED_WRAPPER_END = '</p>';
  const STARTING_EMBED = `${EMBED_WRAPPER_START}{`;
  const ENDING_EMBED = `]}${EMBED_WRAPPER_END}`;
  const INLINE_IMAGES_PATH = '/sites/default/files/inline-images';
  const VIDEO_EMBED_PREVIEW_PATH = '/sites/default/files/styles/video_embed_wysiwyg_preview';

  let parsedHTML = html.replace(INLINE_IMAGES_PATH, `${drupalConfig.BASE_URL}${INLINE_IMAGES_PATH}`);

  const STARTING_EMBED_INDEX = parsedHTML.lastIndexOf(STARTING_EMBED);
  const ENDING_EMBED_INDEX = parsedHTML.lastIndexOf(ENDING_EMBED);

  if (STARTING_EMBED_INDEX !== -1 && ENDING_EMBED_INDEX !== -1) {
    const EMBED_WRAPPER = parsedHTML.substring(STARTING_EMBED_INDEX, ENDING_EMBED_INDEX + ENDING_EMBED.length);
    const EMBED = EMBED_WRAPPER
    .replace(EMBED_WRAPPER_START, '')
    .replace(EMBED_WRAPPER_END, '');

    const EMBED_OBJECT = JSON.parse(EMBED);

    const video = EMBED_OBJECT.video_url;
    if (video) {
      const videoInfo = urlParser.parse(video);
      if (videoInfo) {
        const videoUrl = getVideoURL(videoInfo.provider, videoInfo.id);
        if (videoUrl) {
          const videoEmbedHTML = getVideoEmbedHTml(videoUrl);
          parsedHTML = parsedHTML.replace(EMBED_WRAPPER, videoEmbedHTML);
        }
      }
    }
    
  }
  return parsedHTML;
}

export default parseHTML; 
