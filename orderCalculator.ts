
// ==========================================
// Online Order Calculator (TypeScript)
// ระบบคำนวณราคาสินค้าออนไลน์
// ==========================================

// ขั้นตอนที่ 1: กำหนดประเภทการชำระเงิน (Union Types)
export type PaymentType =
  | "CASH"
  | "PROMPTPAY"
  | "CREDIT_CARD";

// ขั้นตอนที่ 2: สร้าง Interface สำหรับรับข้อมูลสินค้า
export interface OrderInput {
  orderId: string;
  price: number;
  quantity: number;
  discountPercent?: number;
  paymentType: PaymentType;
}

// ขั้นตอนที่ 3: สร้าง Interface สำหรับผลลัพธ์
export interface OrderResult {
  orderId: string;
  subtotal: number;
  discountAmount: number;
  vatAmount: number;
  grandTotal: number;
}

// ขั้นตอนที่ 4: สร้างฟังก์ชันคำนวณราคา
export function calculateOrder(
  order: OrderInput
): OrderResult {

  // 1. ตรวจสอบรหัสคำสั่งซื้อ
  if (!order.orderId?.trim()) {
    throw new Error("กรุณากรอกรหัสคำสั่งซื้อ");
  }

  // 2. ตรวจสอบราคาสินค้า
  if (!Number.isFinite(order.price) || order.price <= 0) {
    throw new Error("ราคาสินค้าต้องมากกว่า 0 บาท");
  }

  // 3. ตรวจสอบจำนวนสินค้า
  if (!Number.isInteger(order.quantity) || order.quantity <= 0) {
    throw new Error("จำนวนสินค้าต้องอย่างน้อย 1 ชิ้น");
  }

  // 4. ตรวจสอบส่วนลด
  const discountPercent = order.discountPercent ?? 0;

  if (
    !Number.isFinite(discountPercent) ||
    discountPercent < 0 ||
    discountPercent > 100
  ) {
    throw new Error("ส่วนลดต้องอยู่ระหว่าง 0-100%");
  }

  // 5. ตรวจสอบประเภทการชำระเงิน
  const validPayments: PaymentType[] = [
    "CASH",
    "PROMPTPAY",
    "CREDIT_CARD"
  ];

  if (!validPayments.includes(order.paymentType)) {
    throw new Error("ประเภทการชำระเงินไม่ถูกต้อง");
  }

  // 6. คำนวณราคาสินค้ารวม
  const discountRate = discountPercent / 100;
  const subtotal = order.price * order.quantity;

  // 7. คำนวณส่วนลด
  const discountAmount = subtotal * discountRate;

  // 8. คำนวณราคาหลังหักส่วนลด
  const taxableAmount = subtotal - discountAmount;

  // 9. คำนวณ VAT 7%
  const vatAmount = Number(
    (taxableAmount * 0.07).toFixed(2)
  );

  // 10. คำนวณยอดชำระสุทธิ
  const grandTotal = Number(
    (taxableAmount + vatAmount).toFixed(2)
  );

  // 11. ส่งผลลัพธ์กลับ
  return {
    orderId: order.orderId,
    subtotal,
    discountAmount,
    vatAmount,
    grandTotal
  };
}

// ==========================================
// ทดลองใช้งานโปรแกรม
// ==========================================

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
