import { Alert, Badge } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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

const DimmableStyles = styled.div`
  .dimmable-content-container {
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #fff;
      opacity: 0;
      transition: 0.3s all ease-in-out;
      pointer-events: none;
    }

    &.active {
      &:after {
        opacity: 0.4;
        pointer-events: auto;
      }
    }
  }
`;

export const DimmableContent: FC<
  PropsWithChildren<{
    dim?: boolean;
  }>
> = ({ dim = true, children }) => (
  <DimmableStyles>
    <div className={`dimmable-content-container ${dim && 'active'}`}>{children}</div>
  </DimmableStyles>
);

export const CircularImg = styled.img<{
  radius: number;
}>`
  border-radius: 50%;
  height: ${props => `${props.radius}px`};
  width: ${props => `${props.radius}px`};
  margin: 0;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

export const CircularContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const NoContentStyles = styled.div`
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
  p.lead {
    color: ${props => props.theme.textColor};
  }
`;

export const NoContent: FC<{
  title: string;
  icon?: IconDefinition;
  extra?: ReactNode;
}> = ({ title, icon, extra }) => {
  return (
    <NoContentStyles className='noContentStyles'>
      {icon && <FontAwesomeIcon icon={icon} className='text-muted' size='2x' />}
      <p className='lead mb-0'>{title}</p>
      {extra}
    </NoContentStyles>
  );
};

const StagingBanner = styled(Alert).attrs({
  variant: 'warning',
})`
  text-align: center;
  border-radius: 0;
  border: none;
  position: fixed;
  z-index: 1090;
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
