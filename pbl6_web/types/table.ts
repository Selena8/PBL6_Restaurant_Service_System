export interface Table {
    id: number;
    name: string;
    numberOfSeats: number;
    currentStatus: number;
    tableName: string;
    bookings: any[];
  }

export interface TableView {
    name: string;
    numberOfSeats: number;
    isUse: number
}
