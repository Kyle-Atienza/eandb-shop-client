"use client";

import { ProductCard } from "@/components/products/card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ProductSuggestedItems({
  items,
}: {
  items: ProductListingItem[];
}) {
  const container = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);
  const card4 = useRef(null);

  const animateCard = (className: string, startX: number, startY: number) => {
    gsap.set(className, {
      yPercent: startY,
      xPercent: startX,
    });
    gsap.to(className, {
      yPercent: 0,
      xPercent: 0,
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: ".recommended",
        start: "top 80%",
      },
    });
  };

  useGSAP(
    () => {
      /* animateCard(".card-1", -15, 100);
      animateCard(".card-2", 8, 100);
      animateCard(".card-3", -12, 100);
      animateCard(".card-4", 18, 100); */
    },
    { scope: container }
  );

  const marqueeContainer = useRef(null);

  useGSAP(
    () => {
      gsap.to(".marquee-item", {
        xPercent: 100,
        repeat: -1,
        duration: 4,
        ease: "linear",
      });
    },
    { scope: marqueeContainer }
  );

  return (
    <>
      <div ref={container} className=" flex flex-col border-light border-t-2">
        <div className="recommended spaced grid grid-cols-2 lg:grid-cols-4 gap-spaced">
          <div className="*:!h-full">
            <ProductCard product={items[0]} />
          </div>
          <div className="*:!h-full">
            <ProductCard product={items[1]} />
          </div>
          <div className="*:!h-full">
            <ProductCard product={items[2]} />
          </div>
          <div className="*:!h-full">
            <ProductCard product={items[3]} />
          </div>
        </div>
        <div
          ref={marqueeContainer}
          className="bg-light spaced-y-sm border-y-2 border-tertiary w-screen"
        >
          <div className="flex justify-center overflow-hidden">
            {Array.from(Array(15).keys()).map((key) => {
              return (
                <div
                  key={key}
                  className="marquee-item flex gap-spaced spaced-r items-center"
                >
                  <div className="whitespace-nowrap font-merchant uppercase text-2xl tracking-widest">
                    Try Some of these{" "}
                  </div>
                  <i className="bi bi-arrow-up" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
