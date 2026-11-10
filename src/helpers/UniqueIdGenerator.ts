export class UniqueIdGenerator {
  /**
   * Tạo một ID duy nhất dựa trên tiền tố (prefix) truyền vào.
   * Kết hợp giữa thời gian hiện tại (timestamp) và chuỗi ngẫu nhiên để đảm bảo không trùng lặp.
   * 
   * @param prefix Phần đầu của ID (ví dụ: "item", "player", "bullet")
   * @returns Chuỗi ID hoàn chỉnh (ví dụ: "item_l8z9abc7f")
   */
  public static generate(prefix: string = "id"): string {
    // Lấy timestamp dạng base36 để ngắn gọn và có thứ tự thời gian
    const timestampPart = Date.now().toString(36);
    
    // Tạo một chuỗi ngẫu nhiên 6 ký tự
    const randomPart = Math.random().toString(36).substring(2, 8);
    
    return `${prefix}_${timestampPart}${randomPart}`;
  }
}