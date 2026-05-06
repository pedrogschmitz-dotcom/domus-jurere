export function getAdjacentIndexes(activeIndex: number, total: number) {
  if (total <= 0) {
    return { prevIndex: 0, nextIndex: 0 };
  }

  return {
    prevIndex: (activeIndex - 1 + total) % total,
    nextIndex: (activeIndex + 1) % total,
  };
}

export function getSwipeDirection(
  touchStartX: number | null,
  touchEndX: number | null,
  threshold = 40,
): "next" | "prev" | "none" {
  if (touchStartX === null || touchEndX === null) {
    return "none";
  }

  const delta = touchStartX - touchEndX;
  if (delta > threshold) return "next";
  if (delta < -threshold) return "prev";
  return "none";
}