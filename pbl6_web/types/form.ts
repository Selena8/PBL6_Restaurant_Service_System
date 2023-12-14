export interface FormValues {
    fullName: string;
    email: string;
    orderDate: string;
    phoneNumber: string;
    numberOfPeople: number | null;
    specialRequest?: string;
}