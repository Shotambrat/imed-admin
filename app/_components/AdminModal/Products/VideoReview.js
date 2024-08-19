"use client";
import { useState } from "react";

export default function VideoReview({
  setCreatedList,
  activeItem,
  setActiveItem,
  languages,
  activeLang,
  setActiveLang,
}) {
  const [showAll, setShowAll] = useState(false);

  const handleVideoChange = (index, key, value) => {
    const updatedVideos = activeItem.videos.map((video, i) =>
      i === index ? { ...video, [key]: value } : video
    );
    const updatedItem = { ...activeItem, videos: updatedVideos };
    setActiveItem(updatedItem);
    setCreatedList((prevList) =>
      prevList.map((item) => (item.id === activeItem.id ? updatedItem : item))
    );
  };

  const handleAddVideo = () => {
    const newVideo = { title: "", url: "" };
    const updatedItem = { ...activeItem, videos: [...activeItem.videos, newVideo] };
    setActiveItem(updatedItem);
    setCreatedList((prevList) =>
      prevList.map((item) => (item.id === activeItem.id ? updatedItem : item))
    );
  };

  const handleDeleteVideo = (index) => {
    const updatedVideos = activeItem.videos.filter((_, i) => i !== index);
    const updatedItem = { ...activeItem, videos: updatedVideos };
    setActiveItem(updatedItem);
    setCreatedList((prevList) =>
      prevList.map((item) => (item.id === activeItem.id ? updatedItem : item))
    );
  };

  const visibleVideos = showAll ? activeItem.videos : activeItem.videos.slice(0, 2);

  return (
    <section className="w-full max-w-[1440px] mx-auto flex flex-col gap-8 px-2">
      <h2 className="text-3xl max-mdx:text-2xl font-bold">ВИДЕООБЗОРЫ</h2>
      <div className="grid grid-cols-1 gap-4 mdx:grid-cols-2 xl:grid-cols-3">
        {visibleVideos.map((video, index) => (
          <div key={index} className="w-full">
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={video.url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <input
              type="text"
              className="mt-2 w-full p-2 border border-gray-300 rounded"
              value={video.title}
              onChange={(e) => handleVideoChange(index, "title", e.target.value)}
              placeholder="Название видео"
            />
            <input
              type="text"
              className="mt-2 w-full p-2 border border-gray-300 rounded"
              value={video.url}
              onChange={(e) => handleVideoChange(index, "url", e.target.value)}
              placeholder="URL видео"
            />
            <button
              onClick={() => handleDeleteVideo(index)}
              className="mt-2 text-red-500"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-[120px]">
        <button
          onClick={() => setShowAll(!showAll)}
          className="border text-[#252324] py-3 px-[55px] text-[14px] mdx:text-[16px] font-bold hover:text-[#fff] hover:bg-[#E94B50]"
        >
          {showAll ? "Скрыть" : "Загрузить всё"}
        </button>
        <button
          onClick={handleAddVideo}
          className="ml-4 border text-[#252324] py-3 px-[55px] text-[14px] mdx:text-[16px] font-bold hover:text-[#fff] hover:bg-[#E94B50]"
        >
          Добавить видео
        </button>
      </div>
    </section>
  );
}