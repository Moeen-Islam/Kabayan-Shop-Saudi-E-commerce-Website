import { useEffect, useRef, useState } from "react";
import { fetchAreas } from "../lib/api";

const AreaAutocomplete = ({ value, onChange }) => {
  const [query, setQuery] = useState(value || "");
  const [areas, setAreas] = useState([]);
  const [show, setShow] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const result = await fetchAreas(query);
        setAreas(result || []);
      } catch (error) {
        console.error("Failed to load areas:", error);
        setAreas([]);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative z-[999]">
      {/* Hidden fake input to reduce browser autofill */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="username"
        className="hidden"
      />

      <input
        type="text"
        name="kabayan_custom_area_search"
        autoComplete="new-password"
        spellCheck={false}
        value={query}
        onFocus={() => setShow(true)}
        onChange={(e) => {
          const nextValue = e.target.value;
          setQuery(nextValue);
          onChange(nextValue);
          setShow(true);
        }}
        placeholder="Type your area"
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
      />

      {show && query.trim() !== "" && areas.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          {areas.map((area) => (
            <button
              key={area.documentId || area.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setQuery(area.name);
                onChange(area.name);
                setShow(false);
              }}
              className="block w-full px-4 py-3 text-left text-sm text-black transition hover:bg-gray-50"
            >
              {area.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AreaAutocomplete;