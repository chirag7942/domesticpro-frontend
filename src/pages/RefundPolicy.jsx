import React from "react";
import { useEffect, useState } from "react";
import HeroWizard from "../components/HeroWizard";
import { HeadphonesIcon } from "lucide-react";

const RefundPolicy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[75vh] md:h-[85vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031916/refundPolicy_rmzl2s.png)`,
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Refund & Replacement Policy
          </h1>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#replacement"
              className="bg-primary hover:bg-primaryHover text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              Replacement Policy
            </a>

            <a
              href="#corporate"
              onClick={() => setActiveSection("corporate")}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition duration-300"
            >
              Available Plans
            </a>
          </div>
        </div>
      </section>

      {/* POLICY HIGHLIGHTS SECTION */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Refund & Replacement Policy Highlights
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Clear policies designed to ensure transparency, fairness, and
              dependable service.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Guaranteed Replacements */}
            <div className="bg-bgLight rounded-2xl p-6 text-center hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🔄
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Guaranteed Replacements
              </h3>

              <p className="text-textLight text-sm">
                Suitable replacement provided if the assigned staff resigns or
                does not meet expectations.
              </p>
            </div>

            {/* No Refund Policy */}
            <div className="bg-bgLight rounded-2xl p-6 text-center hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🚫
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                No Refund Policy
              </h3>

              <p className="text-textLight text-sm">
                All service bookings are final and non-refundable as per agreed
                policy terms.
              </p>
            </div>

            {/* Dedicated Support */}
            <div className="bg-bgLight rounded-2xl p-6 text-center hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                👤
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Dedicated Support
              </h3>

              <p className="text-textLight text-sm">
                Relationship manager assistance for premium and corporate
                service plans.
              </p>
            </div>

            {/* Quick Deployment */}
            <div className="bg-bgLight rounded-2xl p-6 text-center hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                ⏱️
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Quick Deployment
              </h3>

              <p className="text-textLight text-sm">
                Replacement staff arranged within 2–4 working days, subject to
                availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= POLICY DETAILS SECTION ================= */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* LEFT SIDEBAR */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-bgLight p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-lg mb-6 text-textDark">
                Quick Navigation
              </h3>

              <ul className="space-y-4">
                {[
                  { id: "introduction", label: "Introduction" },
                  { id: "nature", label: "Nature of Services" },
                  { id: "replacement", label: "Replacement Policy" },
                  { id: "refund", label: "Refund Policy" },
                  { id: "cancellation", label: "Service Cancellation" },
                  { id: "corporate", label: "Available Plans" },
                  { id: "contact", label: "Contact Us" },
                ].map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`flex items-center gap-2 font-medium transition-all ${
                        activeSection === item.id
                          ? "text-primary border-b-2 border-primary"
                          : "text-textLight"
                      }`}
                    >
                      <span
                        className={`inline-block w-2 h-2 border-t-2 border-r-2 transform ${
                          activeSection === item.id
                            ? "border-primary rotate-45"
                            : "border-textLight rotate-45"
                        }`}
                      ></span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 bg-white border border-primary/15 p-4 rounded-xl text-center">
                <HeadphonesIcon
                  size={18}
                  className="text-primary mx-auto mb-2"
                />
                <p className="font-bold text-textDark text-sm mb-1">
                  Need Help?
                </p>
                <p className="text-xs text-textLight mb-3 leading-relaxed">
                  Our team can clarify any policy questions before you commit.
                </p>
                <a
                  href="/contact"
                  className="block bg-primary hover:bg-primaryHover text-white text-xs font-bold
                      py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-3 space-y-20">
            <section
              id="introduction"
              data-section="introduction"
              className="scroll-mt-24"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold">
                  i
                </div>
                <h2 className="text-3xl font-bold text-textDark">
                  1. Introduction
                </h2>
              </div>

              {/* Subsections */}
              <div className="space-y-4 text-textDark">
                {/* 1.1 Applicability */}
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    1.1 Applicability
                  </h3>
                  <p className="text-textLight text-sm">
                    This policy applies to all clients availing any domestic
                    help services provided by Domestic Pro (operated by Logibyte
                    Technologies), regardless of service duration or category.
                  </p>
                </div>

                {/* 1.2 Focus on Service Continuity */}
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    1.2 Focus on Service Continuity
                  </h3>
                  <p className="text-textLight text-sm">
                    Our primary focus is to ensure smooth and uninterrupted
                    domestic help services. Instead of refunds, Domestic Pro
                    provides a Replacement Guarantee that allows clients to
                    receive a suitable replacement maid if the initially
                    deployed staff resigns or is found unsuitable.
                  </p>
                </div>

                {/* 1.3 No Refund Policy */}
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    1.3 No Refund Policy
                  </h3>
                  <p className="text-textLight text-sm mb-2">
                    Refunds are not applicable under any circumstances, whether:
                  </p>
                  <ul className="list-disc list-inside text-textLight text-sm space-y-1">
                    <li>
                      Before Maid Deployment (e.g., post-booking or profile
                      sharing)
                    </li>
                    <li>
                      After Maid Deployment (e.g., in case of dissatisfaction or
                      maid resignation)
                    </li>
                  </ul>
                  <p className="text-textLight text-sm mt-2">
                    All bookings are non-refundable, and service continuity is
                    maintained exclusively through our replacement process.
                  </p>
                </div>
              </div>
            </section>

            <section id="nature" data-section="nature" className="scroll-mt-24">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold"
                  style={{ backgroundColor: "#EC5F36" }}
                >
                  🛠
                </div>

                <h2 className="text-3xl font-bold text-textDark">
                  2. Nature Of Our Services
                </h2>
              </div>

              <p className="text-textLight mb-10">
                Domestic Pro provides a wide range of professional domestic help
                services, including but not limited to:
              </p>

              {/* Service Cards */}
              <div className="space-y-6">
                {/* Card 1 */}
                <div
                  className="bg-gray-100 rounded-xl p-6 border-l-4 transition-all duration-300 
      group hover:bg-[#EC5F36] hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: "#EC5F36" }}
                >
                  <h3 className="font-semibold text-lg text-textDark mb-1 transition-colors duration-300 group-hover:text-white">
                    All-Rounder Maids
                  </h3>
                  <p className="text-textLight text-sm transition-colors duration-300 group-hover:text-white">
                    For household cleaning, maintenance, and daily chores.
                  </p>
                </div>

                {/* Card 2 */}
                <div
                  className="bg-gray-100 rounded-xl p-6 border-l-4 transition-all duration-300 
      group hover:bg-[#EC5F36] hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: "#EC5F36" }}
                >
                  <h3 className="font-semibold text-lg text-textDark mb-1 transition-colors duration-300 group-hover:text-white">
                    Live-In Maids (24x7)
                  </h3>
                  <p className="text-textLight text-sm transition-colors duration-300 group-hover:text-white">
                    For full-time domestic assistance with accommodation.
                  </p>
                </div>

                {/* Card 3 */}
                <div
                  className="bg-gray-100 rounded-xl p-6 border-l-4 transition-all duration-300 
      group hover:bg-[#EC5F36] hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: "#EC5F36" }}
                >
                  <h3 className="font-semibold text-lg text-textDark mb-1 transition-colors duration-300 group-hover:text-white">
                    Baby Caretakers And Japa Maids
                  </h3>
                  <p className="text-textLight text-sm transition-colors duration-300 group-hover:text-white">
                    For newborn care, postnatal support, and mother care.
                  </p>
                </div>

                {/* Card 4 */}
                <div
                  className="bg-gray-100 rounded-xl p-6 border-l-4 transition-all duration-300 
      group hover:bg-[#EC5F36] hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: "#EC5F36" }}
                >
                  <h3 className="font-semibold text-lg text-textDark mb-1 transition-colors duration-300 group-hover:text-white">
                    Patient Care And Elderly Assistance
                  </h3>
                  <p className="text-textLight text-sm transition-colors duration-300 group-hover:text-white">
                    For basic caregiving, mobility support, and companionship.
                  </p>
                </div>

                {/* Card 5 */}
                <div
                  className="bg-gray-100 rounded-xl p-6 border-l-4 transition-all duration-300 
      group hover:bg-[#EC5F36] hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: "#EC5F36" }}
                >
                  <h3 className="font-semibold text-lg text-textDark mb-1 transition-colors duration-300 group-hover:text-white">
                    Cooking Maids
                  </h3>
                  <p className="text-textLight text-sm transition-colors duration-300 group-hover:text-white">
                    For meal preparation, kitchen management, and dietary
                    assistance.
                  </p>
                </div>

                {/* Card 6 */}
                <div
                  className="bg-gray-100 rounded-xl p-6 border-l-4 transition-all duration-300 
      group hover:bg-[#EC5F36] hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: "#EC5F36" }}
                >
                  <h3 className="font-semibold text-lg text-textDark mb-1 transition-colors duration-300 group-hover:text-white">
                    On-Demand Or Short-Term Maids
                  </h3>
                  <p className="text-textLight text-sm transition-colors duration-300 group-hover:text-white">
                    For temporary or emergency household support.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="replacement"
              data-section="replacement"
              className="scroll-mt-24"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold"
                  style={{ backgroundColor: "#EC5F36" }}
                >
                  🔁
                </div>

                <h2 className="text-3xl font-bold text-textDark">
                  3. Replacement Policy
                </h2>
              </div>

              <p className="text-textLight mb-8">
                Domestic Pro is committed to ensuring uninterrupted domestic
                help services through its Guaranteed Replacement Policy. This
                ensures that clients continue to receive reliable support in the
                event of maid resignation, unsuitability, or performance issues.
              </p>

              {/* 3.1 Eligibility */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-textDark mb-3">
                  3.1 Eligibility For Replacement
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-textLight">
                  <li>
                    The maid resigns or discontinues the service for reasons not
                    caused by the client.
                  </li>
                  <li>
                    The maid is unsuitable for the assigned household tasks or
                    does not meet service expectations.
                  </li>
                  <li>
                    Performance or compatibility issues are reported promptly to
                    Domestic Pro by the client.
                  </li>
                </ul>
              </div>

              {/* 3.2 Replacement Process */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-textDark mb-4">
                  3.2 Replacement Process
                </h3>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-sm"
                      style={{ backgroundColor: "#EC5F36" }}
                    >
                      1
                    </div>
                    <p className="text-textLight">
                      The client must inform Domestic Pro immediately regarding
                      the need for a replacement.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-sm"
                      style={{ backgroundColor: "#EC5F36" }}
                    >
                      2
                    </div>
                    <p className="text-textLight">
                      A new maid profile will be shortlisted and shared within 2
                      – 4 working days, subject to availability.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-sm"
                      style={{ backgroundColor: "#EC5F36" }}
                    >
                      3
                    </div>
                    <p className="text-textLight">
                      The client is entitled to replacement strictly as per the
                      number specified in their active service contract.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3.3 Replacement Not Applicable */}
              <div>
                <h3 className="text-xl font-semibold text-textDark mb-4">
                  3.3 Replacement Not Applicable If
                </h3>

                <div className="space-y-4">
                  <div
                    className="bg-gray-100 p-4 rounded-lg border-l-4"
                    style={{ borderColor: "#EC5F36" }}
                  >
                    <h4 className="font-semibold text-textDark mb-1">
                      Maid Resigns Due to Client Actions
                    </h4>
                    <p className="text-textLight text-sm">
                      Harassment, unsafe conditions, or delayed salary payments
                      by the client.
                    </p>
                  </div>

                  <div
                    className="bg-gray-100 p-4 rounded-lg border-l-4"
                    style={{ borderColor: "#EC5F36" }}
                  >
                    <h4 className="font-semibold text-textDark mb-1">
                      Direct Hiring Outside Domestic Pro
                    </h4>
                    <p className="text-textLight text-sm">
                      Client directly hires the maid outside the Domestic Pro
                      platform.
                    </p>
                  </div>

                  <div
                    className="bg-gray-100 p-4 rounded-lg border-l-4"
                    style={{ borderColor: "#EC5F36" }}
                  >
                    <h4 className="font-semibold text-textDark mb-1">
                      Tasks Beyond Agreed Scope
                    </h4>
                    <p className="text-textLight text-sm">
                      Maid is required to work outside the agreed service scope.
                    </p>
                  </div>

                  <div
                    className="bg-gray-100 p-4 rounded-lg border-l-4"
                    style={{ borderColor: "#EC5F36" }}
                  >
                    <h4 className="font-semibold text-textDark mb-1">
                      All Replacements Used
                    </h4>
                    <p className="text-textLight text-sm">
                      Client has already utilized all the replacements allowed
                      under the contract.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="refund"
              data-section="refund"
              className="scroll-mt-24 "
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold"
                  style={{ backgroundColor: "#EC5F36" }}
                >
                  💳
                </div>

                <h2 className="text-3xl font-bold text-textDark">
                  4. Refund Policy
                </h2>
              </div>

              <p className="text-textLight mb-8">
                DomesticPro follows a strict no-refund policy once the service
                process has been initiated. Our operational, verification, and
                placement efforts begin immediately after confirmation, which
                makes refunds non-applicable under normal circumstances.
              </p>

              {/* 4.1 General Policy */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-textDark mb-3">
                  4.1 General Refund Terms
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-textLight">
                  <li>All registration and service fees are non-refundable.</li>
                  <li>
                    Once candidate profiles are shared, the service is
                    considered initiated.
                  </li>
                  <li>
                    Refunds are not provided due to change of mind after
                    payment.
                  </li>
                  <li>
                    Delays caused by availability constraints do not qualify for
                    refunds.
                  </li>
                </ul>
              </div>

              {/* 4.2 Why Refunds Are Not Provided */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-textDark mb-4">
                  4.2 Why Refunds Are Not Provided
                </h3>

                <div className="space-y-4">
                  {/* Point 1 */}
                  <div className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-sm"
                      style={{ backgroundColor: "#EC5F36" }}
                    >
                      1
                    </div>
                    <p className="text-textLight">
                      Background verification and screening processes involve
                      operational costs.
                    </p>
                  </div>

                  {/* Point 2 */}
                  <div className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-sm"
                      style={{ backgroundColor: "#EC5F36" }}
                    >
                      2
                    </div>
                    <p className="text-textLight">
                      Shortlisting and matching suitable candidates requires
                      dedicated manpower and time.
                    </p>
                  </div>

                  {/* Point 3 */}
                  <div className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-sm"
                      style={{ backgroundColor: "#EC5F36" }}
                    >
                      3
                    </div>
                    <p className="text-textLight">
                      Administrative processing begins immediately upon payment
                      confirmation.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4.3 Exceptions (If Applicable) */}
              <div>
                <h3 className="text-xl font-semibold text-textDark mb-4">
                  4.3 Exceptions (If Applicable)
                </h3>

                <div className="space-y-4">
                  <div
                    className="bg-gray-100 p-4 rounded-lg border-l-4"
                    style={{ borderColor: "#EC5F36" }}
                  >
                    <h4 className="font-semibold text-textDark mb-1">
                      Duplicate Payment
                    </h4>
                    <p className="text-textLight text-sm">
                      In case of accidental duplicate transactions, the extra
                      amount will be refunded after verification.
                    </p>
                  </div>

                  <div
                    className="bg-gray-100 p-4 rounded-lg border-l-4"
                    style={{ borderColor: "#EC5F36" }}
                  >
                    <h4 className="font-semibold text-textDark mb-1">
                      Service Not Initiated
                    </h4>
                    <p className="text-textLight text-sm">
                      If no candidate profiles have been shared and the process
                      has not started, management may review refund eligibility.
                    </p>
                  </div>

                  <div
                    className="bg-gray-100 p-4 rounded-lg border-l-4"
                    style={{ borderColor: "#EC5F36" }}
                  >
                    <h4 className="font-semibold text-textDark mb-1">
                      Management Discretion
                    </h4>
                    <p className="text-textLight text-sm">
                      Any exceptional refund will be solely at the discretion of
                      DomesticPro management.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="cancellation"
              data-section="cancellation"
              className="scroll-mt-24"
            >
              <div className=" ">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold"
                    style={{ backgroundColor: "#EC5F36" }}
                  >
                    ✖
                  </div>

                  <h2 className="text-3xl font-bold text-textDark">
                    5. Service Cancellation
                  </h2>
                </div>

                {/* 5.1 */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-textDark flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#EC5F36" }}
                    ></span>
                    5.1 Client-Initiated Cancellation
                  </h3>

                  <ul className="mt-3 list-disc pl-6 space-y-2 text-textLight">
                    <li>
                      Clients may terminate the service at their discretion, but
                      no refunds will be issued under any circumstances.
                    </li>
                  </ul>
                </div>

                {/* 5.2 */}
                <div>
                  <h3 className="text-xl font-semibold text-textDark flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#EC5F36" }}
                    ></span>
                    5.2 Continuation Of Replacements
                  </h3>

                  <ul className="mt-3 list-disc pl-6 space-y-2 text-textLight">
                    <li>
                      Even if the client chooses to cancel, replacements will
                      continue as per the active service contract, up to the
                      contract's expiry date.
                    </li>
                    <li>
                      After contract expiration, no further replacements or
                      services will be provided unless a new contract is signed.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section
              id="corporate"
              data-section="corporate"
              className="scroll-mt-24  "
            >
              <div className="max-w-6xl mx-auto ">
                {/* Header */}
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: "#EC5F36" }}
                    >
                      💼
                    </div>

                    <h2 className="text-3xl font-bold text-textDark">
                      6. Domestic Pro – Available Plans
                    </h2>
                  </div>

                  <p className="text-textLight max-w-3xl mb-3">
                    Domestic Pro Offers Flexible and Transparent Corporate
                    Packages designed to provide Complete Service Support,
                    Guaranteed Replacements, and a Dedicated Relationship
                    Manager.
                  </p>

                  <p className="text-textLight max-w-3xl">
                    Choose a plan that best suits your household requirements
                    and enjoy Stress-Free Domestic Help Management.
                  </p>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                  {/* CONNECT PLAN */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm border">
                    <div className="mb-6">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                        style={{ backgroundColor: "#FDEDE7" }}
                      >
                        ⚡
                      </div>

                      <h3 className="text-xl font-semibold text-textDark">
                        Domestic Pro – Connect
                      </h3>
                      <p className="text-sm text-textLight mt-1">
                        Structured support to help you hire verified domestic
                        help.
                      </p>
                    </div>

                    {/* Price Box */}
                    <div className="bg-[#f7f3f1] rounded-xl p-5 mb-6">
                      <p className="text-2xl font-bold text-textDark">
                        ₹11,000{" "}
                        <span className="text-sm font-medium">+ GST</span>
                      </p>
                      <p className="text-xs text-textLight mt-1">
                        ₹12,980 incl. GST
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 text-sm text-textLight mb-8">
                      <li className="text-[#EC5F36] font-medium">
                        • 1–2 verified profiles
                      </li>
                      <li>
                        ✓ Requirement understanding (role, hours, expectations)
                      </li>
                      <li>✓ ID & address verification</li>
                      <li>✓ 7-day trial period</li>
                      <li>✓ 10-day replacement search window</li>
                      <li>✓ Profile finalization assistance</li>
                      <li>✓ One-time placement support</li>
                    </ul>

                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full border rounded-xl py-3 font-medium transition 
             text-[#EC5F36] border-[#EC5F36]
             hover:bg-[#EC5F36] hover:text-white"
                    >
                      Choose Connect
                    </button>
                  </div>

                  {/* CARE PLAN */}
                  <div className="bg-white rounded-2xl p-8 shadow-md border">
                    <div className="mb-6">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                        style={{ backgroundColor: "#FDEDE7" }}
                      >
                        🛡
                      </div>

                      <h3 className="text-xl font-semibold text-textDark">
                        Domestic Pro – Care
                      </h3>
                      <p className="text-sm text-textLight mt-1">
                        Enhanced verification and screening for added
                        confidence.
                      </p>
                    </div>

                    <div className="bg-[#f7f3f1] rounded-xl p-5 mb-6">
                      <p className="text-2xl font-bold text-textDark">
                        ₹15,000{" "}
                        <span className="text-sm font-medium">+ GST</span>
                      </p>
                      <p className="text-xs text-textLight mt-1">
                        ₹17,700 incl. GST
                      </p>
                    </div>

                    <ul className="space-y-3 text-sm text-textLight mb-8">
                      <li className="text-[#EC5F36] font-medium">
                        • 3 verified profiles
                      </li>
                      <li>✓ Includes everything in Connect</li>
                      <li>✓ Police verification</li>
                      <li>✓ Enhanced screening review</li>
                    </ul>

                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full border rounded-xl py-3 font-medium transition 
             text-[#EC5F36] border-[#EC5F36]
             hover:bg-[#EC5F36] hover:text-white"
                    >
                      Choose Care
                    </button>
                  </div>

                  {/* COMPLETE PLAN (Highlighted) */}
                  <div
                    className="bg-white rounded-2xl p-8 shadow-lg border-2 relative"
                    style={{ borderColor: "#EC5F36" }}
                  >
                    {/* Badge */}
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs text-white rounded-full"
                      style={{ backgroundColor: "#EC5F36" }}
                    >
                      ⭐ Most Recommended
                    </div>

                    <div className="mb-6">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                        style={{ backgroundColor: "#FDEDE7" }}
                      >
                        ⭐
                      </div>

                      <h3 className="text-xl font-semibold text-textDark">
                        Domestic Pro – Complete
                      </h3>
                      <p className="text-sm text-textLight mt-1">
                        End-to-end protection with priority support.
                      </p>
                    </div>

                    <div className="bg-[#f7f3f1] rounded-xl p-5 mb-6">
                      <p className="text-2xl font-bold text-textDark">
                        ₹20,000{" "}
                        <span className="text-sm font-medium">+ GST</span>
                      </p>
                      <p className="text-xs text-textLight mt-1">
                        ₹23,600 incl. GST
                      </p>
                    </div>

                    <ul className="space-y-3 text-sm text-textLight mb-8">
                      <li className="text-[#EC5F36] font-medium">
                        • 5 verified profiles
                      </li>
                      <li>✓ Includes everything in Care</li>
                      <li>✓ 15-day replacement search window</li>
                      <li>✓ 30-day replacement guarantee</li>
                      <li>✓ Priority matching</li>
                      <li>✓ Detailed background & reference verification</li>
                      <li>✓ Ongoing support & mediation</li>
                      <li>✓ Periodic check-ins (30 / 60 days)</li>
                      <li>✓ Role upgrade support</li>
                    </ul>

                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="btn-primary"
                    >
                      Choose Complete
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="contact"
              data-section="contact"
              className="scroll-mt-24"
            >
              {/* Heading */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  🕒
                </div>
                <h2 className="text-2xl font-bold text-textDark">
                  7. Contact Us
                </h2>
              </div>

              <p className="text-sm text-textLight mb-6">
                For replacements, service-related queries, or policy
                clarifications, please contact:
              </p>

              {/* Company Card */}
              <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-primary mb-8">
                <h3 className="font-semibold text-textDark mb-2">
                  Domestic Pro
                </h3>

                <p className="text-sm text-textLight mb-1">
                  📍 Unitech Trade Center, Sector-43, Gurugram
                </p>

                <p className="text-sm text-textLight mb-1">
                  📞 Phone: +91 92112 98139
                </p>
                <p className="text-sm text-textLight">
                  ✉ Email: support@domesticpro.in
                </p>
              </div>

              <p className="text-sm text-textLight mb-8">
                Domestic Pro is Committed to Addressing all Grievances Promptly
                and Transparently.
              </p>

              {/* Acknowledgement Section */}
              <div className="border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-textDark">
                    Acknowledgment
                  </h2>
                </div>

                <p className="text-sm text-textLight mb-4">
                  By Booking our Services, you Acknowledge and Agree that you
                  have Read, Understood, and Accepted this Refund & Replacement
                  Policy, including our Strict No-Refund Clause.
                </p>

                <p className="text-sm font-semibold text-textDark">
                  Domestic Pro – Ensuring Service Continuity Through Guaranteed
                  Replacements, Not Refunds.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* REUSABLE HIRE MODAL */}
      <HeroWizard
        asModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default RefundPolicy;
