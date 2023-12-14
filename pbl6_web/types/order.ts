export interface orderedFood {
    orderDetailId: number
    orderStatus: number
    quantity: number
    foodId: number
}

export interface Order {
    id: number;
    orderTime: string
    orderStatus: number
    userId: number
    tableId: number
    total: number
    paymentType: number
    orderedfoods: orderedFood[]
}