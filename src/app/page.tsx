import Editor from "@/components/editor";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Options from "@/components/optionsPane";
import { OptionsProvider } from "@/store/options-context";

export default function Home() {
  return (
    <OptionsProvider>
      <div className="flex flex-col min-h-screen ">
        <Header />
        <main className="flex flex-col lg:flex-row lg:flex-grow lg:items-center lg:justify-center lg:overflow-hidden">
          <div className="w-full lg:w-1/2 lg:m-auto p-6 lg:p-12 lg:overflow-y-auto">
            <div className="w-full mx-auto max-w-4xl">
              <Options />
              <Footer />
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-6 lg:overflow-hidden lg:p-0 lg:max-h-5/6 relative lg:-right-12">
            <Editor />
          </div>
        </main>
      </div>
    </OptionsProvider>
  );
}
