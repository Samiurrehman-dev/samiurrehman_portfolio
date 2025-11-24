import Header from "../components/Header";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <h1 className="font-serif font-bold text-5xl md:text-6xl text-[#151515]">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-[#8490A3] max-w-2xl">
              {description}
            </p>
          )}
          <div className="pt-6">
            <p className="text-sm text-[#A2ABBB]">
              This page is coming soon. Please continue prompting to add content here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
