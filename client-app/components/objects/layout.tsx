import Header from "./header";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="grid h-screen grid-rows-[auto_1fr] bg-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto w-full">{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
}
