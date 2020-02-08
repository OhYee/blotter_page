export default {
  namespace: 'token',
  state: '',
  reducers: {
    set(state: string, { token }: { token: string }) {
      return token;
    },
  },
};
