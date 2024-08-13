export interface IUserSlice {
  loading: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    picture: string;
    given_name: string;
    family_name: string;
    about: string;
    appProducerHandle: string;
    contact: {
      countryCode: string;
      contactNumber: string;
    };
    roles: Array<any>;
  } | null;
  isLoggedIn: boolean;
}
export type TUserData = IUserSlice['data'];

const UserSlice = (set: any, get: any) => ({
  userData: {
    loading: false,
    data: null,
    isLoggedIn: false,
  } as IUserSlice,

  loginState: {
    loginModalVisible: false,
  },

  setLoginState: (data: any) => {
    set(() => ({ loginState: { loginModalVisible: data.loginModalVisible } }));
  },

  setUserData: (data: any) => {
    set(
      () => ({
        userData: { loading: false, data, isLoggedIn: !!data },
      }),
      false,
      "SET_USER_DATA"
    );
  },
});

export default UserSlice;
