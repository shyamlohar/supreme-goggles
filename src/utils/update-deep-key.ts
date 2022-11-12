const updateDeepKey = (keyDepth: number, nestedKey: string, keyToUpdate: string, obj: Record<string, any>, updatedvalue: string) => {
  let newObj = JSON.parse(JSON.stringify(obj));
  if (keyDepth === 0) {
    newObj[keyToUpdate] = updatedvalue
    return newObj
  }
  let currentReference = newObj;
  for(let i = 0; i <= keyDepth; i++) {
    if (i === keyDepth) {
        console.log(i)
        currentReference[keyToUpdate] = updatedvalue
        console.log(newObj)
        return newObj
    } else {
        currentReference = currentReference[nestedKey]
    }
  }
}

export default updateDeepKey
