export const getRootProps = jest.fn(() => ({
  onClick: () => console.log('Modified behavior')
}));

export default {
  getRootProps
};
