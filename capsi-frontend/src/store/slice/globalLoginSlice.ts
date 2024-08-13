import { ReactElement, JSXElementConstructor } from 'react';

interface CGlobalLoginModal {
  id: string | null;
  headingText: string | ReactElement<any, string | JSXElementConstructor<any>>;
  loginSuccessCallback?: (() => void) | undefined;
  loginFailureCallback?: (() => void) | undefined;
  modalCloseCallback?: (() => void) | undefined;
  additionalData?: any;
  visible: boolean;
}

type IGlobalLoginModalData = CGlobalLoginModal;

type TShowLoginModalData = Partial<CGlobalLoginModal>;

const globalLoginSlice = (set: (arg0: { (): { globalLoginModal: IGlobalLoginModalData }; }, arg1: boolean, arg2: string) => void, get: any) => ({
  globalLoginModal: {
    id: null,
    visible: false,
    headingText: '',
    loginSuccessCallback: null,
    loginFailureCallback: null,
    modalCloseCallback: null,
    additionalData: null,
  } as unknown as IGlobalLoginModalData,

  showLoginModal: (data: TShowLoginModalData) => {
    set(
      () => ({
        globalLoginModal: {
          id: null, // default value
          headingText: '', // default value
          visible: true,
          ...data,
        },
      }),
      false,
      'SET_LOGIN_MODAL'
    );
  },
});

export default globalLoginSlice;

  // hideLoginModal: () => {
  //   set(
  //     () => ({
  //       globalLoginModal: new CGlobalLoginModal({ visible: false }),
  //     }),
  //     false,
  //     'HIDE_LOGIN_MODAL'
  //   );
  // },
