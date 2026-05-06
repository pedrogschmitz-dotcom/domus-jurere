import { describe, expect, it } from "vitest";
import { getAdjacentIndexes, getSwipeDirection } from "./gallery";

describe("gallery utils", () => {
  it("calcula indices adjacentes com wrap-around", () => {
    expect(getAdjacentIndexes(0, 5)).toEqual({ prevIndex: 4, nextIndex: 1 });
    expect(getAdjacentIndexes(4, 5)).toEqual({ prevIndex: 3, nextIndex: 0 });
  });

  it("retorna none quando dados de swipe são insuficientes", () => {
    expect(getSwipeDirection(null, 12)).toBe("none");
    expect(getSwipeDirection(12, null)).toBe("none");
  });

  it("detecta direção do swipe com threshold", () => {
    expect(getSwipeDirection(100, 40)).toBe("next");
    expect(getSwipeDirection(40, 100)).toBe("prev");
    expect(getSwipeDirection(100, 70)).toBe("none");
  });
});