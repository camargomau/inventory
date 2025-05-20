import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Export inventory data as a PDF file
export function exportInventoryPdf(items, fields, rowStyles, deletedView = false) {
  // Create PDF in A4 landscape
  const doc = new jsPDF({ orientation: "landscape", format: "a4" });
  doc.setFontSize(18);
  // Add header above table
  const headerText = deletedView ? "Exported Inventory (Deleted Items)" : "Exported Inventory";
  doc.text(headerText, 14, 18);

  // Prepare table body (items and fields)
  const body = items.map((item) =>
    fields.map((field) => item[field])
  );

  // Prepare row options for styling
  const rowOptions = items.map((item) => {
    const id = item.itemId;
    // Get row style for current item
    const style = rowStyles ? rowStyles(id) : {};
    let row = {};

    // If the row has a background colour, set fillColor for the row
    // The replace("#", "") removes the '#' from a hex color string (e.g., "#FF0000" becomes "FF0000")
    if (style.background) row.fillColor = style.background.replace("#", "");
    // If the text in the row is strikethough-style, set the fontStyle to italic for this row.
    if (style.textDecoration === "line-through") row.fontStyle = "italic";

    return row;
  });

  // Generate table
  autoTable(doc, {
    // Use fields as header
    head: [fields],
    body,
    // Offset for header
    startY: 24,
    // Default blue header for default view, gray header for deleted view
    headStyles: deletedView ? { fillColor: [50, 50, 50], textColor: [225, 225, 225] } : {},

    didParseCell: function (data) {
      // if there are custom style options for the current row… (only for body rows)
      if (data.section === 'body' && rowOptions[data.row.index]) {
        // if there is a background colour
        if (rowOptions[data.row.index].fillColor) {
          data.cell.styles.fillColor = rowOptions[data.row.index].fillColor;
        }
        // if font is italic (from strikethrough)
        if (rowOptions[data.row.index].fontStyle) {
          data.cell.styles.fontStyle = rowOptions[data.row.index].fontStyle;
        }
      }
    },
  });

  // Generate filename with current date and time
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const filename = `inventory-${dateStr}.pdf`;

  doc.save(filename);
}
