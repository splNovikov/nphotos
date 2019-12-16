const hasImages = album => album && album.images && album.images.length;

const mapToGridEntity = album =>
  album && album.images && album.images.length
    ? album.images.reduce(
        (acc, i) =>
          i.id
            ? [
                ...acc,
                {
                  ...i,
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
