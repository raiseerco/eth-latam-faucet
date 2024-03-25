/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useZuAuth } from "zuauth";
import { Footer } from "~~/components/Footer";
// eslint-disable-next-line prettier/prettier
import { MetaHeader } from "~~/components/MetaHeader";
import { notification } from "~~/utils/scaffold-eth";
import { VALID_EVENT_IDS } from "~~/utils/zupassConstants";

// Get a valid event id from { supportedEvents } from "zuauth" or https://api.zupass.org/issue/known-ticket-types
const validEventIds = VALID_EVENT_IDS;
const fieldsToReveal = {
  revealAttendeeEmail: true,
  revealEventId: true,
  revealIsConsumed: true,
  revealAttendeeSemaphoreId: true,
};

const Home: NextPage = () => {
  // const [verifiedBackend, setVerifiedBackend] = useState(false);
  const { authenticate, pcd } = useZuAuth();
  const { address: connectedAddress } = useAccount();

  const getProof = useCallback(async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }
    authenticate(
      fieldsToReveal,
      connectedAddress,
      "",
      validEventIds,
      [],
      undefined,
      "ETH LATAM Ticket Proof",
      "Proof that you are the holder of a scanned ETH LATAM Ticket",
    );
  }, [authenticate, connectedAddress]);

  // const sendPCDToServer = async () => {
  //   let response;
  //   if (!pcd) {
  //     notification.error("No PCD found!");
  //     return;
  //   }

  //   if (!connectedAddress) {
  //     notification.error("Please connect wallet");
  //     return;
  //   }
  //   try {
  //     // console.log("PCD: ", pcd);
  //     // console.log("connectedAddress: ", connectedAddress);

  //     response = await fetch("/api/verify", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         pcd: pcd,
  //         address: connectedAddress,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   } catch (e) {
  //     console.log("Error detectado: ", e);
  //     notification.error(`Error: ${e}`);
  //     return;
  //   }

  //   const data = await response.json();
  //   console.log(data);
  //   setVerifiedBackend(true);
  //   if (data?.error) {
  //     notification.error(
  //       <>
  //         <p className="font-bold m-0">Error</p>
  //         <p className="m-0">{data?.message}</p>
  //       </>,
  //     );
  //   } else {
  //     notification.success(
  //       <>
  //         <p className="font-bold m-0">Usuario Registrado!</p>
  //         <p className="m-0">{data?.message}</p>
  //       </>,
  //     );
  //   }
  // };

  return (
    <>
      <MetaHeader />
      <div className="h-screen flex flex-col items-center justify-center gap-16 px-4 sm:px-8">
        <Image
          alt="ETH Latam logo"
          className="cursor-pointer px-4"
          src="/logo_black.svg"
          width="125"
          height="125"
          style={{
            width: "100%",
            filter: "invert(100%)",
          }}
        />
        <h2 className="">Bienvenid@ al Faucet de ETH LATAM!</h2>

        <div className="w-full flex flex-col sm:flex-row justify-evenly font-pixel gap-8">
          <button
            className="px-2 sm:px-6 py-2 color-secondary border-4 border-secondary shadow-secondary text-center disabled:opacity-30"
            disabled={true}
          >
            <h3>Round finished!</h3>
          </button>
        </div>

        {/* <div className="w-full flex flex-col sm:flex-row justify-evenly font-pixel gap-8">
          <button
            className="px-2 sm:px-6 py-2 color-secondary border-4 border-secondary shadow-secondary text-center disabled:opacity-30"
            onClick={getProof}
            disabled={!!pcd}
          >
            <h3>{!pcd ? "VERIFICAR TICKET" : "TICKET VERIFICADO!"}</h3>
          </button>
          <button
            className="px-2 sm:px-6 py-2 color-primary border-4 border-primary shadow-primary disabled:opacity-30"
            onClick={sendPCDToServer}
            disabled={!pcd || verifiedBackend}
          >
            <h3>ALISTATE PARA VOTAR!</h3>
          </button>
          {pcd && verifiedBackend ? (
            <Link
              className="px-2 sm:px-6 py-2 color-accent border-4 border-accent shadow-accent text-center"
              href="https://qf.ethlatam.org"
            >
              <h3>VOTA!</h3>
            </Link>
          ) : (
            <button
              className="px-2 sm:px-6 py-2 color-accent border-4 border-accent shadow-accent disabled:opacity-30"
              disabled={true}
            >
              <h3>VOTA!</h3>
            </button>
          )}
        </div> */}

        <Footer />
      </div>
    </>
  );
};

export default Home;
