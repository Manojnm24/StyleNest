const PDFDocument = require("pdfkit");

const generateInvoice = (order, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // MUST be before piping
  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=invoice_${order._id}.pdf`,
  });

  doc.pipe(res);

  doc.fontSize(20).text("StyleNest Invoice", { align: "center" });
  doc.moveDown();

  doc.fontSize(12);
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Date: ${new Date(order.createdAt).toDateString()}`);
  doc.text(`Payment Status: ${order.paymentStatus}`);
  doc.text(`Order Status: ${order.orderStatus}`);
  doc.moveDown();

  doc.fontSize(14).text("Items");
  doc.moveDown(0.5);

  order.items.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.name} | ₹${item.price} × ${item.quantity}`
    );
  });

  doc.moveDown();
  doc.fontSize(14).text(`Total Amount: ₹${order.totalAmount}`, {
    align: "right",
  });

  doc.moveDown(2);
  doc.fontSize(10).text("Thank you for shopping with StyleNest 💖", {
    align: "center",
  });

  doc.end();
};

module.exports = generateInvoice;
