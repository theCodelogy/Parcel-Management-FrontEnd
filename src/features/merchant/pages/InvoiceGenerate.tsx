import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoiceComponent: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { tracker, invoiceDate, invoiceTime, merchantName, merchantPhone } =
    location.state || {};

  const invoiceItems = tracker
    ? [
        {
          trackingId: tracker.trackingId,
          name: tracker.customerName,
          phone: tracker.customerPhone,
          total: tracker.financial.codAmount,
          deliveryAmt: tracker.financial.charges,
          codAmt: tracker.financial.vat,
          subTotal: tracker.financial.currentPayable,
          payment: tracker.payment.amountPaid,
        },
      ]
    : [];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const downloadPDF = () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const doc = new jsPDF("p", "pt", "a4");

      let xPos = 420;
      let yPos = 40;

      doc.setFontSize(10);
      doc.setTextColor(76, 81, 86);

      doc.text(`Invoice #: ${tracker.trackingId}`, xPos, yPos);
      yPos += 12;
      doc.text(`Date: ${formatDate(invoiceDate)}`, xPos, yPos);
      yPos += 12;
      doc.text(`Time: ${invoiceTime}`, xPos, yPos);
      yPos += 12;
      doc.text(`Merchant Name: ${merchantName}`, xPos, yPos);
      yPos += 12;
      doc.text(`Merchant Phone: ${merchantPhone}`, xPos, yPos);

      doc.addImage(logo, "PNG", 40, 30, 50, 50);
      doc.setFontSize(12);
      doc.text("ClassicCourierBD", 100, 60);

      autoTable(doc, {
        startY: 120,
        head: [
          [
            "Tracking ID",
            "Name",
            "Phone",
            "Total",
            "Delivery Amt.",
            "COD Amt.",
            "Sub Total",
            "Payment",
          ],
        ],
        body: invoiceItems.map((item) => [
          item.trackingId,
          item.name,
          item.phone,
          item.total,
          item.deliveryAmt,
          item.codAmt,
          item.subTotal,
          item.payment,
        ]),
        foot: [
          ["Total:", "", "", "2500/-", "160/-", "0/-", "2340/-", "2340/-"],
        ],
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        headStyles: {
          fillColor: [200, 200, 200],
          textColor: [0, 0, 0],
        },
        footStyles: {
          fontStyle: "bold",
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
        },
      });

      const finalY = (doc as any).lastAutoTable.finalY + 20;
      doc.setFontSize(16);
      doc.text("ClassicCourierBD", 40, finalY);

      doc.setFontSize(10);
      doc.text("Delivery Charge: Tk 160 /-", 40, finalY + 15);
      doc.text("COD Charge: Tk 0 /-", 40, finalY + 25);
      doc.text("Total Merchant Payment Amount: Tk 2340 /-", 40, finalY + 35);

      doc.save(`Invoice-${tracker.trackingId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl mb-4 flex justify-end">
        <button
          onClick={downloadPDF}
          style={{ backgroundColor: "#2563eb", color: "white" }}
          className="font-bold py-2 px-4 rounded flex items-center"
          disabled={isDownloading}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {isDownloading ? "Generating PDF..." : "Download Invoice PDF"}
        </button>
      </div>

      <div
        ref={invoiceRef}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl"
      >
        <div className="flex flex-col mb-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <img
                  src={logo}
                  alt="Amvines Logistic"
                  className="h-16 rounded-full"
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600">
                <span className="font-semibold">Invoice #:</span>{" "}
                {tracker.trackingId}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Date:</span>{" "}
                {formatDate(invoiceDate)}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Time:</span> {invoiceTime}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Merchant Name:</span>{" "}
                {merchantName}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Merchant Phone:</span>{" "}
                {merchantPhone}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Tracking ID</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Phone</th>
                <th className="border px-4 py-2 text-left">Total</th>
                <th className="border px-4 py-2 text-left">Delivery Amt.</th>
                <th className="border px-4 py-2 text-left">COD Amt.</th>
                <th className="border px-4 py-2 text-left">Sub Total</th>
                <th className="border px-4 py-2 text-left">Payment</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border px-4 py-2">{item.trackingId}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.phone}</td>
                  <td className="border px-4 py-2">{item.total}</td>
                  <td className="border px-4 py-2">{item.deliveryAmt}</td>
                  <td className="border px-4 py-2">{item.codAmt}</td>
                  <td className="border px-4 py-2">{item.subTotal}</td>
                  <td className="border px-4 py-2">{item.payment}</td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-semibold">
                <td colSpan={3} className="border px-4 py-2 text-right">
                  Total:
                </td>
                <td className="border px-4 py-2">2500/-</td>
                <td className="border px-4 py-2">160/-</td>
                <td className="border px-4 py-2">0/-</td>
                <td className="border px-4 py-2">2340/-</td>
                <td className="border px-4 py-2">2340/-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ClassicCourierBD
          </h2>
          <p className="text-gray-800">Delivery Charge: Tk 160 /-</p>
          <p className="text-gray-800">COD Charge: Tk 0 /-</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
