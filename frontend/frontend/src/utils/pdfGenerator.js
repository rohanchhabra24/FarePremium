import jsPDF from "jspdf";

export const generateQuotePDF = ({
  plan = {},
  userData = {},
  premiumBreakdown = {},
  terms = [],
}) => {
  const doc = new jsPDF();

  const safeText = (text) => (text ? String(text) : "N/A");

  doc.setFontSize(18);
  doc.text("Insurance Premium Quotation", 20, 20);

  doc.setFontSize(12);
  const today = new Date().toISOString().split("T")[0];
  doc.text(`Date: ${today}`, 20, 30);
  doc.text(`Quote ID: Q${Date.now()}`, 20, 37);

  // SECTION: Customer Information
  let y = 50;
  doc.setFontSize(14);
  doc.text("Customer Information", 20, y);
  y += 8;
  doc.setFontSize(12);
  for (const key in userData) {
    const val = Array.isArray(userData[key])
      ? userData[key].join(", ")
      : safeText(userData[key]);
    doc.text(`${key}: ${val}`, 25, y);
    y += 6;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  // SECTION: Plan Details
  y += 10;
  doc.setFontSize(14);
  doc.text("Selected Plan Details", 20, y);
  y += 8;
  doc.setFontSize(12);
  doc.text(`Plan Name: ${safeText(plan.name)}`, 25, y);
  y += 6;
  doc.text(`Insurer: ${safeText(plan.insurer)}`, 25, y);
  y += 6;
  doc.text(`Annual Premium: ₹${safeText(plan.premium)}`, 25, y);
  y += 10;

  doc.text("Features:", 25, y);
  y += 6;
  (plan.features || []).forEach((feature) => {
    doc.text(`• ${safeText(feature)}`, 30, y);
    y += 6;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  // SECTION: Premium Breakdown
  y += 10;
  doc.setFontSize(14);
  doc.text("Premium Breakdown", 20, y);
  y += 8;
  doc.setFontSize(12);
  for (const key in premiumBreakdown) {
    doc.text(`${key}: ₹${safeText(premiumBreakdown[key])}`, 25, y);
    y += 6;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  // SECTION: Terms & Conditions
  y += 10;
  doc.setFontSize(14);
  doc.text("Terms & Conditions Summary", 20, y);
  y += 8;
  doc.setFontSize(10);
  terms.forEach((t) => {
    doc.text(`- ${safeText(t)}`, 25, y);
    y += 5;
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  // Save PDF
  doc.save("insurance_quote.pdf");
};
