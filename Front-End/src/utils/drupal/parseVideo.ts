import urlParser from 'js-video-url-parser';

const getVideoURL = (provider: string, id: string) => {
  if (provider === 'youtube') {
    return `https://www.youtube.com/embed/${id}`;
  } else if (provider === 'vimeo') {
    return `https://player.vimeo.com/video/${id}`;
  } else if (provider === 'dailymotion') {
    return `https://www.dailymotion.com/embed/video/${id}`;
  }
};

/**
 * Util function to parse HTML returned by Drupal.
 */

const parseVideo = (link: String): String => {
  if (link) {
    const videoLink = urlParser.parse(link);
    if (videoLink) {
      return getVideoURL(videoLink.provider, videoLink.id);
    }
  }
};

export default parseVideo;
