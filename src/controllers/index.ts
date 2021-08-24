const {
  app,
  Menu,
  Tray
} = require('electron')

import { getObjects } from '../models/utils';
import * as si from '../models/si';

const _buildMenu = async () => {
  const cpuInformation = await si.cpu()
  const gpuInformation = getObjects(await si.gpu())
  const memoryInformation = await si.memory();
  const diskInformation = getObjects(await si.disk());

  const cpu = [
    {
      label: 'CPU',
    },
    {
      type: 'separator'
    },
    ...cpuInformation,
    {
      type: 'separator'
    },
  ]

  const gpu = [
    {
      label: 'GPU',
    },
    {
      type: 'separator'
    },
    ...gpuInformation,
    {
      type: 'separator'
    },
  ]

  const memory = [
    {
      label: 'Memory',
    },
    {
      type: 'separator'
    },
    ...memoryInformation,
    {
      type: 'separator'
    },
  ]

  const disk = [
    {
      label: 'Disk',
    },
    {
      type: 'separator'
    },
    ...diskInformation,
    {
      type: 'separator'
    },
  ]

  const exit = [{
    label: 'Exit',
    click() {
      app.quit()
    }
  }]

  return [
    ...cpu,
    ...gpu,
    ...memory,
    ...disk,
    ...exit
  ]
}

export const controller = async () => {
  try {
    let appIcon:any = null
      app.whenReady().then(async () => {
        appIcon = new Tray('./icons/temperature.png')

        setInterval(async ()=>{
          const contextMenu = Menu.buildFromTemplate(await _buildMenu());
          appIcon.setContextMenu(contextMenu);
        }, 2000)
      })
  } catch (e) {
    console.log(e)
  }
}
