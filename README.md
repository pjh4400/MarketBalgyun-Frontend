# MARKET BALGYUN POS WEB PROJECT
## About Project
&nbsp;본 프로젝트는 JAKorea-SAP가 주최하는 **사회적기업 디지털 전환 프로젝트**의 일환입니다. 사회적기업 디지털 전환 프로젝트는 JAKorea와 SAP가 함께하여 디지털화가 필요한 사회적기업에 IT 전공 대학생들이 자신의 전공을 활용하여 기업 맞춤형 솔루션을 제공하는 프로젝트입니다. 

본 프로젝트는 Front-End와 Back-End(Web API 서버)로 구성된 웹 프로젝트이며 본 레포지토리는 Front-End 레포지토리입니다.





### 요구사항
  1. 항상 정해진 물건만 판매하는 일반적인 매장과 달리 마켓 발견은 항상 다른 종류의 상품이 들어오기 때문에 매번 새로운 상품을 POS에 등록해야한다. 하지만 일반적인 POS 기기 특성상 상품을 매번 등록하기에는 시간이 많이 때문에 이를 효과적으로 줄일 수 있는 체계가 필요하다.  
  
  2. 상품 수가 많은 만큼 서로 유사한 상품이 많아 상품 이름만으로 재고의 파악이 어렵다. 새로운 식별자 및 관리 체계가 필요하다.  
  
  3. 일반 매입 상품외에도 마켓 발견에는 '위탁상품'이라는 고유한 판매형태가 있다. 이 위탁상품은 고객이 물건을 판매를 의뢰하는 형태로 일반 판매 상품과 다르게 위탁자, 위탁기간의 정산 방식 등의 이유로 등의 정보와 함께 관리된다. 이 위탁상품이라는 판매형태를 관리하기 위한 툴이 필요하다.  
  
  4. 물건의 종류가 다양하여 세부카테고리에 들어가기 애매한 경우가 있다. 이와 같은 경우 상위카테고리까지만 취급하여 판매에 이용하고 싶다.  
  
  5. 현재 운영중인 웹 사이트가 여러개여서 재고관리 뿐만 아니라 회원관리의 통합적인 관리가 어렵다. 재고와 회원를 통합적으로 관리할 수 있는 툴이 필요하다.  
  
  6. 솔루션 관리 비용 최소화  
  
  7. 통계를 위한 판매로그 작성 및 엑셀 파일로 출력 가능

  



### 솔루션  
    1. 재고 등록 시간의 단축을 위해 터치 기반 태블릿 도입, 다수의 직원이 휴대하며 동시에 재고, 회원 등록이 가능하게 함 
    2. 기존 POS를 대체하는 웹 기반 마켓발견 맞춤형 재고, 회원 관리 시스템 개발, 태블릿 사용을 전제로 터치에 용의하도록 설계
    3. 위탁 상품, 유사 상품 등을 관리하기 위한 새로운 상품 ID체계 도입, 데이터베이스 설계  
    4. 솔루션 관리 비용을 최소화 하기 위해 무료 호스팅 서비스 사용  






## 프로젝트 구성
### 개발 환경 및 개발 언어
| | tool |
| ------ | ------ |
| 개발언어 | ![issue badge](https://img.shields.io/badge/Node.js-14.15.3-brightgreen) |
| FrameWork | ![issue badge](https://img.shields.io/badge/React-4.16.1-blue) |
| build | ![issue badge](https://img.shields.io/badge/webpack-4.3.0-orange) |
| library | ![issue badge](https://img.shields.io/badge/Redux-4.0.5-yellowgreen) |
| 개발환경 | Windows |





### 프로젝트 구조도
<img src="https://user-images.githubusercontent.com/42201356/103192044-9738ee00-491a-11eb-912d-3eed499bdc2f.png" alt="프로젝트 구조도" width="75%" height="75%">  





## Web API 서버

https://marketback.herokuapp.com/  

<a href="https://github.com/wlgjs8/MarketBalgyun-Backend">Back-End 레포지토리</a>  





## 클라이언트 페이지

https://market-balgyun.herokuapp.com/  



#### 페이지 기능 설명

#### 📃 로그인 페이지

<img src="https://user-images.githubusercontent.com/54929552/107138362-5095d500-6957-11eb-8222-6b2b3928e91b.png" alt="image-20210207150620441" width="50%" />





#### 📃 메인 페이지

<img src="https://user-images.githubusercontent.com/54929552/107138602-bc2c7200-6958-11eb-8a8d-2130a3f521aa.png" alt="image-20210207150300223" width="50%" />

- 관리자 계정에서 직원 등록 및 삭제 가능
- 판매 및 재고관련 엑셀파일 다운로드 기능



#### 📃 상품 등록

<img src="https://user-images.githubusercontent.com/54929552/107138414-8cc93580-6957-11eb-9b66-919ba21db376.png" alt="image-20210207151046705" width="50%" />

<img src="https://user-images.githubusercontent.com/54929552/107138417-9b175180-6957-11eb-8aa0-c38713131be3.png" alt="image-20210207151136904" width="50%" />

- 카테고리 선택 후 상품 상세 정보 기입, 등록




#### 📃 상품 검색
<img src="https://user-images.githubusercontent.com/54929552/107138682-10cfed00-6959-11eb-9f21-92de505c9837.png" alt="image-20210207150445822" width="50%" />

- 상품 정보를 통한 상품 검색, 장바구니 연동



#### 📃 상품 판매

<img src="https://user-images.githubusercontent.com/54929552/107138371-63100e80-6957-11eb-9a4e-5c49d65aa371.png" alt="image-20210207150721623" width="50%" />

- ID를 이용한 상품 검색
- 장바구니 기능, 수량 & 판매가 수량 기능



<img src="https://user-images.githubusercontent.com/54929552/107138383-76bb7500-6957-11eb-885b-f0529f03f771.png" alt="image-20210207150906168" width="50%" />

- 전화번호 검색을 통한 구매자 정보 조회 및 포인트(적립금) 사용 기능
- 결제 방식에 따른 거스름돈 계산



#### 📃 회원 관리

<img src="https://user-images.githubusercontent.com/54929552/107138484-02350600-6958-11eb-9a13-66f89e5417bf.png" alt="image" width="50%" />

<img src="https://user-images.githubusercontent.com/54929552/107138445-c306b500-6957-11eb-8fb7-cc185c70d1e4.png" alt="image-20210207151339490" width="50%" />

- 회원 정보 기입 후 회원 등록



## FRONTEND DEVELOPER

- [숭실대 소프트웨어학부 18 박재희]
- [숭실대 컴퓨터학부 18 손예진]



## BACKEND DEVELOPER

- [숭실대 소프트웨어학부 18 김지헌]
- [숭실대 소프트웨어학부 18 변지현]

