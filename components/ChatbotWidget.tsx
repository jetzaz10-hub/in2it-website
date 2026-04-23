"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! This is IN2IT Lead Consultant. How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getBotResponse = (input: string): string => {
    const text = input.toLowerCase();
    const isThai = /[ก-ฮ]/.test(text);

    // 1. Greetings
    if (text.includes("hello") || text.includes("hi") || text.includes("สวัสดี") || text.includes("หวัดดี") || text.includes("ทักทาย")) {
      return isThai 
        ? "สวัสดีครับ! ยินดีต้อนรับสู่ IN2IT เราคือพาร์ทเนอร์ด้านเทคโนโลยีอีเวนต์แบบครบวงจร มีอะไรให้เราช่วยวันนี้บ้างครับ?"
        : "Hello! Welcome to IN2IT. We are your One-Stop Partner for Event Technology. How can I assist you today?";
    }

    // 2. Overview / What do we do
    if (text.includes("do you do") || text.includes("overview") || text.includes("เกี่ยวกับ") || text.includes("ทำอะไร") || text.includes("คืออะไร") || text.includes("บริการอะไร")) {
      return isThai
        ? "IN2IT เป็นบริการแบบ One-Stop สำหรับเทคโนโลยีอีเวนต์! เราเชี่ยวชาญด้านระบบลงทะเบียน, การออกแบบเว็บไซต์, โซลูชัน RFID/NFC และการถ่ายทอดสด ด้วยประสบการณ์กว่า 15 ปีและผลงานกว่า 500 อีเวนต์ เรามั่นใจว่าจะทำให้งานของคุณออกมาสมบูรณ์แบบครับ"
        : "IN2IT is a One-Stop Service for Event Tech! We specialize in Registration Systems, Website Design, RFID/NFC solutions, and Live Streaming. With 15+ years of experience and 500+ successful events, we ensure your event runs flawlessly.";
    }

    // 3. Contact & Location
    if (text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("call") || text.includes("location") || text.includes("where") || text.includes("ติดต่อ") || text.includes("เบอร์") || text.includes("อีเมล") || text.includes("ที่อยู่") || text.includes("แผนที่")) {
      return isThai
        ? "ติดต่อเราได้ที่ service@in2it.co.th หรือโทร +66 87 458 8833 สำนักงานใหญ่ของเราอยู่ที่เชียงใหม่ครับ (ดูแผนที่: https://www.google.com/maps/search/?api=1&query=IN2IT+Service+Chiang+Mai)"
        : "You can reach us at service@in2it.co.th or call our hotline at +66 87 458 8833. Our main office is in Chiang Mai (View on Google Maps: https://www.google.com/maps/search/?api=1&query=IN2IT+Service+Chiang+Mai).";
    }

    // 4. Services - Registration & Ticketing
    if (text.includes("registration") || text.includes("ticket") || text.includes("ลงทะเบียน") || text.includes("จองตั๋ว") || text.includes("ซื้อตั๋ว") || text.includes("เช็คอิน")) {
      return isThai
        ? "ระบบลงทะเบียนของเราครอบคลุมทั้งออนไลน์และหน้างาน รองรับคนได้มากกว่า 2,000 คน พร้อมระบบ QR Code และรายงานผลแบบ Real-time ครับ"
        : "Our Registration System handles both Online and Onsite needs with high-capacity check-ins (2,000+ attendees). We offer custom forms, QR code entry, and real-time reporting.";
    }

    // 5. Services - RFID / NFC / Festival
    if (text.includes("nfc") || text.includes("rfid") || text.includes("cashless") || text.includes("festival") || text.includes("บัตร") || text.includes("สายรัด") || text.includes("จ่ายเงิน")) {
      return isThai
        ? "เราเป็นผู้เชี่ยวชาญด้าน Festival Tech! มีบริการสายรัดข้อมือ RFID, ระบบจ่ายเงิน Cashless และ Digital Badges เพื่อช่วยจัดการฝูงชนและเพิ่มการมีส่วนร่วมในงานครับ"
        : "We are specialists in Festival Technology! Our services include RFID wristbands, Cashless payment systems, and Digital Badges to enhance attendee engagement and crowd management.";
    }

    // 6. Services - Streaming / Virtual
    if (text.includes("stream") || text.includes("live") || text.includes("zoom") || text.includes("virtual") || text.includes("ถ่ายทอดสด") || text.includes("สตรีม")) {
      return isThai
        ? "เรามีบริการ Live Streaming มืออาชีพแบบหลายกล้อง ส่งสัญญาณไปได้ทั้ง YouTube, Facebook หรือแพลตฟอร์มของคุณเอง พร้อมการบันทึกเทปและทีมซัพพอร์ตหน้างานครับ"
        : "We provide professional multi-camera Live Streaming services to YouTube, Facebook, or custom platforms, including full recording and tech support.";
    }

    // 7. Portfolio & Trust
    if (text.includes("portfolio") || text.includes("work") || text.includes("example") || text.includes("client") || text.includes("brand") || text.includes("ผลงาน") || text.includes("ลูกค้า") || text.includes("ประสบการณ์")) {
      return isThai
        ? "เราดูแลอีเวนต์มาแล้วกว่า 500 งานให้แบรนด์ระดับโลกอย่าง Meta, Coca-Cola และพาร์ทเนอร์อย่าง Techsauce มั่นใจได้ในคุณภาพครับ ดูผลงานเพิ่มเติมที่: https://www.facebook.com/in2itservice/"
        : "We've managed 500+ successful events for global brands like Meta, Coca-Cola, and major partners like Techsauce. Quality and reliability are our priorities! Check our experience here: https://www.facebook.com/in2itservice/";
    }

    // 8. Pricing
    if (text.includes("price") || text.includes("cost") || text.includes("how much") || text.includes("budget") || text.includes("ราคา") || text.includes("แพงไหม") || text.includes("งบ")) {
      return isThai
        ? "ราคาของเราจะปรับตามความต้องการเฉพาะของแต่ละงานครับ รบกวนติดต่อผู้อำนวยการโครงการ คุณปอย (Poii) เพื่อขอใบเสนอราคาได้ที่ service@in2it.co.th ครับ"
        : "Every event is unique! Our pricing is tailored to your specific requirements. Please contact our Project Director, Poii, for a custom quote at service@in2it.co.th.";
    }

    // 9. Process / How we work
    if (text.includes("process") || text.includes("step") || text.includes("how") || text.includes("ขั้นตอน") || text.includes("ยังไง") || text.includes("กระบวนการ")) {
      return isThai
        ? "เรามีขั้นตอนการทำงาน 4 ระยะ: การวางแผน (แบรนด์/ระบบ) -> การโปรโมท (มาร์เก็ตติ้ง/EDM) -> วันงาน (เทคโนโลยีหน้างาน) -> หลังจบงาน (สรุปผลและรายงาน) เราดูแลให้แบบไร้รอยต่อตั้งแต่ต้นจนจบครับ"
        : "Our event lifecycle covers 4 phases: Planning (Branding/Setup) -> Promotion (Marketing/EDM) -> Day of Event (Onsite Tech) -> Post Event (Analytics & Recap). We ensure a seamless flow from start to finish!";
    }

    return isThai
      ? "เป็นคำถามที่ดีมากครับ! สำหรับรายละเอียดเพิ่มเติมหรือคำถามเฉพาะเจาะจง ติดต่อเราได้ที่ service@in2it.co.th หรือติดตามเราได้ที่ Facebook Page ครับ"
      : "That's a great question! For more details or specific inquiries, please reach out to us at service@in2it.co.th or follow our Facebook Page.";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(currentInput),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  const renderMessageText = (text: string) => {
    // Regex for URLs and Emails
    const urlRegex = /(https?:\/\/[^\s]+|[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,})/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        let displayNode = part;
        let href = part;

        // Check if it's an email
        if (part.includes("@") && !part.startsWith("http")) {
          href = `mailto:${part}`;
        }

        // Specific case for Facebook
        if (part.includes("facebook.com")) {
          displayNode = "Facebook Page";
        }

        // Specific case for Google Maps
        if (part.includes("google.com/maps") || part.includes("maps.app.goo.gl")) {
          displayNode = "View on Google Maps";
        }

        return (
          <a
            key={index}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="underline font-semibold hover:opacity-80 transition-opacity break-all inline-flex items-center gap-1"
            style={{ color: "inherit" }}
          >
            {displayNode}
            {!href.startsWith("mailto") && (
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            )}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div
          className="w-[340px] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          style={{ background: "#e8e8e8", height: "450px" }}
        >
          {/* Header — Electric Indigo gradient */}
          <div
            className="px-5 py-4 flex items-center justify-between shrink-0"
            style={{
              background: "linear-gradient(135deg, #3B2DCC 0%, #4A32FF 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white/10 px-2 py-1.5 rounded-xl border border-white/10">
                <Image src="/logo.svg" alt="IN2IT Logo" width={60} height={30} className="invert brightness-0" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-[10px] tracking-[0.2em] leading-none opacity-60">IN2IT</span>
                <span className="text-white font-bold text-xs tracking-widest leading-none mt-1">LEAD CONSULTANT</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors" aria-label="Close">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat body */}
          <div
            ref={scrollRef}
            className="relative px-4 py-5 flex-1 overflow-y-auto scrollbar-hide space-y-4"
            style={{ background: "#e8e8e8" }}
          >
            {/* Watermark logo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-[0.03]">
              <Image src="/logo.svg" alt="IN2IT Logo" width={180} height={90} className="grayscale brightness-0" />
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                {msg.sender === "bot" && (
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-lg border-2 border-white">
                    <Image 
                      src="/chatbot/P'poi 1.jpg" 
                      alt="P'poi" 
                      width={40} 
                      height={40} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[80%] ${msg.sender === "user"
                      ? "bg-[#4A32FF] text-white rounded-tr-sm"
                      : "bg-white text-gray-800 rounded-tl-sm border border-gray-200"
                    }`}
                >
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-lg border-2 border-white">
                  <Image 
                    src="/chatbot/P'poi 1.jpg" 
                    alt="P'poi" 
                    width={40} 
                    height={40} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white flex items-center gap-1 shadow-sm border border-gray-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200 shrink-0" style={{ background: "#ffffff" }}>
            <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-[#4A32FF]/20 transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 text-sm text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${inputValue.trim() ? "bg-[#4A32FF] text-white scale-100" : "bg-gray-300 text-gray-100 scale-90"
                  }`}
                aria-label="Send"
              >
                <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L21 12m0 0l-7.5-7.5M21 12l-7.5 7.5" />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-[10px] text-center text-gray-400 tracking-wider font-medium uppercase">
              Powered by IN2IT AI
            </div>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden border-2 border-[#4A32FF]"
        style={{ background: open ? "#4A32FF" : "white" }}
        aria-label="Open chatbot"
      >
        {open ? (
          <svg className="w-7 h-7 text-white relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="w-full h-full relative">
            <Image 
              src="/chatbot/P'poi 1.jpg" 
              alt="P'poi" 
              fill
              className="object-cover"
            />
          </div>
        )}
      </button>
    </div>
  );
}
