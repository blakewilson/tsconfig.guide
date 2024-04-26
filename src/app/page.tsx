import Editor from "@/components/editor";
import Header from "@/components/header";
import Options from "@/components/optionsPane";
import { OptionsProvider } from "@/store/options-context";

export default function Home() {
  return (
    <OptionsProvider>
      <Header />
      <main className="flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden lg:items-center lg:justify-between ">
        <div className="w-full lg:w-1/2 p-12 flex items-center justify-center">
          <div className="w-full lg:max-w-4xl">
            <Options />
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-12 lg:p-0 max-h-auto lg:max-h-5/6 lg:justify-center relative overflow-hidden lg:-right-12">
          <Editor />
        </div>
      </main>
    </OptionsProvider>
  );
}
