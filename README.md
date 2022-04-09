# 따라하며 배우는 TDD

먼저, 수업의 내용대로 JS로 작성한 후, \
TS로 변경할 계획

## jest.fn()

Mock 함수를 생성하는 함수 가짜, 흉내내는, \
단위테스트를 작성할 때 해당 코드가 의존하는 부분을 가짜로 대체한다.

테스트 코드는 하나를 테스트 한다.

단위 테스트는 특정 기능만 분리해서 독립적으로! \
Mock 함수를 사용, 이 함수에 어떤 일이 발생? 다른 코드들에 의해 어떻게 호출되는지 검증

```js
const mockFunction = jest.fn(); // mock 함수 생성

// 인자 값을 넘겨줄 수 있다.
mockFunction();
mockFunction("hello");

// 반환 값도 가짜로 지정할 수 있다.
mockFunction.mockReturnValue("가짜 함수의 반환");
console.log(mockFunction); // 값 리턴

// 내부에 어떻게 호출되었는지 확인 가능하다.
expect(mockFunction).toBeCalledWith("hello"); // 어떤 인자값으로 호출 되었는지
expect(mockFunction).toBeCalledTimes(2); // 몇 번 호출되었는지
```

## 잠깐 정리

1. 함수가 존재하는지 테스트
2. 함수가 동작할 때 내부에 함수가 동작하는지 테스트 (mock 함수)
3. 전달되는 Request, Response 객체는 node-mocks-http 를 통해 mocking
