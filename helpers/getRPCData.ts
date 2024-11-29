export const getRPCData = async (rpcs: string[]) => {
  try {
    for (let i = 0; i < rpcs.length; i++) {
    const startTime = performance.now();
      const response = await fetch(rpcs[i]);
        const endTime = performance.now();
      const data = await response.json();
      if (data) {
        return {data, time: endTime - startTime, rpc: rpcs[i]};
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
