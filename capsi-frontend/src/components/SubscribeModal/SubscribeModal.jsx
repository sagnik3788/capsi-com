import { CONSTS } from "../../constants";
import { Button, Loading, Modal, Text } from "@nextui-org/react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  getPreviousSubscription,
  stripeCheckout,
  stripeValidate,
} from "../../apis/paymentsApis";
import toast from "react-hot-toast";
import { styled } from "styled-components";
import Link from "next/link";
import Routes from "../../../routes";

const FirstPurchaseBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;
const PurchaseBoxText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5d6368;
`;
const PurchaseBoxDivider = styled.div`
  border: none;
  border-top: 1px solid var(--main-linke, #e5e7eb);
`;
const SusbscribeModal = ({
  subscribeAlert,
  setSubscribeAlert,
  message
}) => {
  const searchParams = useSearchParams();
  const [ready, isReady] = useState(false);
  const [loading, setloading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const closeHandler = () => {
    setSubscribeAlert(false);
    console.log("closed");
  };

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setModalLoading(true);
        const response = await getPreviousSubscription();
        if (response.status) {
        }
      } catch (error) {
        console.error(error);
      } finally {
        setModalLoading(false);
      }
    })();
  }, []);

  // const handleClick = async () => {
  //   setloading(true);
  //   try {
  //     const res = await stripeCheckout({});
  //     //@ts-ignore
  //     window.location.href = res.url;
  //   } catch (error) {
  //     toast("Payment Failed", {
  //       position: "top-right",
  //       style: {
  //         width: "15vw",
  //         borderRadius: "16px",
  //         fontSize: "16px",
  //         color: "#B1000F",
  //         backgroundColor: "#FFD4D8",
  //       },
  //     });
  //     console.error("Payment false:", error);
  //   } finally {
  //     setloading(false);
  //   }
  // };

  useEffect(() => {
    if (
      (searchParams.get("canceled") || searchParams.get("success")) &&
      ready
    ) {
      (async () => {
        setloading(true);
        try {
          const success = searchParams.get("success");
          const canceled = searchParams.get("canceled");
          const session_id = searchParams.get("session_id");
          console.log(
            "success:" + success,
            "canceled" + canceled,
            "session_id:" + session_id
          );
          const res = await stripeValidate({ success, canceled, session_id });
          console.log(res);
        } catch (error) {
          console.error(error);
        } finally {
          setloading(false);
          closeHandler();
        }
      })();
    }
  }, [ready]);

  useEffect(() => {
    isReady(true);
  }, []);

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={subscribeAlert}
        onClose={closeHandler}
      >
        {modalLoading ? (
          <>
            <Modal.Body
              style={{
                minHeight: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width:'320px'
              }}
            >
              <Loading type="spinner" size="xl" />
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Body
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                
              }}
            >
              <Modal.Header>
                  <Text size={"20px"} b css={{}}>
                    {message?.message?.title}
                  </Text>
              </Modal.Header>
              <FirstPurchaseBox>
                <div style={{ }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Text size={"18px"}  css={{ padding:'10px' }}>
                      {message?.message?.body}
                    </Text>

                  </div>

                </div>
                  {message?.message?.reason !=='SubscriptionError'? <></>:<Button
                  //  @ts-ignore  
                  as={Link}
                  href={Routes.pricing.path}
                  css={{
                    textDecoration: 'none',
                    width: "275px",
                    height: "52px",

                    borderColor: CONSTS.BRAND_COLORS.PRIMARY,
                    backgroundColor: CONSTS.BRAND_COLORS.PRIMARY,
                  }}
                >
                  Subscribe now
                </Button>}
              </FirstPurchaseBox>
            </Modal.Body>
            <Modal.Footer />
          </>
        )}
      </Modal>
    </>
  );
};

export default SusbscribeModal;
