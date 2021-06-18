import styled from "styled-components/native";

export const TextInput = styled.TextInput<{ lastOne?: boolean }>`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  margin-bottom: ${(props  ) => (props.lastOne ? "15" : 8)}px;
`;

const SAvatar = styled.View`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.Image`
  max-width: 100%;
`;

function Avatar({ url }: {url:any}) {
  return <SAvatar><Img resizeMode="cover" source={url} /></SAvatar>;
}
export default Avatar;