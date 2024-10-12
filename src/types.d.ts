type ElementOf<Type extends readonly any[]> = // eslint-disable-line
  Type extends readonly (infer Values)[] ? Values : never;

type StrictExtract<Type, Union extends Partial<Type>> = Extract<Type, Union>;
