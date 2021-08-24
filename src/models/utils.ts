export const formatBytes = (a: any, b = 2) => {
  if (0 === a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}

export const getObjects = (data: any):any[] => {
  const result:any[] = []
  data.forEach((element:any) => {
    element.forEach((object:any) => {
      result.push(object)
    });
  });

  return result;
}
