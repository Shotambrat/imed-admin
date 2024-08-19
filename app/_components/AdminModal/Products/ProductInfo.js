import ProductPreview from "./ProductPreview";
import ProductCharacteristics from "./ProductCharacteristics";
import Reviews from "./Reviews";
import VideoReview from "./VideoReview";

export default function ProductInfo({
  setCreatedList,
  activeItem,
  setActiveItem,
  languages,
  activeLang,
  setActiveLang,
}) {
  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-16 px-2">
      <div className="flex gap-4 mb-4">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={`px-4 py-2 text-sm font-semibold ${
              activeLang === lang ? "bg-redMain text-white" : "bg-white"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      <ProductPreview
        setCreatedList={setCreatedList}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        languages={languages}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
      />
      <ProductCharacteristics
        setCreatedList={setCreatedList}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        languages={languages}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
      />
      <VideoReview
        setCreatedList={setCreatedList}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        languages={languages}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
      />
      <Reviews
        setCreatedList={setCreatedList}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        languages={languages}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
      />
    </div>
  );
}
