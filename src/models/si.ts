import si from 'systeminformation';

import * as nvme from "./nvme";
import * as utils from "./utils";

export const cpu = async () => {
  const cpuInformation = await si.cpu()
  const osInformation = await si.currentLoad();
  const cpu = await si.cpuTemperature()

  return [
    {
      label: `Name: ${cpuInformation.brand}`,
    },
    {
      label: `Temperature: ${cpu.main}°C`,
    },
    {
      label: `Load: ${Math.round(osInformation.currentLoad)}%`
    },
    {
      label: `Idle: ${Math.round(osInformation.currentLoadIdle)}%`
    }
  ]
}

export const gpu = async () => {
  const gpuInformation = await si.graphics();
  const mappedValues = await Promise.all(gpuInformation.controllers.map(async (item) => [{
    label: `Name: ${item.name}`,
  },
  {
    label: `Temperature: ${item.temperatureGpu}°C`,
  },
  {
    label: `Clock core: ${item.clockCore}MHz`
  },
  {
    label: `Clock memory: ${item.clockMemory}MHz`
  },
  {
    label: `Power draw: ${item.powerDraw}W`
  },
  {
    label: `Memory used: ${Math.round(((item.memoryUsed ?? 1) / (item.memoryTotal ?? 1)) * 100)}% (Total memory: ${item.memoryTotal} MB)`
  }]))

  return mappedValues;
}

export const memory = async () => {
  const memInformation = await si.mem()

  return [
    {
      label: `Total: ${utils.formatBytes(memInformation.total)}`,
    },
    {
      label: `Used: ${Math.round((memInformation.used / memInformation.total) * 100)}%`,
    }
  ]
}

export const disk = async () => {
  const diskInformation = await si.diskLayout()
  const mappedValues = await Promise.all(diskInformation.map(async (item) => [{
    label: `Name: ${item.name} (${item.type})`
  }, {
    label: `Temperature: ${await nvme.getTemperature(item.device)}°C`
  }]))

  return mappedValues
}
