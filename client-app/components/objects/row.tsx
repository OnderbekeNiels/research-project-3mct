export default function Row({ children, className }: any) {
  return (
    <section
      className={`peer peer:mt-4 peer:sm:mt-6 peer:md:mt-10 ${className}`}
    >
      {children}
    </section>
  );
}
