const hasImages = album => album && album.images && album.images.length;

const mapToGridEntity = album =>
  album && album.images && album.images.length
    ? album.images.reduce(
        (acc, i) =>
          // if image is correct (has id at least):
          i.id
            ? [
                ...acc,
                {
                  id: i.id,
                  cover: i.previewSrc,
                  description: i.title,
                  title: undefined
                }
              ]
            : acc,
        []
      )
    : [];

export default { hasImages, mapToGridEntity };
