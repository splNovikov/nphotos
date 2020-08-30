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

const mapAlbum = album => {
  if (!album || !album.images || !album.images.length) {
    return [];
  }

  return {
    ...album,
    images: album.images.map(image => ({
      ...image,
      thumbnail: image.previewSrc
    }))
  };
};

export default { mapToGridEntity, mapAlbum };
