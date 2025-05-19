import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// items: array of objects
// fields: array of field names (columns)
// rowStyles: function(id) => { background, textDecoration } for row coloring
export function exportInventoryPdf(items, fields, rowStyles) {
  const doc = new jsPDF();
  const body = items.map((item) =>
    fields.map((field) => item[field])
  );
  const rowOptions = items.map((item) => {
    const id = item.itemId || item.id || item._id || item.ID;
    const style = rowStyles ? rowStyles(id) : {};
    let row = {};
    if (style.background) row.fillColor = style.background.replace("#", "");
    if (style.textDecoration === "line-through") row.fontStyle = "italic";
    return row;
  });

  autoTable(doc, {
    head: [fields],
    body,
    didParseCell: function (data) {
      if (rowOptions[data.row.index]) {
        if (rowOptions[data.row.index].fillColor) {
          data.cell.styles.fillColor = rowOptions[data.row.index].fillColor;
        }
        if (rowOptions[data.row.index].fontStyle) {
          data.cell.styles.fontStyle = rowOptions[data.row.index].fontStyle;
        }
      }
    },
  });

  doc.save("inventory.pdf");
}
