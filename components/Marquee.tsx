type MarqueeProps = {
  text?: string;
  bgColor?: string;
  textColor?: string;
  reverse?: boolean;
};

export default function Marquee({
  text = "LETTER STORE ★ NEW DROP ★ NEW NYC ★ RICHMOND VA ★ ",
  bgColor = "bg-fti-acid",
  textColor = "text-black",
  reverse = false,
}: MarqueeProps) {
  const repeated = text.repeat(10);

  return (
    <div className={`overflow-hidden ${bgColor} py-3.5 select-none`}>
      <div
        className={`flex whitespace-nowrap animate-marquee ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
        style={{ willChange: "transform" }}
      >
        <span
          className={`font-display text-2xl tracking-[0.06em] ${textColor} shrink-0 font-bold`}
        >
          {repeated}
        </span>
        <span
          className={`font-display text-2xl tracking-[0.06em] ${textColor} shrink-0 font-bold`}
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
