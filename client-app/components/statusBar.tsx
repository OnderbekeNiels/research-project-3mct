export interface StatusBarArgs {
  level: string;
  message: string;
}

export default function StatusBar({ level, message }: StatusBarArgs) {
  return (
    <div
      className={`p-2 ${level === "error" && "bg-red-200 text-red-900"} ${
        level === "ok" && "bg-green-200 text-green-900"
      } rounded-md mb-4`}
    >
      <p className="font-semibold text-sm">{message}</p>
    </div>
  );
}
