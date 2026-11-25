
// ==========================================
// Online Order Calculator
// ระบบคำนวณราคาสินค้าออนไลน์
// ==========================================

// กำหนดประเภทการชำระเงิน
const PaymentType = {
    CASH: "CASH",
    PROMPTPAY: "PROMPTPAY",
    CREDIT_CARD: "CREDIT_CARD"
};

// ฟังก์ชันคำนวณราคาสินค้า
function calculateOrder(price, quantity, discountPercent = 0, paymentType = PaymentType.CASH) {

    // 1. ตรวจสอบข้อมูล (Data Validation)
    if (price == null || quantity == null) {
        throw new Error("กรุณากรอกราคาและจำนวนสินค้า");
    }

    if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
        throw new Error("ราคาสินค้าต้องเป็นตัวเลขและมากกว่า 0");
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("จำนวนสินค้าต้องเป็นจำนวนเต็มและมากกว่า 0");
    }

    if (typeof discountPercent !== "number" ||
        !Number.isFinite(discountPercent) ||
        discountPercent < 0 ||
        discountPercent > 100) {
        throw new Error("ส่วนลดต้องอยู่ระหว่าง 0-100%");
    }

    const validPayments = Object.values(PaymentType);

    if (!validPayments.includes(paymentType)) {
        throw new Error("ประเภทการชำระเงินไม่ถูกต้อง");
    }

    // 2. คำนวณราคา
    const subtotal = price * quantity;

    // 3. คำนวณส่วนลด
    const discount = subtotal * (discountPercent / 100);

    // 4. คำนวณ VAT 7%
    const afterDiscount = subtotal - discount;
    const vat = afterDiscount * 0.07;

    // 5. คำนวณราคาสุทธิ
    const grandTotal = afterDiscount + vat;

    // 6. ส่งผลลัพธ์กลับ
    return {
        subtotal: Number(subtotal.toFixed(2)),
        discount: Number(discount.toFixed(2)),
        vat: Number(vat.toFixed(2)),
        grandTotal: Number(grandTotal.toFixed(2)),
        paymentType: paymentType
    };
}

// ==========================================
// ทดลองใช้งานโปรแกรม
// ==========================================

console.log("===== ONLINE ORDER CALCULATOR =====");

try {
    const result = calculateOrder(
        1000,                  // ราคาสินค้า
        2,                     // จำนวนสินค้า
        10,                    // ส่วนลด 10%
        PaymentType.PROMPTPAY  // วิธีชำระเงิน
    );

    console.log("ราคาสินค้ารวม:", result.subtotal, "บาท");
    console.log("ส่วนลด:", result.discount, "บาท");
    console.log("ภาษี VAT 7%:", result.vat, "บาท");
    console.log("ยอดชำระสุทธิ:", result.grandTotal, "บาท");
    console.log("วิธีชำระเงิน:", result.paymentType);

} catch (error) {
    console.error("เกิดข้อผิดพลาด:", error.message);
}
