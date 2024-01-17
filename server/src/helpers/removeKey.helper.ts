export function removeObjectKey<T, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> {
  const newObject = { ...obj }
  delete newObject[key]

  return newObject
}
