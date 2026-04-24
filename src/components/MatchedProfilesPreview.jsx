export default function MatchedProfilesPreview() {
    const pages = [
        "https://res.cloudinary.com/dto7bji6b/image/upload/v1774503597/1st_page_u48hs0.jpg",
        "https://res.cloudinary.com/dto7bji6b/image/upload/v1774503611/2nd_page_abqjbh.jpg",
        "https://res.cloudinary.com/dto7bji6b/image/upload/v1774503931/3rd_page_a296lt.jpg",
        "https://res.cloudinary.com/dto7bji6b/image/upload/v1774503939/4th_page_qqg1q5.jpg",
    ];

    return (
        <section className="bg-bgLight border-y border-borderLight">
            <div className="max-w-6xl mx-auto px-6 py-20 scroll-section">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
                        See What You'll Receive on WhatsApp
                    </h2>
                    <p className="text-textLight max-w-2xl mx-auto">
                        Once you register, we send you a personalized list of matched profiles
                        based on your exact requirements — instantly on WhatsApp.
                    </p>
                </div>

                {/* PDF Preview Card */}
                <div className="bg-white border border-borderLight rounded-2xl shadow-md overflow-hidden">

                    {/* ── Realistic toolbar strip ── */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#f5f2ee] border-b border-borderLight">
                        {/* Traffic-light dots */}
                        <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#f0a89a] inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#f0d48a] inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#a8d8a8] inline-block" />
                        </div>
                        <span className="text-xs text-textLight tracking-wide">
                            matched_profiles_sample.pdf
                        </span>
                        <span className="text-xs text-textLight">4 pages</span>
                    </div>

                    {/* ── Scrollable PDF ── */}
                    <div className="p-4 md:p-6 pb-0">
                        <div
                            className={[
                                "h-[500px] md:h-[600px] overflow-y-scroll rounded-xl",
                                "bg-[#e8e5e0] p-4 flex flex-col gap-3",
                                // Thin orange scrollbar (Webkit)
                                "[&::-webkit-scrollbar]:w-[5px]",
                                "[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#f5f0eb]",
                                "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#e87c2f]",
                                "[&::-webkit-scrollbar-thumb:hover]:bg-[#d06520]",
                            ].join(" ")}
                            style={{ scrollbarWidth: "thin", scrollbarColor: "#e87c2f #f5f0eb" }}
                        >
                            {pages.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`PDF Page ${i + 1}`}
                                    width={600}
                                    height={850}
                                    className="w-full rounded-[3px] shadow-md"
                                    style={{ aspectRatio: '600/850' }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className="text-center text-sm text-textLight py-4">
                        📄 Sample preview — actual profiles are personalized for you
                    </p>
                </div>
            </div>
        </section>
    );
}