import Header from "./header";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="bg-gray-100 relative top-0 selection:bg-orange-600 selection:text-white">
        <Header />
        <main className="max-w-4xl mx-auto w-full min-h-[calc(100vh-5rem)] relative top-[5rem] pb-6 overflow-y-auto">{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
}
