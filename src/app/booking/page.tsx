"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  Sunrise,
  Sun,
  Sunset,
  CalendarDays,
  Dog,
} from "lucide-react";
import { services, servicePackages } from "@/data/services";

type Step = 1 | 2 | 3;

const steps = [
  { num: 1, label: "Service" },
  { num: 2, label: "Time" },
  { num: 3, label: "Checkout" },
];

const timeCategories = [
  {
    label: "Morning",
    icon: Sunrise,
    slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  },
  {
    label: "Afternoon",
    icon: Sun,
    slots: ["12:00", "13:00", "13:30", "14:00", "14:30"],
  },
  {
    label: "Evening",
    icon: Sunset,
    slots: ["15:00", "15:30", "16:00", "16:30"],
  },
];

export default function BookingPage() {
  const [step, setStep] = useState<Step>(1);
  const [booking, setBooking] = useState({
    serviceId: "",
    serviceName: "",
    servicePrice: 0,
    date: "",
    time: "",
    petName: "",
    petType: "dog",
    breed: "",
    notes: "",
    pickupRequired: false,
    customerName: "",
    email: "",
    phone: "",
    paymentType: "deposit" as "deposit" | "full",
    paymentMethod: "card" as "card" | "paypal",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [confirmed, setConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refNum, setRefNum] = useState("");
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  const selectService = (id: string, name: string, price: number) => {
    setBooking({
      ...booking,
      serviceId: id,
      serviceName: name,
      servicePrice: price,
    });
    // Auto-advance after short delay for elegance
    setTimeout(() => setStep(2), 400);
  };

  const depositAmount = Math.round(booking.servicePrice * 0.2);
  const fullAmount = Math.round(booking.servicePrice * 0.95);

  const canProceed = () => {
    switch (step) {
      case 1:
        return booking.serviceId !== "";
      case 2:
        return booking.date !== "" && booking.time !== "";
      case 3:
        const validPet = booking.petName !== "" && booking.petType !== "";
        const validCust =
          booking.customerName !== "" &&
          booking.email !== "" &&
          booking.phone !== "";
        let validPayment = true;
        if (booking.paymentMethod === "card") {
          validPayment =
            booking.cardName.length > 0 &&
            booking.cardNumber.length >= 15 &&
            booking.cardExpiry.length >= 4 &&
            booking.cardCvc.length >= 3;
        }
        return validPet && validCust && validPayment;
      default:
        return false;
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      if (res.ok) {
        const data = await res.json();
        setRefNum(`DS-${data.booking.id.substring(0, 6).toUpperCase()}`);
        setConfirmed(true);
      } else {
        console.error("Booking failed");
      }
    } catch (error) {
      console.error("Error submitting booking", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Calendar logic
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const previousMonthLastDay = new Date(year, month, 0).getDate();

  const calendarDays = [];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(year, month - 1, previousMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  const remainingCells = 42 - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarDays.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  if (confirmed) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cream dark:bg-[#16161A] px-4 pt-24 pb-12 transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#272730] border border-navy/5 dark:border-white/5 rounded-3xl shadow-xl p-8 sm:p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1
            className="text-3xl font-bold text-navy dark:text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Booking Confirmed! 🎉
          </h1>
          <p className="text-charcoal/70 dark:text-gray-400 mb-8">
            Your spa day is booked. We can&apos;t wait to pamper{" "}
            {booking.petName}!
          </p>

          <div className="bg-cream dark:bg-[#1C1C22] rounded-2xl p-6 mb-8 text-left space-y-3 border border-navy/5 dark:border-white/5">
            <p className="text-sm dark:text-gray-300">
              <strong className="text-navy dark:text-white">Reference:</strong>{" "}
              {refNum}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong className="text-navy dark:text-white">Service:</strong>{" "}
              {booking.serviceName}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong className="text-navy dark:text-white">Date:</strong>{" "}
              {new Date(booking.date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong className="text-navy dark:text-white">Time:</strong>{" "}
              {booking.time}
            </p>
            {booking.pickupRequired && (
              <p className="text-sm dark:text-gray-300">
                <strong className="text-navy dark:text-white">Pickup:</strong>{" "}
                Yes — we&apos;ll collect {booking.petName}!
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/447000000000?text=Hi%20DOGSPA!%20My%20booking%20ref%20is%20${refNum}.%20Looking%20forward%20to%20${booking.petName}'s%20spa%20day!`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center"
            >
              <span>💬 Confirm on WhatsApp</span>
            </a>
            <Link href="/" className="btn-secondary justify-center">
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-cream dark:bg-[#16161A] pt-32 pb-24 px-4 sm:px-6 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Book <span className="text-gold">Spa Day</span>
          </h1>
          <p className="text-charcoal/60 dark:text-gray-400">
            Select a service to begin reserving your exclusive grooming session.
          </p>
        </div>

        {/* Immersive Progress Bar */}
        <div className="flex items-center justify-between mb-16 relative px-8 sm:px-16">
          {/* Background track */}
          <div className="absolute left-8 right-8 sm:left-16 sm:right-16 top-1/2 -translate-y-1/2 h-[2px] bg-charcoal/5 dark:bg-white/5" />

          {/* Active track */}
          <div
            className="absolute left-8 sm:left-16 top-1/2 -translate-y-1/2 h-[2px] bg-gold transition-all duration-700 ease-out"
            style={{
              width: `calc(${((step - 1) / (steps.length - 1)) * 100}% - 4rem)`,
            }}
          />

          {steps.map((s) => {
            const isActive = step >= s.num;
            const isCurrent = step === s.num;
            return (
              <div
                key={s.num}
                className="relative flex flex-col items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 z-10 ${
                    isActive
                      ? "bg-gold text-white shadow-[0_0_15px_rgba(200,169,81,0.4)]"
                      : "bg-white dark:bg-[#272730] text-charcoal/30 dark:text-gray-500 border-2 border-charcoal/5 dark:border-white/5"
                  }`}
                >
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span
                  className={`absolute -bottom-8 text-xs font-semibold uppercase tracking-wider transition-colors duration-500 whitespace-nowrap ${
                    isCurrent
                      ? "text-navy dark:text-white"
                      : isActive
                      ? "text-gold"
                      : "text-charcoal/30 dark:text-gray-600"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Form Box */}
        <div className="bg-white dark:bg-[#272730] rounded-3xl shadow-xl border border-navy/5 dark:border-white/5 p-6 sm:p-10 lg:p-12 transition-colors duration-500">
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2
                    className="text-2xl font-bold text-navy dark:text-white mb-8"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Select Treatment
                  </h2>

                  <div className="space-y-6 mb-10">
                    <div className="relative">
                      <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4 z-10 pointer-events-none">
                        Select a Service or Package
                      </label>
                      <button
                        onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                        className={`w-full pt-8 pb-3 px-4 rounded-xl border bg-cream dark:bg-[#1C1C22] text-left transition-all ${
                          isServiceDropdownOpen
                            ? "border-gold ring-1 ring-gold bg-white dark:bg-[#16161A]"
                            : "border-transparent hover:border-gold/30"
                        }`}
                      >
                        <span className="text-navy dark:text-white font-medium block truncate pr-8">
                          {booking.serviceName || "Choose an option..."}
                        </span>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40 dark:text-gray-500">
                          <motion.div animate={{ rotate: isServiceDropdownOpen ? -90 : 90 }}>
                            <ChevronRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {isServiceDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 w-full mt-2 bg-white dark:bg-[#272730] border border-charcoal/5 dark:border-white/5 rounded-2xl shadow-2xl overflow-hidden"
                          >
                            <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                              <div className="px-3 py-2 text-[10px] font-bold text-charcoal/40 dark:text-gray-500 uppercase tracking-widest">
                                Individual Services
                              </div>
                              {services.map((s) => (
                                <button
                                  key={s.id}
                                  onClick={() => {
                                    selectService(s.id, s.name, s.priceFrom);
                                    setIsServiceDropdownOpen(false);
                                  }}
                                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gold/5 dark:hover:bg-white/5 transition-colors group"
                                >
                                  <div className="flex items-center gap-3 text-left">
                                    <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                                      {s.icon}
                                    </span>
                                    <div>
                                      <span className="block font-semibold text-sm text-navy dark:text-white">
                                        {s.name}
                                      </span>
                                      <span className="block text-xs text-charcoal/50 dark:text-gray-400">
                                        {s.duration}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-sm font-bold text-gold">
                                    {s.price}
                                  </span>
                                </button>
                              ))}

                              <div className="px-3 py-2 mt-2 text-[10px] font-bold text-charcoal/40 dark:text-gray-500 uppercase tracking-widest border-t border-charcoal/5 dark:border-white/5 pt-4">
                                Value Packages
                              </div>
                              {servicePackages.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => {
                                    selectService(p.id, `${p.name} Package`, p.price);
                                    setIsServiceDropdownOpen(false);
                                  }}
                                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gold/5 dark:hover:bg-white/5 transition-colors group"
                                >
                                  <div className="text-left">
                                    <span className="block font-semibold text-sm text-navy dark:text-white">
                                      {p.name} Package
                                    </span>
                                    <span className="block text-xs text-charcoal/50 dark:text-gray-400">
                                      {p.tagline}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="block text-sm font-bold text-gold">
                                      {p.priceLabel}
                                    </span>
                                    {p.badge && (
                                      <span className="block text-[9px] uppercase tracking-wider font-bold text-gold/70 mt-0.5">
                                        {p.badge}
                                      </span>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2
                    className="text-2xl font-bold text-navy dark:text-white mb-8"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Choose Date &amp; Time
                  </h2>

                  {/* Minimalist Calendar */}
                  <div className="mb-12 bg-cream dark:bg-[#1C1C22] rounded-3xl p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-lg font-bold text-navy dark:text-white">
                        {currentMonthDate.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </h3>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            const d = new Date();
                            d.setDate(1);
                            setCurrentMonthDate(d);
                          }}
                          className="text-[10px] font-bold text-gold hover:text-gold-dark tracking-widest uppercase"
                        >
                          Today
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setCurrentMonthDate(
                                new Date(year, month - 1, 1)
                              )
                            }
                            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-charcoal/60 dark:text-gray-400 transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              setCurrentMonthDate(
                                new Date(year, month + 1, 1)
                              )
                            }
                            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-charcoal/60 dark:text-gray-400 transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center">
                      {/* Day Headers */}
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                        (day, i) => (
                          <div
                            key={i}
                            className="text-[11px] font-bold uppercase tracking-wider text-charcoal/40 dark:text-gray-500 pb-2"
                          >
                            {day}
                          </div>
                        )
                      )}

                      {/* Date Cells */}
                      {calendarDays.map((dayObj, i) => {
                        const d = dayObj.date;
                        const offset = d.getTimezoneOffset() * 60000;
                        const dateStr = new Date(d.getTime() - offset)
                          .toISOString()
                          .split("T")[0];

                        const isSelected = booking.date === dateStr;
                        const isSunday = d.getDay() === 0;

                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const isPast = d < today;
                        const isDisabled = isPast || isSunday;

                        let textClass =
                          "text-navy dark:text-gray-200 font-medium";
                        if (!dayObj.isCurrentMonth)
                          textClass = "text-charcoal/20 dark:text-gray-600";
                        if (isDisabled)
                          textClass =
                            "text-charcoal/20 dark:text-gray-700 cursor-not-allowed";
                        if (isSelected) textClass = "text-white font-bold";

                        return (
                          <div
                            key={i}
                            className="flex justify-center items-center h-10 sm:h-12"
                          >
                            <button
                              disabled={isDisabled}
                              onClick={() => {
                                setBooking({ ...booking, date: dateStr });
                                if (booking.time) {
                                  setTimeout(() => setStep(3), 400);
                                }
                              }}
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-gold shadow-md"
                                  : isDisabled
                                  ? ""
                                  : "hover:bg-gold/10 dark:hover:bg-white/5"
                              } ${textClass}`}
                            >
                              {d.getDate()}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-8">
                    {timeCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <div key={category.label} className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-charcoal/60 dark:text-gray-400 border-b border-charcoal/5 dark:border-white/5 pb-2">
                            <Icon className="w-4 h-4" />
                            {category.label}
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {category.slots.map((time) => {
                              const isSelected = booking.time === time;
                              return (
                                <button
                                  key={time}
                                  onClick={() => {
                                    setBooking({ ...booking, time });
                                    if (booking.date) {
                                      setTimeout(() => setStep(3), 400);
                                    }
                                  }}
                                  className={`py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                                    isSelected
                                      ? "bg-navy dark:bg-white border-navy dark:border-white text-white dark:text-navy shadow-lg"
                                      : "bg-transparent border-charcoal/10 dark:border-white/10 hover:border-gold hover:text-gold text-navy dark:text-gray-300"
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Checkout (Details & Payment) */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Summary Box */}
                  <div className="mb-10 bg-gold/5 dark:bg-gold/10 border border-gold/20 rounded-2xl p-6">
                     <h3 className="text-[10px] font-bold text-gold uppercase tracking-widest mb-3">Booking Summary</h3>
                     <div className="flex justify-between items-start">
                        <div>
                           <p className="font-bold text-navy dark:text-white">{booking.serviceName}</p>
                           {booking.date && booking.time && (
                              <p className="text-sm text-charcoal/70 dark:text-gray-300 mt-1">
                                 {new Date(booking.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short"})} at {booking.time}
                              </p>
                           )}
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-gold">£{booking.servicePrice}</p>
                        </div>
                     </div>
                  </div>

                  {/* Section: Pet Details */}
                  <div className="mb-12">
                    <h2
                      className="text-2xl font-bold text-navy dark:text-white mb-6"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Pet Details
                    </h2>
                    <div className="space-y-5">
                      <div className="relative">
                        <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4">
                          Pet&apos;s Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={booking.petName}
                          onChange={(e) =>
                            setBooking({
                              ...booking,
                              petName: e.target.value,
                            })
                          }
                          className="w-full h-[68px] pt-8 pb-3 px-4 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] focus:bg-white dark:focus:bg-[#16161A] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-navy dark:text-white font-medium"
                          placeholder="Biscuit"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative h-[68px]">
                          <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4 z-20 pointer-events-none">
                            Pet Type *
                          </label>
                          <div className="w-full h-full pt-[26px] pb-1.5 px-1.5 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] flex gap-1 relative">
                            {["dog", "cat"].map((type) => {
                              const isSelected = booking.petType === type;
                              return (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setBooking({ ...booking, petType: type })}
                                  className={`relative w-1/2 h-full rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors duration-300 z-10 ${
                                    isSelected ? "text-navy dark:text-white" : "text-charcoal/40 hover:text-charcoal/70 dark:text-gray-500 dark:hover:text-gray-300"
                                  }`}
                                >
                                  {isSelected && (
                                    <motion.div
                                      layoutId="petTypeActive"
                                      className="absolute inset-0 bg-white dark:bg-[#2A2A35] shadow-sm border border-black/5 dark:border-white/5 rounded-lg -z-10"
                                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                  )}
                                  <span className="text-lg group-hover:scale-110 transition-transform">{type === "dog" ? "🐶" : "🐱"}</span>
                                  <span className="capitalize">{type}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div className="relative">
                          <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4">
                            Breed
                          </label>
                          <input
                            type="text"
                            value={booking.breed}
                            onChange={(e) =>
                              setBooking({
                                ...booking,
                                breed: e.target.value,
                              })
                            }
                            className="w-full h-[68px] pt-8 pb-3 px-4 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] focus:bg-white dark:focus:bg-[#16161A] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-navy dark:text-white font-medium"
                            placeholder="Cockapoo"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4">
                          Special Notes
                        </label>
                        <textarea
                          rows={3}
                          value={booking.notes}
                          onChange={(e) =>
                            setBooking({ ...booking, notes: e.target.value })
                          }
                          className="w-full pt-8 pb-3 px-4 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] focus:bg-white dark:focus:bg-[#16161A] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none text-navy dark:text-white font-medium"
                          placeholder="Any allergies or requirements..."
                        />
                      </div>

                      <label className="flex items-center gap-4 p-5 rounded-2xl bg-cream dark:bg-[#1C1C22] cursor-pointer group hover:bg-gold/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-gold/30">
                        <input
                          type="checkbox"
                          checked={booking.pickupRequired}
                          onChange={(e) =>
                            setBooking({
                              ...booking,
                              pickupRequired: e.target.checked,
                            })
                          }
                          className="w-5 h-5 rounded text-gold focus:ring-gold border-charcoal/20 dark:border-white/20 bg-white dark:bg-[#272730]"
                        />
                        <div>
                          <span className="font-semibold text-navy dark:text-white block mb-0.5">
                            Pickup &amp; Drop-off
                          </span>
                          <span className="block text-sm text-charcoal/60 dark:text-gray-400">
                            We&apos;ll collect and return your pet within
                            Harrow
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Section: Your Details */}
                  <div className="mb-12">
                    <h2
                      className="text-2xl font-bold text-navy dark:text-white mb-6"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Your Details
                    </h2>
                    <div className="space-y-5">
                      <div className="relative">
                        <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={booking.customerName}
                          onChange={(e) =>
                            setBooking({
                              ...booking,
                              customerName: e.target.value,
                            })
                          }
                          className="w-full pt-8 pb-3 px-4 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] focus:bg-white dark:focus:bg-[#16161A] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-navy dark:text-white font-medium"
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={booking.email}
                            onChange={(e) =>
                              setBooking({
                                ...booking,
                                email: e.target.value,
                              })
                            }
                            className="w-full pt-8 pb-3 px-4 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] focus:bg-white dark:focus:bg-[#16161A] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-navy dark:text-white font-medium"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="relative">
                          <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={booking.phone}
                            onChange={(e) =>
                              setBooking({
                                ...booking,
                                phone: e.target.value,
                              })
                            }
                            className="w-full pt-8 pb-3 px-4 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] focus:bg-white dark:focus:bg-[#16161A] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-navy dark:text-white font-medium"
                            placeholder="+44 7000 000 000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section: Payment */}
                  <div>
                    <h2
                      className="text-2xl font-bold text-navy dark:text-white mb-6"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Payment
                    </h2>

                    {/* Deposit vs Full Tabs */}
                    <div className="flex bg-cream dark:bg-[#1C1C22] p-1.5 rounded-2xl mb-8">
                      <button
                        onClick={() =>
                          setBooking({ ...booking, paymentType: "deposit" })
                        }
                        className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all ${
                          booking.paymentType === "deposit"
                            ? "bg-white dark:bg-[#272730] text-navy dark:text-white shadow-sm"
                            : "text-charcoal/50 dark:text-gray-500 hover:text-navy dark:hover:text-gray-300"
                        }`}
                      >
                        Pay 20% Deposit
                      </button>
                      <button
                        onClick={() =>
                          setBooking({ ...booking, paymentType: "full" })
                        }
                        className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all ${
                          booking.paymentType === "full"
                            ? "bg-white dark:bg-[#272730] text-navy dark:text-white shadow-sm"
                            : "text-charcoal/50 dark:text-gray-500 hover:text-navy dark:hover:text-gray-300"
                        }`}
                      >
                        Pay In Full (-5%)
                      </button>
                    </div>

                    {/* Card Details */}
                    <div className="space-y-5">
                      <div className="relative">
                        <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={booking.cardName}
                          onChange={(e) =>
                            setBooking({
                              ...booking,
                              cardName: e.target.value,
                            })
                          }
                          className="w-full pt-8 pb-3 px-4 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] focus:bg-white dark:focus:bg-[#16161A] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-navy dark:text-white font-medium"
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="relative">
                        <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          value={booking.cardNumber}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            val = val.replace(/(.{4})/g, "$1 ").trim();
                            setBooking({ ...booking, cardNumber: val });
                          }}
                          className="w-full pt-8 pb-3 px-4 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] focus:bg-white dark:focus:bg-[#16161A] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-navy dark:text-white font-medium font-mono text-lg"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4">
                            Expiry
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={booking.cardExpiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, "");
                              if (val.length >= 2) {
                                val = val.slice(0, 2) + "/" + val.slice(2);
                              }
                              setBooking({ ...booking, cardExpiry: val });
                            }}
                            className="w-full pt-8 pb-3 px-4 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] focus:bg-white dark:focus:bg-[#16161A] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-navy dark:text-white font-medium font-mono text-lg"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="relative">
                          <label className="text-[10px] font-bold text-charcoal/50 dark:text-gray-400 uppercase tracking-widest absolute top-3 left-4">
                            CVC
                          </label>
                          <input
                            type="text"
                            maxLength={4}
                            value={booking.cardCvc}
                            onChange={(e) =>
                              setBooking({
                                ...booking,
                                cardCvc: e.target.value.replace(/\D/g, ""),
                              })
                            }
                            className="w-full pt-8 pb-3 px-4 rounded-xl border border-transparent bg-cream dark:bg-[#1C1C22] focus:bg-white dark:focus:bg-[#16161A] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-navy dark:text-white font-medium font-mono text-lg"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* INLINE Navigation Bar */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-charcoal/10 dark:border-white/10">
              {step > 1 ? (
                <button
                  onClick={() => setStep((step - 1) as Step)}
                  className="flex items-center gap-2 text-charcoal/50 hover:text-navy dark:text-gray-500 dark:hover:text-white transition-colors font-medium tracking-wide"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
              ) : (
                <div /> // Spacer
              )}

              {step < 3 ? (
                <button
                  onClick={() => canProceed() && setStep((step + 1) as Step)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-3 py-3 px-8 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                    canProceed()
                      ? "bg-gold text-white hover:bg-gold-dark hover:scale-105 shadow-xl hover:shadow-2xl shadow-gold/20"
                      : "bg-charcoal/5 dark:bg-white/5 text-charcoal/30 dark:text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={!canProceed() || isProcessing}
                  className={`flex items-center gap-3 py-3 px-8 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                    canProceed() && !isProcessing
                      ? "bg-gold text-white hover:bg-gold-dark hover:scale-105 shadow-xl hover:shadow-2xl shadow-gold/20"
                      : "bg-charcoal/5 dark:bg-white/5 text-charcoal/30 dark:text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : null}
                  <span>
                    Pay £
                    {booking.paymentType === "deposit"
                      ? depositAmount
                      : fullAmount}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
