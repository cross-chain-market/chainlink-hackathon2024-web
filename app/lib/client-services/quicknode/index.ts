import { Core } from "@quicknode/sdk";

const core = new Core({
  endpointUrl:
    "https://patient-late-frost.avalanche-testnet.quiknode.pro/af4ff48c50b08a7fd7f9d595b6ea6c677ae1394b/ext/bc/C/rpc/",
});

export async function watchEvents() {
  const watchMarket = await core.client.watchEvent({
    address: "0x33D0555cCeaA36fcCDb3Ddc33243538A6FB8C02F",
    onLogs: (logs) => console.log(logs),
  });

  const watchCollectionFactory = await core.client.watchEvent({
    address: "0x1291418b00a8986EaBA8a9b124Dc0D8037A17674",
    onLogs: (logs) => console.log(logs),
  });

  return [watchMarket, watchCollectionFactory];
}
