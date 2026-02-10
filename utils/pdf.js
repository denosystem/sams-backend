const PDFDocument = require("pdfkit");

function buildAttendancePdf({ title, meta, rows }) {
  const doc = new PDFDocument({ margin: 40 });
  const chunks = [];
  doc.on("data", (c) => chunks.push(c));

  doc.fontSize(18).text(title);
  doc.moveDown(0.5);

  doc.fontSize(10);
  Object.entries(meta || {}).forEach(([k, v]) => {
    doc.text(`${k}: ${v}`);
  });

  doc.moveDown(1);
  doc.fontSize(12).text("Attendance List");
  doc.moveDown(0.5);

  doc.fontSize(10);
  rows.forEach((r, idx) => {
    doc.text(
      `${idx + 1}. ${r.fullName} | ${r.admissionNo || "-"} | ${r.className || "-"} | ${r.status} | ${r.checkedInAt || "-"}`
    );
  });

  doc.end();

  return new Promise((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

module.exports = { buildAttendancePdf };
