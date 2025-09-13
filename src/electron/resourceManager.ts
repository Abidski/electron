import * as si from "systeminformation";
import fs from "fs";

const BYTE_TO_GIGABYTE = 1_000_000_000;

export function pollResources() {
  setInterval(async () => {
    const ram = await getRamUsage();
    const cpu = await getCpuUsage();
    const storage = getStorageData();
    console.log({ ram, cpu, storage });
  }, 500);
}

export async function getStaticData() {
  const storage = getStorageData().total;
  const cpuModel = (await si.cpu()).model;
  const totalMemory = (await si.mem()).total;
  return { storage, cpuModel, totalMemory };
}

async function getRamUsage() {
  const memory = await si.mem();
  return new Promise((resolve) => {
    resolve(memory.used / BYTE_TO_GIGABYTE);
  });
}

async function getCpuUsage() {
  const cpu = await si.cpuCurrentSpeed();
  return new Promise((resolve) => {
    resolve(cpu.avg);
  });
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform == "win32" ? "C://" : "/");
  const total = stats.blocks * stats.bsize;
  const free = stats.bsize * stats.bfree;
  return {
    total: Math.floor(total / BYTE_TO_GIGABYTE),
    usage: 1 - free / total,
  };
}
