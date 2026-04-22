'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

function PriceFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [price, setPrice] = useState([100, 1000]);

    // Query update karne ka function
    const updateQuery = (min, max) => {
        const params = new URLSearchParams();
        params.set("min", min);
        params.set("max", max);
        router.push(`?${params.toString()}`);
    };

    // Slider change handle
    const priceHandle = (data) => {
        setPrice(data);
        updateQuery(data[0], data[1]);
    };

    // "GO" button par query update
    const applyPriceFilter = () => {
        updateQuery(price[0], price[1]);
    };

    // Jab URL query change ho to price state update ho
    useEffect(() => {
        const min = searchParams.get('min');
        const max = searchParams.get('max');
        if (min && max) {
            setPrice([+min, +max]);
        }
    }, [searchParams]);

    return (
        <div className="mb-2 border-b border-gray-300 pb-5">
            <h3 className="mb-3 font-bold text-[14px] md:text-[16px]">By Price</h3>

            <div className="flex items-center mb-4">
                <RangeSlider
                    value={price}
                    onInput={priceHandle}
                    min={10}
                    max={462003}
                />
            </div>

            <div className="flex items-center justify-between gap-x-2">
                <input
                    value={price[0]}
                    onChange={(e) => setPrice([+e.target.value, price[1]])}
                    className="py-2 px-2 bg-white rounded-[5px] min-w-[50px] outline-0 font-bold text-[12px]"
                    placeholder="0"
                />
                <div>-</div>
                <input
                    value={price[1]}
                    onChange={(e) => setPrice([price[0], +e.target.value])}
                    className="py-2 px-2 bg-white rounded-[5px] w-[80px] md:w-[100px] outline-0 font-bold text-[12px]"
                    placeholder="1000"
                />
                <div
                    className="bg-[#1ABA1A] py-2 px-3 rounded-[5px] text-white text-[12px] cursor-pointer"
                    onClick={applyPriceFilter}
                >
                    GO
                </div>
            </div>
        </div>
    );
}

export default PriceFilter;
