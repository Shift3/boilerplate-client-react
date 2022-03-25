export const wasMouseEventOutsideContainer = (container: HTMLElement, event: MouseEvent): boolean => {
  const boundingRect = container.getBoundingClientRect();

  return (
    event.clientX < boundingRect.left ||
    event.clientX > boundingRect.right ||
    event.clientY < boundingRect.top ||
    event.clientY > boundingRect.bottom
  );
};
