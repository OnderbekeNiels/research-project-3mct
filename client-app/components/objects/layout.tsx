import Header from "./header";

export default function Layout({ children }: any) {
  return (
    <>
        <Header />
        <main className="max-w-4xl mx-auto w-full relative top-[5rem] pb-10">{children}</main>
    </>
  );
}
