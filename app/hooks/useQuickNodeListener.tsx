"use client";
import { useEffect } from 'react';
import { Core } from "@quicknode/sdk";
import { useLocalCollections } from "@/app/hooks/useLocalCollections";
import { notifications } from '@mantine/notifications';
import { ethers } from 'ethers';
const marketJSON = require("../lib/client-services/marketplaceContract/abi.json");
const collectionFactoryJSON = require("../lib/client-services/collectionFactoryContract/abi.json");
const pingJSON = require("../lib/client-services/pingContract/abi.json");

require("dotenv").config();

const avalanacheFujiCore = new Core({
  endpointUrl: "https://patient-late-frost.avalanche-testnet.quiknode.pro/af4ff48c50b08a7fd7f9d595b6ea6c677ae1394b/ext/bc/C/rpc/"
});

// const polygonAmoyCore = new Core({
//   endpointUrl: 'https://green-lively-isle.matic-amoy.quiknode.pro/e4f9eb77b0f4d85f8bd86b1f9a13e0f7a2d3e16e/',
// })

export function useQuickNodeListener() {
    const marketInterface = new ethers.Interface(marketJSON.abi);
    const collectionFactoryInterface = new ethers.Interface(collectionFactoryJSON.abi);
    const pingInterface = new ethers.Interface(pingJSON.abi);
    const { updateCollectionAddress } = useLocalCollections();

    // Watchers
    useEffect(() => {
        let listeners: any = [];
        async function startListeners() {
            // fuji marketplace
            listeners.push(await avalanacheFujiCore.client.watchEvent({
                address: '0xb65eFBCb305f8c5Fb13ec3A7c2b1658046E8290d',
                onLogs: (logs) => logs.forEach(log => {
                  try {
                    const decodedLog = marketInterface.parseLog(log);
                    if(decodedLog) {
                      if (decodedLog.name === 'ListingBoughtLog') {
                        notifications.show({
                          autoClose: false,
                          title: `Buying of product with id ${decodedLog?.args[1]} was successful`,
                          message: `🎁 ${decodedLog?.args[2]} products of id ${decodedLog?.args[1]} were bought by ${decodedLog.args[3]} from collection number ${decodedLog.args[0]}`,
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
              }));
              // fuji factory
            listeners.push(await avalanacheFujiCore.client.watchEvent({
                address: '0x43871555C9291B89E8B3906285047eA59Eb39A92',
                onLogs: (logs) => logs.forEach(log => {
                  try {
                    const decodedLog = collectionFactoryInterface.parseLog(log);
                    console.log('Decoded log:', decodedLog);
                    if (decodedLog) {
                      if (decodedLog.name === 'CollectionDeployedLog') {
                        updateCollectionAddress(decodedLog?.args[2], decodedLog?.args[0]);
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
              }));
               // fuji ping
            listeners.push(await avalanacheFujiCore.client.watchEvent({
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
              }));
          }
          startListeners();
          return () => {
                listeners.forEach((l: any) => {
                  l();
                });
            }
    },[]);
}