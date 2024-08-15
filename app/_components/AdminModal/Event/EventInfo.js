import EventsSignUp from "./EventsSignUp";
import AboutEvent from "./AboutEvent";
import MoreInfo from "./MoreInfo";

export default function Page({
  setCreatedList,
  activeId,
  createdList,
  activeItem,
  activeLang,
  setActiveLang,
  languages,
}) {
  return (
    <div>
      <div className="flex gap-4">
        {languages.map((lang, index) => (
          <button
            key={index}
            className={`font-medium border px-4 pt-1 pb-2 rounded-lg text-xl border-red-300 ${
              lang === activeLang ? "bg-redMain text-white" : ""
            }`}
            onClick={() => setActiveLang(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      <EventsSignUp
        setCreatedList={setCreatedList}
        activeId={activeId}
        activeItem={activeItem}
        createdList={createdList}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        languages={languages}
      />
      <AboutEvent
        setCreatedList={setCreatedList}
        activeId={activeId}
        activeItem={activeItem}
        createdList={createdList}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        languages={languages}
      />
      <MoreInfo
        setCreatedList={setCreatedList}
        activeId={activeId}
        activeItem={activeItem}
        createdList={createdList}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        languages={languages}
      />
    </div>
  );
}
