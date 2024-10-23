"use client";
import { Flex, Box, TextField } from "@radix-ui/themes";
import data from "../data/voices.json";
import { useEffect } from "react";
import { ZoomInIcon } from "@radix-ui/react-icons";

function searchVoices(voices: Voice[], searchString: string): Voice[] {
  if (searchString.length < 2) {
    return [];
  }

  searchString = searchString.toLowerCase();

  console.log(searchString);

  const filteredVoices = voices.filter(
    (voice) =>
      voice.LocaleName.toLowerCase().includes(searchString) ||
      voice.Locale.toLowerCase().includes(searchString)
  );

  console.log(filteredVoices);

  return filteredVoices;
}

function Search({
  allItems,
  update,
}: {
  allItems: Voice[];
  update: (items: Voice[]) => void;
}) {
  function handleSearch(arr: Voice[], input: string) {
    const result = searchVoices(arr, input);
    if (result) {
      update(result);
    }
  }

  function onChange(e: any) {
    if (e.target.value.length > 1 && e.target.value.length < 10) {
      handleSearch(allItems, e.target.value);
    }
  }

  return (
    <div className="flex items-center py-2">
      <div className="mr-2">
        <ZoomInIcon />
      </div>
      <Box maxWidth="300px">
        <TextField.Root size="3" placeholder="Lang" onChange={onChange} />
      </Box>
    </div>
  );
}

export default Search;
