import Header from "./header";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="bg-gray-100 relative top-0">
        <Header />
        <main className="max-w-4xl mx-auto w-full min-h-screen relative top-[80px]">{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
}
