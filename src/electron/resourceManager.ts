import * as si from "systeminformation";

export function pollResources() {
  setInterval(async () => {
    const usage = await getRamUsage();
    console.log(usage);
  }, 500);
}

async function getRamUsage() {
  const memory = await si.mem();
  return new Promise((resolve) => {
    resolve(memory.used / 1000000000);
  });
}
