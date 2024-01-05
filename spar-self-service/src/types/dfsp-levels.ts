export type FormLevel = {
  id: number;
  name: string;
  code: string;
  level: number;
  next_level_id?: number;
  options?: FormLevelValue[];
};

export type FormLevelValue = {
  id: number;
  name: string;
  code: string;
  level_id: number;
  next_level_id?: number;
};

export type KeyValue = {
  key: string;
  value: string;
};
