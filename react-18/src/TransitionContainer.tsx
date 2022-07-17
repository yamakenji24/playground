import React, {
  ChangeEvent,
  useCallback,
  useState,
  useTransition,
} from "react";

const filterData = (filterWord: string) => {
  if (!filterWord) {
    return dummyData;
  }

  return dummyData.filter((data) => data.includes(filterWord));
};

export const TransitionContainer = () => {
  const [input, setInput] = useState("");
  const [filterWord, setFilterWord] = useState("");
  const [, startTransition] = useTransition();

  const filteredDataList = filterData(filterWord);

  const handleFilterWorldOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(input);
    startTransition(() => {
      setFilterWord(e.target.value);
    });
  };

  return (
    <div>
      <div>
        <h2>useTransition</h2>
        <input
          type="text"
          onChange={handleFilterWorldOnChange}
        />
      </div>
      <DataList dataList={filteredDataList} />
    </div>
  );
};

const DataList = ({ dataList }: { dataList: string[] }) => {
  return (
    <div>
      {dataList.map((value) => (
        <p key={value}>{value}</p>
      ))}
    </div>
  );
};

const generateData = (): string[] =>
  [...Array(1000)].map((_, i) => `Data ${i}`);
const dummyData = generateData();
