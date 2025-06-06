import React, { useState } from "react";
import type { Invoice, LineItem } from "../types/invoice";
import { InvoicePreview } from "./InvoicePreview";

const defaultLineItem: LineItem = {
  description: "",
  quantity: 1,
  unitPrice: 0,
};

export const InvoiceForm: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    invoiceNumber: "",
    issueDate: "",
    dueDate: "",
    client: {
      name: "",
      email: "",
      address: "",
    },
    items: [defaultLineItem],
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoice({
      ...invoice,
      client: { ...invoice.client, [name]: value },
    });
  };

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newItems = [...invoice.items];
    newItems[index] = {
      ...newItems[index],
      [name]: name === "description" ? value : Number(value),
    };
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({ ...invoice, items: [...invoice.items, defaultLineItem] });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {/* Left: Form */}
      <form className="flex-1 space-y-4 p-4 border rounded shadow ">
        <h2 className="text-xl font-semibold">Create Invoice</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="invoiceNumber"
            placeholder="Invoice #"
            value={invoice.invoiceNumber}
            onChange={handleInputChange}
            className="border p-2"
          />
          <input
            name="issueDate"
            type="date"
            value={invoice.issueDate}
            onChange={handleInputChange}
            className="border p-2"
          />
          <input
            name="dueDate"
            type="date"
            value={invoice.dueDate}
            onChange={handleInputChange}
            className="border p-2"
          />
        </div>

        <h3 className="font-medium">Client Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Client Name"
            value={invoice.client.name}
            onChange={handleClientChange}
            className="border p-2"
          />
          <input
            name="email"
            placeholder="Client Email"
            value={invoice.client.email}
            onChange={handleClientChange}
            className="border p-2"
          />
          <input
            name="address"
            placeholder="Client Address"
            value={invoice.client.address}
            onChange={handleClientChange}
            className="border p-2 col-span-2"
          />
        </div>

        <h3 className="font-medium">Line Items</h3>
        {invoice.items.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <input
              name="description"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
              className="border p-2"
            />
            <input
              name="quantity"
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              className="border p-2"
            />
            <input
              name="unitPrice"
              type="number"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, e)}
              className="border p-2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-blue-500 underline"
        >
          + Add Item
        </button>

        <textarea
          name="notes"
          placeholder="Notes"
          value={invoice.notes}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </form>

      {/* Right: Preview */}
      <div className="flex-1">
        <InvoicePreview invoice={invoice} />
      </div>
    </div>
  );
};
