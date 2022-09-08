import { useState, useRef } from 'react';
import axios from 'axios';
import * as S from './PinInfoStyle';
import Button from '../../../components/Button/Button';
import ReviewList from './ReviewList/ReviewList';
import CloseEllipsisContent from './CloseEllipsisContent';
import Modal from '../../../components/Modal/Modal';

const PinInfoContainer = ({
  title,
  contents,
  nickname,
  follower,
  imgUrl,
  reviewCount,
  params,
  userId,
  followBtn,
  setFollowBtn,
  getPinData,
  profileUrl,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const token = localStorage.getItem('Token');

  const [changeInfo, setChangeInfo] = useState({
    title: '',
    desc: '',
  });
  const [savedBtn, setSavedBtn] = useState(false);
  const textRef = useRef(null);
  const clipCopyUrl = url => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert('클립보드에 복사되었습니다.');
        })
        .catch(() => {
          alert('복사를 다시 시도해주세요.');
        });
    } else {
      alert('지원되지 않는 브라우저입니다.');
    }
  };

  const onSetIsActive = active => {
    setIsActive(active);
  };

  //* 핀 수정 모달에서도 사용하므로 util 폴더를 생성한 뒤 관리를 해주면 좋을 거 같다.
  //* (defaultHeight, ref값)
  const handleResizeHeight = defaultHeight => {
    textRef.current.style.height = defaultHeight;
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  };

  //* useRef를 이용해서 한번에 데이터를 저장하고 보내는 형식으로 바꾸는게 좋을 거 같다.
  //* state 값이 변경되면서 렌더링이 발생된다.
  const handleChangeInfo = ({ target }) => {
    handleResizeHeight('48px');
    setChangeInfo({
      ...changeInfo,
      [target.name]: target.value,
    });
  };

  const saveChangeInfo = async () => {
    try {
      await axios.patch(
        `http://10.58.7.159:3000/pins/${params.id}`,
        {
          boardId: '1',
          title: changeInfo.title,
          contents: changeInfo.desc,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (err) {
      alert('당신이 만든 핀이 아닙니다.');
      throw new Error(err);
    }
  };

  const postFollowBtn = async () => {
    axios.post(
      `http://10.58.7.159:3000/auth/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  };

  const deleteFollowBtn = async () => {
    axios.delete(`http://10.58.7.159:3000/auth/follow/${userId}`, {
      headers: {
        Authorization: token,
      },
    });
  };

  const setPinInfo = (
    <>
      <S.setPinInput
        onChange={e => handleChangeInfo(e)}
        type="text"
        placeholder="제목"
        name="title"
      />
      <S.setPinInput
        ref={textRef}
        onChange={e => handleChangeInfo(e)}
        isSelectInput={changeInfo}
        type="text"
        placeholder="내용"
        name="desc"
      />
    </>
  );

  return (
    <>
      <S.PinInfoContainer>
        <S.StickyContent>
          <S.LeftContent>
            <S.HoverWrap
              onClick={() => onSetIsActive(!isActive)}
              width="48px"
              height="48px"
            >
              <S.EllipsisBtn />
            </S.HoverWrap>
            <S.EllipsisContent isActive={isActive}>
              <S.downloadBtn href={imgUrl} download target="_blank">
                <S.EllipsisItem>이미지 다운로드</S.EllipsisItem>
              </S.downloadBtn>
              <S.EllipsisItem onClick={() => clipCopyUrl(window.location.href)}>
                링크 복사
              </S.EllipsisItem>
              <S.EllipsisItem onClick={() => setIsModal(isModal => !isModal)}>
                수정
              </S.EllipsisItem>
              {isModal && (
                <Modal
                  childeren={setPinInfo}
                  onClose={() => setIsModal(isModal => !isModal)}
                  isCancel="true"
                  propsFunction={saveChangeInfo}
                />
              )}
            </S.EllipsisContent>
          </S.LeftContent>
          <Button
            children={!savedBtn ? '저장' : '저장됨'}
            size="large"
            width="60px"
            color={savedBtn ? 'black' : ''}
            hoverColor={savedBtn ? 'hoverGrey' : ''}
            onClick={() => setSavedBtn(savedBtn => !savedBtn)}
            style={{
              height: '48px',
              fontSize: '16px',
              zIndex: '100',
            }}
          />
        </S.StickyContent>
        <S.PinTitle>{title}</S.PinTitle>
        <S.PinDesc>{contents}</S.PinDesc>
        <S.AuthorProfile>
          <S.AuthorProfileLink to="/">
            <S.AuthorImg src={profileUrl} />
          </S.AuthorProfileLink>
          <S.AuthorInfoWrapper>
            <S.AuthorInfo>
              <S.AuthorProfileLink to="/">{nickname}</S.AuthorProfileLink>
              <S.AuthorFollower>팔로워 {follower}명</S.AuthorFollower>
            </S.AuthorInfo>
            {followBtn ? (
              <S.FollowerBtn
                onClick={async () => {
                  await setFollowBtn(followBtn => !followBtn);
                  await deleteFollowBtn();
                  await getPinData();
                }}
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                팔로잉
              </S.FollowerBtn>
            ) : (
              <S.FollowerBtn
                onClick={async () => {
                  await setFollowBtn(followBtn => !followBtn);
                  await postFollowBtn();
                  await getPinData();
                }}
              >
                팔로우
              </S.FollowerBtn>
            )}
          </S.AuthorInfoWrapper>
        </S.AuthorProfile>
        <ReviewList reviewCount={reviewCount} />
      </S.PinInfoContainer>
      <CloseEllipsisContent isActive={isActive} onSetIsActive={onSetIsActive} />
    </>
  );
};
export default PinInfoContainer;
