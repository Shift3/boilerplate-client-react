import { Alert, Badge } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import { BitwiseNavbar } from './page';
import { FC, PropsWithChildren } from 'react';

export const SubtleBadge = styled(Badge)<{
  variant?: 'warning' | 'danger' | 'secondary' | 'info';
}>`
  padding: 0.4rem 0.75rem;

  ${props =>
    props.variant === 'warning' &&
    css`
      background: #eaf0e3 !important;
      color: #dc7906;
    `}

  ${props =>
    props.variant === 'danger' &&
    css`
      background: #eae6e5 !important;
      color: #cc1503;
    `}

    ${props =>
    props.variant === 'secondary' &&
    css`
      background: #ddd !important;
      color: #555;
    `}

    ${props =>
    props.variant === 'info' &&
    css`
      background: #e3edfc !important;
      color: #37aaa5;
    `}
`;

export const CenteredSpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1060; // consistent with Bootstrap's $zindex-modal value
`;

export const DimmableContent = styled.div<{
  dim: boolean;
  containerHasRoundedCorners: boolean;
  containerBorderRadius: string;
}>`
  ${props =>
    props.dim
      ? css`
          &:after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: white;
            opacity: 0.5;
            border-radius: ${props.containerHasRoundedCorners ? props.containerBorderRadius : '0px'};
          }
        `
      : null}
`;

export const CircularImg = styled.img<{
  radius: number;
}>`
  border-radius: 50%;
  height: ${props => `${props.radius}px`};
  width: ${props => `${props.radius}px`};
  margin: 0;
  margin-right: 0.75rem;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

export const NoContent = styled.div`
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  i,
  svg {
    color: ${props => props.theme.textColor};
    margin-bottom: 0.5rem;
  }
`;

const StagingBanner = styled(Alert).attrs({
  variant: 'warning',
})`
  text-align: center;
  border-radius: 0;
  border: none;
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  background: repeating-linear-gradient(45deg, #fff3cd, #fff3cd 20px, #fdefc3 20px, #fdefc3 40px);
  border-bottom: 1px #dadada solid;
`;

const BannerWrapper = styled.div<{
  bannerShowing: boolean;
}>`
  ${StagingBanner} {
    display: none;
    visibility: hidden;
  }

  ${props =>
    props.bannerShowing
      ? css`
          .content-wrapper {
            padding-top: 56px !important;
          }

          ${StagingBanner} {
            display: block;
            visibility: visible;
          }

          ${BitwiseNavbar} {
            padding-top: 56px !important;

        `
      : null}
`;

export const BannerContentWrapper: FC<
  PropsWithChildren<{
    bannerShowing: boolean;
  }>
> = ({ children, bannerShowing }) => {
  return (
    <BannerWrapper bannerShowing={bannerShowing}>
      <StagingBanner>
        You are currently on the <b>staging</b> server.
      </StagingBanner>
      {children}
    </BannerWrapper>
  );
};
