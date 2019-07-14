export type KeyOfFilteredByType<T, KT> = keyof Pick<
  T,
  { [X in keyof T]: T[X] extends KT ? X : never }[keyof T]
>;
