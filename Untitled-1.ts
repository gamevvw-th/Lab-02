// orderCalculator.ts
export type PaymentType = "CASH" | "PROMPTPAY" | "CREDIT_CARD";

export interface OrderInput {
  orderId: string;
  price: number;
  quantity: number;
  discountPercent?: number;
  paymentType: PaymentType;
}

export interface OrderResult {
  orderId: string;
  subtotal: number;
  discountAmount: number;
  vatAmount: number;
  grandTotal: number;
}

export function calculateOrder(order: OrderInput): OrderResult {
  if (order.price <= 0) throw new Error("ราคาสินค้าต้องมากกว่า 0 บาท");
  if (order.quantity <= 0) throw new Error("จำนวนสินค้าต้องอย่างน้อย 1 ชิ้น");

  const discountRate = (order.discountPercent ?? 0) / 100;
  const subtotal = order.price * order.quantity;
  const discountAmount = subtotal * discountRate;
  const taxableAmount = subtotal - discountAmount;
  const vatAmount = Number((taxableAmount * 0.07).toFixed(2));
  const grandTotal = Number((taxableAmount + vatAmount).toFixed(2));

  return {
    orderId: order.orderId,
    subtotal,
    discountAmount,
    vatAmount,
    grandTotal
  };


}
const myOrder: OrderInput = {
  orderId: "ORD001",
  price: 1000,
  quantity: 2,
  discountPercent: 10,
  paymentType: "PROMPTPAY"
};

try {
  const result = calculateOrder(myOrder);

  console.log("===== ONLINE ORDER CALCULATOR =====");
  console.log("รหัสคำสั่งซื้อ:", result.orderId);
  console.log("ราคาสินค้ารวม:", result.subtotal, "บาท");
  console.log("ส่วนลด:", result.discountAmount, "บาท");
  console.log("ภาษี VAT 7%:", result.vatAmount, "บาท");
  console.log("ยอดชำระสุทธิ:", result.grandTotal, "บาท");
  console.log("วิธีชำระเงิน:", myOrder.paymentType);
} catch (error) {
  if (error instanceof Error) {
    console.error("เกิดข้อผิดพลาด:", error.message);
  }
}
