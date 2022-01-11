export interface NumberBoxArgs{
    value: number,
    description: string,
    bgColor: string,
    textColor: string,
    size?: string,
    fullSquare?: boolean
}

export default function NumberBox({ value, description, bgColor, textColor, fullSquare=false, size="sm" }: NumberBoxArgs) {
  return (
    <div
      className={`p-2 rounded-3xl flex flex-col items-center justify-center ${
        size === "sm" && "text-base"
      } ${size === "md" && "text-lg"}  ${textColor} ${bgColor} ${
        fullSquare ? "aspect-square" : "w-14 min-h-[4.5rem] h-full"
      }`}
    >
      <p className="font-bold">{value}</p>
      <p
        className={`${size === "sm" && "text-xs"} ${
          size === "md" && "text-base"
        } font-thin`}
      >
        {description}
      </p>
    </div>
  );
}