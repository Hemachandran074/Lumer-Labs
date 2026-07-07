import type { NextConfig } from "next";
import os from "os";

// Programmatically retrieve all active local network interface IPs
const getLocalDevOrigins = () => {
  const interfaces = os.networkInterfaces();
  const origins = ["localhost", "localhost:3000", "127.0.0.1", "127.0.0.1:3000"];
  
  for (const interfaceName of Object.keys(interfaces)) {
    const netInterface = interfaces[interfaceName];
    if (netInterface) {
      for (const net of netInterface) {
        // We only care about IPv4 addresses that are not loopback/internal
        if (net.family === "IPv4" && !net.internal) {
          origins.push(net.address);
          origins.push(`${net.address}:3000`);
        }
      }
    }
  }
  return origins;
};

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: getLocalDevOrigins(),
};

export default nextConfig;
