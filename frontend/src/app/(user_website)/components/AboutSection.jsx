'use client'
import CountUp from "react-countup";

function AboutSection() {
    return (
        <section className="rounded-xl overflow-hidden shadow-sm bg-white">

            {/* Top Banner */}
            <div className="border border-gray-200 mb-4 rounded-[10px]">
                <div className="px-6 md:px-10 lg:px-15 py-8 md:py-12 bg-[url('/aboutBanner.png')] bg-cover bg-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                        Best experience <br />
                        <span className="font-light">always wins</span>
                    </h2>
                    <p className="text-gray-500 mt-4 text-sm md:text-base">
                        #1 Online Marketplace for Electronic & Technology <br className="hidden md:block" /> in
                        Mahanttan, CA
                    </p>
                </div>

                {/* Stats Section */}
                <div className="bg-white text-black px-6 md:px-10 lg:px-15 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-x-10">

                    {/* Purpose */}
                    <div className="text-black font-bold uppercase tracking-wide">
                        <h1 className="text-sm md:text-base lg:text-lg">
                            our purpose is to <span className="text-green-400"> enrich
                                <br className="hidden md:block" />
                                and enhance lives </span> through
                            <br className="hidden md:block" />
                            technology
                        </h1>
                    </div>

                    {/* Stats */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5 text-center md:text-left">
                        <div>
                            <h4 className="text-[32px] md:text-[40px] font-bold text-black uppercase">
                                <CountUp start={0} end={12.5} duration={2.5} prefix="$" suffix="M" decimals={1} />
                            </h4>
                            <p className="font-semibold text-[#666666] uppercase text-xs md:text-[12px]">
                                total revenue from 2001 - 2023
                            </p>
                        </div>

                        <div>
                            <h4 className="text-[32px] md:text-[40px] font-bold text-black uppercase">
                                <CountUp start={0} end={12} duration={2.5} suffix="K+" />
                            </h4>
                            <p className="font-semibold text-[#666666] uppercase text-xs md:text-[12px]">
                                orders delivered daily
                            </p>
                        </div>

                        <div>
                            <h4 className="text-[32px] md:text-[40px] font-bold text-black uppercase">
                                <CountUp start={0} end={12.5} duration={2.5} suffix="K+" />
                            </h4>
                            <p className="font-semibold text-[#666666] uppercase text-xs md:text-[12px]">
                                stores and offices worldwide
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-4">
                <div className="bg-[url('/about2.png')] h-[250px] md:h-[420px] rounded-[10px] bg-cover bg-center"></div>
                <div className="rounded-[10px] bg-[#E2E4EB] p-6 md:p-12 lg:p-20 flex flex-col justify-center">
                    <h1 className="text-[16px] md:text-[18px] font-bold mb-4 leading-snug">
                        We connect millions of buyers and sellers around
                        the world, empowering people & creating economic
                        opportunity for all.
                    </h1>
                    <p className="mb-4 text-[13px] md:text-[14px] text-[#333] leading-relaxed">
                        Within our markets, millions of people around the world connect,
                        both online and offline, to make, sell and buy unique goods. We also
                        offer a wide range of Seller Services and tools that help creative
                        entrepreneurs start, manage & scale their businesses.
                    </p>
                    <button className="px-4 md:px-5 py-2 text-white bg-[#01A49E] rounded-[10px] self-start">
                        our showreel
                    </button>
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {[
                    {
                        title: "100% authentic products",
                        desc: "Swoo Tech Mart just distribute 100% authorized products & guarantee quality. Nulla porta nulla nec orci vulputate, id rutrum sapien varius."
                    },
                    {
                        title: "fast delivery",
                        desc: "Fast shipping with a lot of delivery options. 100% guarantee that your goods are always on time and preserved in quality."
                    },
                    {
                        title: "affordable price",
                        desc: "We offer affordable & competitive prices with lots of special promotions."
                    }
                ].map((item, index) => (
                    <div key={index} className="rounded-[10px] bg-white p-6 md:p-8">
                        <div className="flex justify-between items-center font-bold mb-4">
                            <h1 className="max-w-[200px] uppercase text-sm md:text-base">{item.title}</h1>
                            <div className="w-[50px] md:w-[60px] h-[50px] md:h-[60px] rounded-full bg-[#01A49E]"></div>
                        </div>
                        <p className="text-[#666666] text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Mission Section */}
            <div className="border border-gray-200 mb-4 p-6 md:p-8">
                <h1 className="uppercase font-bold mb-3 text-[16px] md:text-[18px]">our mission and vision</h1>
                <p className="text-[13px] md:text-[14px] mb-4 leading-relaxed">
                    Nam maximus nunc a augue pulvinar, non euismod mauris tempus. Cras non elit vel magna molestie pellentesque in eu dui. Donec laoreet quis erat vitae finibus. Vestibulum enim eros, porta eget
                    quam et, euismod dictum elit. Nullam eu tempus magna. Fusce malesuada nisi id felis placerat porta vel sed augue. Vivamus mollis mauris vitae rhoncus egestas. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis egestas.
                </p>

                <div className="h-[220px] md:h-[400px] bg-[url('/aboutimg.png')] bg-cover bg-center rounded-[10px]"></div>
            </div>
        </section>
    );
}

export default AboutSection;
