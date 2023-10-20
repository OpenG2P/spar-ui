export type FormLevel = {
  id: number;
  name: string;
  displayName: string;
  isTextField: boolean;
  options: {
    id: number;
    nextLevelId: number;
    name: string;
    displayName: string;
  }[];
};

export type FormLevelValueResponse = {
  levelValues: {
    id: number;
    name: string;
    code: string;
    level: {
      id: number;
      name: string;
      code: string;
      level: number;
    };
    next_level: {
      id: number;
      name: string;
      code: string;
      level: number;
    };
  }[];
};
