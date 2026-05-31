
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion.tsx";

const faqs = [
  {
    question: "Apa itu COSMIC?",
    answer:
      "COSMIC adalah Creative Online Space for Market, Interaction, & Connection. Sebuah platform yang membantu kreator mengelola karya, membangun komunitas, dan mendapatkan penghasilan langsung dari penggemar.",
  },
  {
    question: "Siapa saja yang bisa bergabung di COSMIC?",
    answer:
      "Siapa saja! Baik kamu seorang kreator konten, seniman, penulis, streamer, atau sekadar penggemar yang ingin mendukung kreator favoritmu, kamu bisa bergabung di COSMIC.",
  },
  {
    question:
      "Apa saja yang bisa saya beli atau temukan di COSMIC?",
    answer:
      "Kamu bisa menemukan berbagai merchandise eksklusif, konten digital, tiket acara, membership, hingga layanan kreatif dari para kreator favoritmu.",
  },
  {
    question:
      "Bagaimana cara kreator menghasilkan uang di COSMIC?",
    answer:
      "Kreator bisa menghasilkan uang melalui penjualan produk fisik/digital, sistem membership berbayar, atau menerima dukungan langsung (tipping) dari penggemar melalui QRIS dan metode pembayaran lainnya.",
  },
  {
    question:
      "Apa keunggulan COSMIC dibanding platform lainnya?",
    answer:
      "COSMIC mengintegrasikan market, interaksi komunitas, dan monetisasi dalam satu ekosistem yang mudah digunakan. Dengan fitur pembayaran instan seperti QRIS dan dashboard terpusat, kreator memiliki kontrol penuh atas bisnis kreatif mereka.",
  },
];

export default function FAQ() {
  return (
    <div className="relative w-full py-20 overflow-hidden bg-black flex flex-col justify-center">
      {/* Background Image removed */}
      
      <div className="relative z-10 max-w-4xl w-full mx-auto px-6">
        <h2 className="text-[32px] md:text-[40px] font-bold text-white text-center mb-12">
          Frequently Asking Questions (FAQ)
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none bg-[#18181b] rounded-xl px-4 py-2"
            >
              <AccordionTrigger className="text-white text-[18px] font-medium hover:no-underline text-left">
                {index + 1}. {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-[16px]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
