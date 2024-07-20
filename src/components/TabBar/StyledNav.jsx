import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f8f9fa; /* 배경색을 설정합니다. */
  padding: 10px 0; /* 상하 패딩을 추가합니다. */
  position: fixed; /* 고정 위치 설정 */
  bottom: 0; /* 하단에 위치하게 설정 */
  width: 100%; /* 전체 너비를 차지하도록 설정 */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 상단에 그림자 추가 */

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333; /* 기본 텍스트 색상 */

    &.current {
      color: #02b550; /* 선택된 탭의 텍스트 색상 */
    }

    svg {
      margin-bottom: 5px; /* 아이콘과 텍스트 사이의 간격 */
      fill: currentColor;
      stroke: currentColor;
    }

    span {
      font-size: 12px; /* 텍스트 크기 */
      margin-top: 4px; /* 텍스트와 아이콘 사이의 간격 */
    }
  }
`;

export default StyledNav;
