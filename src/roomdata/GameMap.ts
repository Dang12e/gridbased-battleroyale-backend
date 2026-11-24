import { Cell } from "../objects/Cell.js";

export class GameMap {
    public width: number;
    public height: number;
    public grid: Cell[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.grid = [];

        for (let y = 0; y < height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < width; x++) {
                
                this.grid[y][x] = new Cell(null,new Array<string>());
            }
        }
    }

    // Lấy thông tin ô an toàn (có kiểm tra biên bản đồ)
    public getCell(x: number, y: number): Cell | null {
        console.log(`get cell x: ${x} y:${y}`);
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            console.log(x+" "+y+" "+ this.width+" "+this.height);
            return null;
        }
        return this.grid[y][x];
    }
}