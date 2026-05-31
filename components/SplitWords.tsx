import { ElementType, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  text: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Splits text into per-word spans inside an overflow-hidden mask so GSAP
 * can sweep each word up cleanly. Inner spans carry `data-split-word`.
 */
export default function SplitWords({
  text,
  className,
  wordClassName,
  as: Tag = "span",
  ...rest
}: Props) {
  const Component = Tag as ElementType;
  const words = text.split(" ");
  return (
    <Component className={className} {...rest}>
      {words.map((w, i) => (
        <span key={i} className="word-mask">
          <span
            data-split-word
            className={`word-inner ${wordClassName ?? ""}`}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Component>
  );
}
