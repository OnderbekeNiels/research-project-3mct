export function Head1({ children, className }: any) {
  return (
    <h1 className={`text-xl md:text-2xl font-bold text-gray-800 mb-4 ${className}`}>
      {children}
    </h1>
  );
}

export function Head2({ children }: any) {
  return (
    <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{children}</h2>
  );
}

export function Head3({ children }: any) {
  return (
    <h3 className="text-md md:text-lg font-semibold text-gray-800">
      {children}
    </h3>
  );
}
