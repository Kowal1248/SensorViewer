import child_process from "child_process";

const _generateRaport = (diskPath:string) => {
  const exec = child_process.execSync;
  const output = exec(`sudo nvme smart-log ${diskPath}`);

  return output.toString('utf8');
}

export const getTemperature = async (diskPath:string) => {
  const raportFile = await _generateRaport(diskPath);
  const foundTemperature = raportFile.split('\n').find((item: any) => item.includes('temperature'));

  return foundTemperature?.replace(/^\D+/g, "").replace(' C',"");
}
