"use client";

import { Core } from "@quicknode/sdk";
import { notifications } from '@mantine/notifications';
import { ethers } from 'ethers';
const marketJSON = require("../marketplaceContract/abi.json");
const collectionFactoryJSON = require("../collectionFactoryContract/abi.json");
const pingJSON = require("../pingContract/abi.json");

require("dotenv").config();

const avalanacheFujiCore = new Core({
  endpointUrl: "https://patient-late-frost.avalanche-testnet.quiknode.pro/af4ff48c50b08a7fd7f9d595b6ea6c677ae1394b/ext/bc/C/rpc/"
});

export async function watchEvents() {
  const marketInterface = new ethers.Interface(marketJSON.abi);
  const collectionFactoryInterface = new ethers.Interface(collectionFactoryJSON.abi);
  const pingInterface = new ethers.Interface(pingJSON.abi);

  const watchMarket = await avalanacheFujiCore.client.watchEvent({
    address: '0xb65eFBCb305f8c5Fb13ec3A7c2b1658046E8290d',
    onLogs: (logs) => logs.forEach(log => {
      try {
        const decodedLog = marketInterface.parseLog(log);
        console.log('Decoded log:', decodedLog);
      } catch (error) {
        console.error('Error decoding log:', error);
      }
    })
  });

  const watchCollectionFactory = await avalanacheFujiCore.client.watchEvent({
    address: '0x43871555C9291B89E8B3906285047eA59Eb39A92',
    onLogs: (logs) => logs.forEach(log => {
      try {
        const decodedLog = collectionFactoryInterface.parseLog(log);
        console.log('Decoded log:', decodedLog);
        if (decodedLog) {
          if (decodedLog.name === 'CollectionDeployedLog') {
            notifications.show({
              autoClose: false,
              title: `Created Collection ${decodedLog?.args[2]}`,
              message: `🚀 Collection ${decodedLog?.args[0]} was created by - ${decodedLog.args[1]}`,
            });
          } else {
            notifications.show({
              autoClose: false,
              title: decodedLog.name,
              message: `${decodedLog.name} was emited`,
            });
          }
        }
      } catch (error) {
        console.error('Error decoding log:', error);
      }
    })
  });

  const watchPing = await avalanacheFujiCore.client.watchEvent({
    address: '0x8bBf2972738098d7597fD22D64f22f56CC619A05',
    onLogs: (logs) => logs.forEach(log => {
      try {
        const decodedLog = pingInterface.parseLog(log);
        console.log('Decoded log:', decodedLog);
        if (decodedLog) {
          notifications.show({
            autoClose: false,
            title: decodedLog.name,
            message: `${decodedLog?.args[1]} was sent by ${decodedLog.args[0]}`,
          });
        }
      } catch (error) {
        console.error('Error decoding log:', error);
      }
    })
  });

  return [watchMarket, watchCollectionFactory, watchPing];
}
