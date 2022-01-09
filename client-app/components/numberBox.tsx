export interface numberBoxType{
    value: number,
    description: string,
    bgColor: string,
    textColor: string
}

export default function numberBox({ value, description, bgColor, textColor }: numberBoxType) {
  return (
    <div className={`p-2 w-14 min-h-[4.5rem] rounded-3xl h-full flex flex-col items-center justify-center text-${textColor} bg-${bgColor}`}>
      <p className="font-bold">{value}</p>
      <p className="text-xs font-thin">{description}</p>
    </div>
  );
}