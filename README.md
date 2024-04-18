# 풀스택 타임어택 (백엔드) - NestJS

## 들어가기
Node.js 기반 백엔드 프레임워크 NestJS를 활용한 8시간 타임어택 프로젝트를 진행했습니다.

### 배경
당신은 대기업의 신사업개발팀에 풀스택 개발자로 취업하였습니다. 이 대기업은 당근마켓, 중고나라를 참고한 중고거래 서비스의 개발을 고민하고 있습니다.

신사업개발팀장은 서비스 개발 여부를 최종적으로 결론 짓기에 앞서 일부 필수 기능만 담은 간단한 시제품을 만들어 보기로 결심했습니다.

패기 넘치는 신입 풀스택 개발자인 당신은 지금부터 20시간 내로 시제품을 만들어 보겠다고 공언했습니다.

팀장과 기획자는 다음의 요구사항들을 정리하여 당신에게 전달하였습니다.

### 요구사항
- Language - `Typescript`
- Server Framework - `Nest.js`
- ORM - `Prisma`
- Database - `PostgreSQL`
- Database Cloud - `AWS RDS`
- Backend Deployment - `Cloudtype`

### 필수 요구사항
- API는 RESTful 해야 합니다.
- 인증은 JWT을 Bearer Token으로 사용하여 구현하며 토큰은 발급일시 기준 2시간 뒤 만료되어야 합니다.
- API 서버로부터의 모든 응답은 다음의 JSON 형태여야 합니다.
    
    ```tsx
    {
    	"success": boolean,
    	"result": T,
    	"message": string
    }
    ```
