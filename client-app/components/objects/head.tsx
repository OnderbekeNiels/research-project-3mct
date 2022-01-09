export function Head1({ children }: any) {
  return (
    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
      {children}
    </h1>
  );
}

export function Head2({ children }: any) {
  return (
    <h2 className="text-lg md:text-xl font-bold text-gray-800">{children}</h2>
  );
}

// export function Head3({ children }: any) {
//   return <h3 className="font-bold mb-2">{children}</h3>;
// }
