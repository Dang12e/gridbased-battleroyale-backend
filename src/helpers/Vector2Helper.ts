export class Vector2Helper {
  /**
   * Trả về true nếu khoảng cách giữa (x1, y1) và (x2, y2) <= range.
   */
  public static isInRange(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    range: number
  ): boolean {
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Lọc nhanh theo trục X và Y trước khi nhân
    if (dx > range || dx < -range || dy > range || dy < -range) {
      return false;
    }

    return dx * dx + dy * dy <= range * range;
  }
}
