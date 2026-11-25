// orderCalculator.js
function calculateOrder(price, quantity, discountPercent = 0) {
  if (price <= 0 || quantity <= 0) {
    throw new Error("ราคาและจำนวนสินค้าต้องมากกว่า 0");
  }
  const subtotal = price * quantity;
  const discount = subtotal * (discountPercent / 100);
  const vat = (subtotal - discount) * 0.07;
  const grandTotal = (subtotal - discount) + vat;

  return {
    subtotal,
    discount,
    vat: Number(vat.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2))
  };
}
const result = calculateOrder(10, 2, 10);
console.log("ราคาสินค้ารวม:", result.subtotal, "บาท");
console.log("ส่วนลด:", result.discount, "บาท");
console.log("ภาษี VAT 7%:", result.vat, "บาท");
console.log("ยอดชำระสุทธิ:", result.grandTotal, "บาท");