export const useIsFullScreen = (element) => {
  const { isFullscreen, toggle } = useFullscreen(element);
  return ref({ isFullscreen, toggle });
};