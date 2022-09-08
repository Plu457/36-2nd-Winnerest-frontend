## 구현한 기능

### 1. 핀 상세 페이지

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