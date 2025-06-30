// Returns YouTube Player API options from a YouTube URL.
//  ie. { playlistId }
//      { videoId, start, end }
//      { query }
export default function parseYouTubeUrl(url) {
  let domain = url;
  let searchParams;
  try {
    const urlObj = new URL(url);
    domain = urlObj.origin + urlObj.pathname;
    searchParams = urlObj.searchParams;
  } catch (e) {
    // fallback for invalid URLs (should rarely happen)
    const [d, querystring] = url.split("?");
    domain = d;
    searchParams = new URLSearchParams(querystring || "");
  }

  const options = {};

  if (searchParams.has("list")) {
    // URLs with a playlist can also have a video id so we need to check
    // for a playlist first.
    //  ie. https://www.youtube.com/watch?v=:videoId&list=:playlistId
    options.playlistId = searchParams.get("list");
  } else if (searchParams.has("v")) {
    // Check if the video id was provided in the query string.
    //   ie. https://www.youtube.com/watch?v=:videoId
    options.videoId = searchParams.get("v");
  } else {
    // Check for short urls, direct urls and embed urls.
    //    ie. https://youtu.be/:videoId
    //        https://www.youtube.com/v/:videoId
    //        https://www.youtube.com/embed/:videoId
    const shortVideoRegex = /^https?:\/\/(?:www\.)?youtu\.be\/([\w-]{11})/;
    const directVideoRegex =
      /^https?:\/\/(?:www\.)?youtube\.com\/v\/([\w-]{11})/;
    const embedVideoRegex =
      /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([\w-]{11})/;

    let match = domain.match(shortVideoRegex);
    if (match) options.videoId = match[1];

    match = domain.match(directVideoRegex);
    if (match) options.videoId = match[1];

    match = domain.match(embedVideoRegex);
    if (match) options.videoId = match[1];
  }

  // Check for start and end times for single videos.
  if (options.videoId) {
    // Start times can be set with &start= for embed urls or
    // &t= for short urls.
    if (searchParams.has("start")) {
      options.start = parseInt(searchParams.get("start"), 10);
    } else if (searchParams.has("t")) {
      options.start = parseInt(searchParams.get("t"), 10);
    }

    if (searchParams.has("end")) {
      options.end = parseInt(searchParams.get("end"), 10);
    }
  }

  return options;
}
