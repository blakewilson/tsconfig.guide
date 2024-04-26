import Editor from "@/components/editor";
import Header from "@/components/header";
import Options from "@/components/optionsPane";
import { OptionsProvider } from "@/store/options-context";

export default function Home() {
  return (
    <OptionsProvider>
      <Header />
      <main className="flex min-h-screen items-center justify-between p-24">
        <div className="w-1/2">
          <Options />
        </div>
        <div className="w-1/2">
          <Editor />
        </div>
      </main>
    </OptionsProvider>
  );
}
