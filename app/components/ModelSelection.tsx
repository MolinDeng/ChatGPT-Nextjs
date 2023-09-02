'use client';
import useSWR from 'swr';
import React from 'react';
import Select from 'react-select';

const fetcher = async () =>
  await fetch('/api/model', { method: 'GET' }).then((res) => res.json());

type Props = {};

function ModelSelection({}: Props) {
  const { data: models, isLoading } = useSWR('models', fetcher);
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  });
  return (
    <div className="mt-2 ">
      <Select
        className="mt-2 react-select"
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

export default ModelSelection;
