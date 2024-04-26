import Editor from "@/components/editor";
import Header from "@/components/header";
import Options from "@/components/optionsPane";
import { OptionsProvider } from "@/store/options-context";

export default function Home() {
  return (
    <OptionsProvider>
      <Header />
      <main className="flex h-screen overflow-hidden items-center justify-between ">
        <div className="w-1/2 p-12">
          <Options />
        </div>
        <div className="w-1/2 relative -right-12">
          <Editor />
        </div>
      </main>
    </OptionsProvider>
  );
}
