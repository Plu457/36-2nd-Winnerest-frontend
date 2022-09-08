## 구현한 기능

### 1. 핀 상세 페이지

- 이미지 다운로드
   - html의 a 태그에서 download 속성을 지원해주는데 재데로 사용하지를 못한거 같다.

- url 복사
   - ClipboardAPI를 이용하여 url 복사 기능 구현
   - [브라우저에서 클립 보드 사용하기 [javascript]](https://goldenthumb.net/Clipboard-API)

- 핀 수정
   - axios에서 PATCH 메서드를 이용하여 핀의 대한 정보를 수정하였다.

- 댓글 추가 기능
   - textarea 태그에서 글을 입력할시 엄청난 양의 렌더링이 되는데 그것을 최소화 하기 위해서 useRef를 이용하여 마지막 클릭했을 때만 입력한 값을 POST메서드를 이용하여 서버에 보냈다.
   - 핀터레스트에서는 글자를 한 번만 입력해도 확인 버튼이 활성화되는데 useRef만 사용하면 글자를 입력했는지 바로 확인이 불가능하여 useState를 같이 사용하였다.


```js
  const reviewInputChange = e => {
    handleResizeHeight('40px');
    e.target.value.length <= 1 &&
      setIsStateObj({
        ...isStateObj,
        reviewValue: textRef.current.value,
      });
  };
```

- 댓글 리뷰 좋아요 기능
   - 선택한 리뷰에 해당하는 id를 가지고 POST 메서드를 이용하여 선택된 리뷰의 id를 서버에 보내는 방식으로 해결하였다.

- 무한 스크롤
   - 보통의 스크롤 기능만 이용하면 한 번만 휠을 움직일 시 엄청난 양의 이벤트가 발생하는데 발생되는 이벤트들을 제어하기 위해서 debounce, throttle 중 debounce 방법을 이용하여 이벤트를 제어하였다. (throttle하고 intersection-observer부터 사용할걸 그랬네요...)
   - [[JavaScript] 디바운스와 쓰로틀의 차이](https://velog.io/@plu457/JavaScript-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8A%A4%EC%99%80-%EC%93%B0%EB%A1%9C%ED%8B%80%EC%9D%98-%EC%B0%A8%EC%9D%B4)

- 팔로우 기능
   - 좋아요 기능과 비슷한 양식으로 해결하였다.
   - 토큰을 서버단에 보내서 계산된 값을 다시 받아온 뒤 팔로우가 된 경우와 안된 경우를 분리하였다. (버튼 스타일 변경)

### 2. 공통 Nav 바
---
<br>
<br>


### axios를 사용하는 코드가 중복된게 많아서 따로 커스텀 훅으로 빼놔서 관리해도 좋을거 같다.
---
<br>
<br>

### 이 공간 안에서 data라는 변수의 데이터를 변경시키고 변경된 데이터를 pinData에 옮겨도 될거 같다.
### 필요없는 state 값을 이용해서 코드가 복잡해진거 같다.
### PinInfoContainer 컴포넌트에 보내는 state 값이 {...pinData} 만으로도 가능할 거 같다.

```js
const [pinData, setPinData] = useState({});
const [tagId, setTagId] = useState(0);
const [followBtn, setFollowBtn] = useState(false);
const params = useParams();
const token = localStorage.getItem('Token');
```

```js
const getPinData = async () => {
    try {
      const res = await axios.get(`http://10.58.7.159:3000/pins/${params.id}`, {
        headers: {
          Authorization: token,
        },
      });
      const { data } = res;
      if (data.tagIds.length > 1) {
        setTagId(data.tagIds.slice(0, 1).join());
      } else {
        setTagId(data.tagIds);
      }
      if (data.duplicatedResult === '1') {
        setFollowBtn(true);
      } else {
        setFollowBtn(false);
      }
      setPinData(data);
    } catch (err) {
      throw new Error(err);
    }
  };
```
---
<br>
<br>
<br>

### 핀 수정 모달에서도 사용하므로 util 폴더를 생성한 뒤 관리를 해주면 좋을 거 같다.
### (defaultHeight, ref값)
```js
  const handleResizeHeight = defaultHeight => {
    textRef.current.style.height = defaultHeight;
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  };

```
---
<br>
<br>
<br>

### useRef를 이용해서 한번에 데이터를 저장하고 보내는 형식으로 바꾸는게 좋을 거 같다.
### state 값이 변경되면서 렌더링이 발생된다.
```js
  const handleChangeInfo = ({ target }) => {
    handleResizeHeight('48px');
    setChangeInfo({
      ...changeInfo,
      [target.name]: target.value,
    });
  };
```
---
<br>
<br>
<br>

### 글자를 1개만 쓰면 state에 저장되는데 그 과정에서 렌더링이 한 번더 일어나게 되므로 그냥 e.target.value의 길이가 0 보다 크면 "확인" 버튼이 활성화 되게하는게 좋아 보인다.
```js
  const reviewInputChange = e => {
    handleResizeHeight('40px');
    e.target.value.length <= 1 &&
      setIsStateObj({
        ...isStateObj,
        reviewValue: textRef.current.value,
      });
  };
```
---
<br>
<br>
<br>

### 이번 무한 스크롤에서 디바운스를 사용했으니 다음부터는 쓰로틀, intersection-observer를 사용해보고 이번 react 18 버전에서 나온 useDeferredValue라는 기능을 한 번 공부해봐야겠다.
```js
  const debounce = (func, delay) => {
    let timer = null;

    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  };
```