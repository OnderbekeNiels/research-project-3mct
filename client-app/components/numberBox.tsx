export interface NumberBoxArgs{
    value: number,
    description: string,
    bgColor: string,
    textColor: string,
    fullSquare?: boolean
}

export default function NumberBox({ value, description, bgColor, textColor, fullSquare=false }: NumberBoxArgs) {
  return (
    <div
      className={`p-2 rounded-3xl flex flex-col items-center justify-center ${textColor} ${bgColor} ${
        fullSquare ? "aspect-square" : "w-14 min-h-[4.5rem] h-full"
      }`}
    >
      <p className="font-bold">{value}</p>
      <p className="text-xs font-thin">{description}</p>
    </div>
  );
}