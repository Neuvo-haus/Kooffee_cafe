import React from "react";
import { FiCoffee, FiMail, FiPhoneCall } from "react-icons/fi";
import CoffeeDivider from "./components/cooffeedivider";
import ReservationForm from "./components/ReservationForm";
import cafeInteriorMorningLight from "./assets/the cafe/cafe-interior-morning-light.jpeg";
import { CONTACT, CONTACT_LINKS, SITE_HOURS } from "./config/site";

const Reservations = () => {
  return (
    <div className="w-full bg-[rgba(245,240,232,1)] pb-20 pt-24 md:pt-32">
      <section className="flex w-full justify-center px-6 md:px-0">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div className="flex flex-col gap-6">
            <p className="font-dmsans text-xs uppercase tracking-[0.3em] text-[rgba(140,136,128,1)]">
              Reservations
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-5xl italic leading-tight text-[rgba(28,28,26,1)] md:text-7xl">
              Save a quiet corner.
            </h1>
            <p className="max-w-xl font-dmsans text-sm leading-loose text-[rgba(100,96,88,1)] md:text-base">
              Tell us when you would like to come in. We take reservation
              requests for 1 to 12 guests, from 7:00 AM to 9:00 PM, up to 30
              days ahead. A table is confirmed only after our team replies.
            </p>
            <div className="grid grid-cols-1 gap-3 font-dmsans text-sm text-[rgba(100,96,88,1)] md:grid-cols-3">
              <div className="rounded-2xl border border-[rgba(226,221,213,0.9)] p-4">
                <FiCoffee className="mb-3 text-[#C4A882]" />
                {SITE_HOURS.standard}
              </div>
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[rgba(226,221,213,0.9)] p-4 transition hover:border-[#C4A882]"
              >
                <FiPhoneCall className="mb-3 text-[#C4A882]" />
                {CONTACT.phoneLabel}
              </a>
              <a
                href={`mailto:${CONTACT.email}?subject=Reservation%20request`}
                className="rounded-2xl border border-[rgba(226,221,213,0.9)] p-4 transition hover:border-[#C4A882]"
              >
                <FiMail className="mb-3 text-[#C4A882]" />
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div className="h-[420px] overflow-hidden rounded-3xl border border-[rgba(226,221,213,0.9)] shadow-2xl md:h-[620px]">
            <img
              src={cafeInteriorMorningLight}
              alt="Morning light inside Kooffee Cafe"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <CoffeeDivider />

      <section className="flex w-full justify-center px-6 md:px-0">
        <div className="w-full max-w-5xl">
          <ReservationForm />
        </div>
      </section>
    </div>
  );
};

export default Reservations;
