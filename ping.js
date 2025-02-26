import axios from "axios";
import ping from "ping";
import fs from "fs";
import { config } from "./config.js";

console.log("Config (could be modified in config.js): ", config);
console.log("Receiving official CS2 servers list...");
const officialServersData = await axios.get(
  `https://api.steampowered.com/ISteamApps/GetSDRConfig/v1/?appid=730`
);

const pingPromises = [];
const allServers = [];
const serversToKeep = [];
let serverIpsToBan = "";

for (const city of Object.values(officialServersData.data.pops)) {
  for (const relay of city.relays || []) {
    pingPromises.push(
      new Promise((resolve, reject) => {
        ping.promise
          .probe(relay.ipv4, {
            timeout: config.pingTimeout,
            extra: ["/n", `${config.pingRetries}`],
          })
          .then((pingData) => {
            allServers.push({
              ip: relay.ipv4,
              city: city.desc,
              ping: pingData.time || 1000,
            });
            resolve();
          });
      })
    );
  }
}

console.log("Pinging official CS2 servers...");
Promise.all(pingPromises).then(() => {
  allServers.forEach((server) => {
    if (server.ping > config.maxPing || server.ping === "unknown") {
      serverIpsToBan += `${server.ip}\n`;
    } else {
      serversToKeep.push(server);
    }
  });

  if (serversToKeep.length) {
    console.log(`Good servers (ping < ${config.maxPing}): `, serversToKeep);
  } else {
    console.log(`ERROR! No servers found with acceptable ping (${config.maxPing}). Please, change config or reduce network load and retry.`)
    process.exit(1);
  }

  fs.writeFile("servers_to_ban.txt", serverIpsToBan, (err) => {
    if (err) throw err;
    console.log(
      "All other (bad) server IP's are prepared and saved to file servers_to_ban.txt."
    );
  });
});
