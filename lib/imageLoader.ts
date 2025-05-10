export const wixImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // Extract the Wix media ID (e.g., "4e6b24_3636a669e0994eec9556a5d0e877cf09~mv2")
  const match = src.match(/wix:image:\/\/v1\/([^\/]+)\//);
  if (!match) return src; // Fallback if URL doesn't match

  const mediaId = match[1];
  return `https://static.wixstatic.com/media/${mediaId}/v1/fill/w_${width},q_${
    quality || 75
  }/${mediaId}.png`;
};