import { Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import Markdown from "react-markdown";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibili Style",
    "Anime Style",
    "Cartoon style",
    "Fantasy Style",
    "Realistic Style",
    "3D Style",
    "Portrait Style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
    setLoading(false);
  };
  return (
    <div
      className="h-full overflow-y-scroll p-6 flex  flex-row
    items-start gap-4 text-slate-700"
    >
      {/*Left coloumn */}
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="flex-1 p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm
        rounded-md border border-gray-300 "
          placeholder="Describe your the type of image you want.."
          required
        />
        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {imageStyle.map((item, index) => (
            <span
              onClick={() => setSelectedStyle(item)}
              key={item}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer 
                ${
                  selectedStyle === item
                    ? "bg-green-50 text-green-700"
                    : "text-gray-500 border-gray-300 "
                }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div
              className="w-9 h-5 bg-slate-300 rounded-full 
            peer-checked:bg-green-500 transition"
            ></div>
            <span
              className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full
            transition peer-checked:translate-x-4"
            ></span>
          </label>
          <p className="text-sm">Make this image Public</p>
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2
        bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4
        py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span
              className="w-4 h-4 my-1 rounded-full border-2 
          border-t-transparent animate-spin"
            ></span>
          ) : (
            <Image className="w-5" />
          )}
          Generate Image
        </button>
      </form>
      {/*Right coloumn */}
      <div
        className="flex-1 p-4 bg-white rounded-lg flex flex-col border 
  border-gray-200 min-h-96 max-h-[600px]"
      >
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">Generated image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div
              className="text-sm flex flex-col items-center gap-5
          text-gray-400"
            >
              <Image className="w-9 h-9" />
              <p>Enter a topic and click "Generate image" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full">
            <img src={content} alt="image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
