import styled from "styled-components";

const StyledBar = styled.div`
  background: linear-gradient(
    to right,
    rgba(50, 0, 0, 0.7),
    rgba(100, 100, 100, 0.5),
    rgba(50, 0, 0, 0.7),
    rgba(100, 100, 100, 0.5),
    rgba(50, 0, 0, 0.7)
  );
  width: 200px;
  height: 50px;
  border-radius: 5px;
  margin: 10px 20px 0 0;
  justify-self: flex-end;
`;

export default StyledBar;
