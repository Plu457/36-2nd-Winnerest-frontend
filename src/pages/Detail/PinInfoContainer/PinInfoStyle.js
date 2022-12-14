import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as Ellipsis } from '../../../assets/Icon-Ellipsis.svg';

export const HoverWrap = styled.div`
  ${({ theme }) => theme.variables.flex('', 'center', 'center')}
  width: ${({ width }) => width || '24px'};
  height: ${({ height }) => height || '24px'};
  z-index: 100;
  cursor: pointer;

  &:hover {
    background-color: rgb(225, 225, 225);
    border-radius: 50%;
    z-index: 100;
    cursor: pointer;
  }
`;

export const PinInfoContainer = styled.div`
  width: 50%;
  padding: 16px 32px 0 32px;
`;

export const StickyContent = styled.div`
  ${({ theme }) => theme.variables.flex('', 'space-between', 'center')}
  padding-left: 16px
`;

export const LeftContent = styled.div`
  position: relative;
  width: 50%;
`;

export const EllipsisBtn = styled(Ellipsis)`
  width: 20px;
  height: 20px;
  z-index: 100;

  &:hover {
    z-index: 100;
    background-color: rgb(225, 225, 225);
  }
`;

export const EllipsisContent = styled.ul`
  position: absolute;
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  width: 180px;
  padding: 10px;
  top: 100%;
  left: -50%;
  background-color: #ffffff;
  border-radius: 20px;
  z-index: 100;
`;

export const downloadBtn = styled.a`
  width: 200px;
  text-decoration: none;
  color: #000000;
  cursor: pointer;
`;

export const EllipsisItem = styled.li`
  width: 100%;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: rgb(225, 225, 225);
    border-radius: 8px;
  }
`;

export const PinTitle = styled.h1`
  margin-top: 16px;
  font-size: 32px;
  font-weight: 700;
`;

export const PinDesc = styled.p`
  margin: 12px 0;
  font-size: 14px;
  line-height: 18px;
`;

export const AuthorProfile = styled.div`
  display: flex;
  align-items: center;
  height: 55px;
`;

export const AuthorProfileLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: 600;
`;

export const AuthorImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const AuthorInfoWrapper = styled.div`
  ${({ theme }) => theme.variables.flex('', 'space-between', 'center')};
  margin-left: 8px;
  width: 100%;
  line-height: 20px;
`;

export const AuthorInfo = styled.div``;

export const AuthorFollower = styled.p`
  font-size: 14px;
`;

export const FollowerBtn = styled.button`
  padding: 12px 18px;
  border-radius: 20px;
  font-weight: 700;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(225, 225, 225);
  }
`;

export const setPinInput = styled.textarea`
  width: 80%;
  height: ${({ isSelectInput }) => (isSelectInput ? 'auto' : '32px')};
  margin: 4px auto;
  padding: 4px;
  font-size: 16px;
  border: 1px solid rgb(205, 205, 205);
  border-radius: 8px;
  outline: none;
  resize: none;
  overflow: hidden;
`;
