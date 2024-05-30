
# select * from users;

insert into users (id, username, password, name, age, sex, email, address, phone, asset, mbti, investment_propensity, mod_date, reg_date) values (1, 'dmcclure0', 'pO2(eO73)%@', '제갈민', '6403211570892', 'male', 'jgs0318@gmail.com', '서울특별시 강남구', '010-2212-0694', 8200000, 'ISTJ', '보수적', '2023-04-08 18:34:19', '2023-12-31 06:36:58');
insert into users (id, username, password, name, age, sex, email, address, phone, asset, mbti, investment_propensity,  mod_date, reg_date) values (2, 'cmasterson1', 'dlwldms123@', '김현지', '8005222367521', 'female', 'sjrkchdkdy@gmail.com', '부산광역시 해운대구', '010-4351-9876', 9400000, 'ENFP', '공격적', '2024-03-11 00:53:52', '2023-12-08 13:55:58');
insert into users (id, username, password, name, age, sex, email, address, phone, asset, mbti, investment_propensity,  mod_date, reg_date) values (3, 'scurbishley2', 'qkrwnsdud3@', '배광수', '020101351238', 'male', 'bgh950201@gmail.com', '대구광역시 수성구', '010-3355-9088', 7800000, 'INTP', '중립적', '2023-10-08 23:58:44', '2023-06-05 04:39:48');
insert into users (id, username, password, name, age, sex, email, address, phone, asset, mbti, investment_propensity,  mod_date, reg_date) values (4, 'lgrishankov7', 'chlwldus12#', '허민재', '8903241549722', 'male', 'jinpold@gmail.com', '인천광역시 연수구', '010-1535-1177', 8600000, 'ISFJ', '신중함', '2023-12-19 17:33:02', '2023-09-08 08:56:05');
insert into users (id, username, password, name, age, sex, email, address, phone, asset, mbti, investment_propensity, mod_date, reg_date) values (5, 'aparmiter9', 'rladudgns11#%', '이진성', '7907213548215', 'male', 'alswodnjswo@gmail.com', '경기도 성남시 분당구', '010-7612-9909', 9700000, 'ESTP',  '적극적', '2023-06-02 14:43:32', '2023-10-23 18:24:40');

insert into boards (id, title, description, mod_date, reg_date) values (1, 'Service','ServiceType','2023-05-05 00:10:49', '2024-05-05 00:10:49');
insert into boards (id, title, description, mod_date, reg_date) values (2, 'QNA','QNAType','2023-09-30 08:20:52', '2023-12-05 00:12:51');

insert into articles (id,title, content, writer_id, board_id, mod_date, reg_date) values (1, '고객센터 문의', '계정 관련 문의합니다.', 2, 1, '2023-05-05 00:10:49', '2024-02-28 04:32:04');
insert into articles (id, title, content, writer_id, board_id, mod_date, reg_date) values (2, 'Q&A 자주 물어보는 질문', '계좌마다 투자방식이 다른가요?', 5, 2, '2023-04-14 12:07:46', '2023-09-30 08:20:52');
insert into articles (id, title, content, writer_id, board_id, mod_date, reg_date) values (3, 'Q&A 자주 물어보는 질문', '해외투자는 어떻게 하나요?', 4, 2, '2024-01-16 19:23:29', '2024-01-29 03:11:26');
insert into articles (id, title, content, writer_id, board_id, mod_date, reg_date) values (4, 'Q&A 자주 물어보는 질문', '세금은 어떻게 처리되나요?', 3, 2, '2024-01-06 16:32:58', '2023-09-19 15:03:49');
insert into articles (id, title, content, writer_id, board_id, mod_date, reg_date) values (5, '고객센터 문의', '비밀번호 관련 문의합니다.', 1, 1, '2023-12-02 05:19:43', '2024-01-06 04:44:20');
insert into articles (id, title, content, writer_id, board_id, mod_date, reg_date) values (6, '고객센터 문의', '계좌 관련 문의합니다.', 2, 1, '2023-04-13 23:03:48', '2024-03-10 03:25:24');
insert into articles (id, title, content, writer_id, board_id, mod_date, reg_date) values (7, 'Q&A 자주 물어보는 질문', '연말정산 혜택은 무엇이 있나요?', 3, 2, '2023-08-22 22:35:11', '2023-07-06 06:42:17');
insert into articles (id, title, content, writer_id, board_id, mod_date, reg_date) values (8, '고객센터 문의', '계좌를 없애고 싶습니다.', 4, 1, '2023-07-29 19:26:59', '2024-04-05 22:11:04');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (9, '고객센터 문의', '다른 증권사로 옮기고 싶어요', 2, 1, '2023-06-21 16:58:36', '2023-10-24 02:38:07');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (10, 'Q&A 자주 물어보는 질문', '국내주식과 해외주식 투자 방법 문의', 3, 2, '2023-08-10 12:39:39', '2023-06-22 12:28:10');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (11, 'Q&A 자주 물어보는 질문', '주식 투자 조언을 받을 수 있나요?', 2, 2, '2023-12-27 21:43:35', '2023-07-16 22:14:00');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (12, 'Q&A 자주 물어보는 질문', '연금계좌는 어떻게 개설하나요?', 3, 2, '2023-10-22 07:19:26', '2023-07-31 06:54:25');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (13, 'Q&A 자주 물어보는 질문', '일반 계좌와 연금계좌의 차이가 뭔가요?', 2, 2, '2023-07-28 16:21:23', '2024-02-28 09:10:53');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (14, '고객센터 문의', '연금계좌 해지 문의', 2, 1, '2024-03-10 12:34:41', '2024-02-13 13:15:06');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (15, '고객센터 문의', '선물 파생상품 문의', 2, 1, '2023-10-24 07:23:49', '2023-09-06 12:29:18');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (16, '고객센터 문의', '계좌를 해지하고 다시 만들고 싶어요', 3, 1, '2024-02-10 10:53:34', '2023-04-28 19:21:10');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (17, 'Q&A 자주 물어보는 질문', '보이스 피싱 관련 문의', 5, 2, '2024-01-09 17:52:26', '2024-01-03 06:33:31');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (18, 'Q&A 자주 물어보는 질문', '계좌 정지 관련 문의', 4, 2, '2023-07-22 14:50:33', '2024-03-18 03:17:18');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (19, 'Q&A 자주 물어보는 질문', 'OTP 보안카드 문의', 4, 2, '2023-12-01 13:20:30', '2023-10-28 16:37:09');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (20, '고객센터 문의', '해외 주식 관련 문의합니다.', 3, 1, '2023-04-29 07:02:51', '2023-06-22 01:45:42');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (21, 'Q&A 자주 물어보는 질문', '주식 장 마감 시간 문의', 2, 2, '2023-06-02 14:43:32', '2023-10-23 18:24:40');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (22, 'Q&A 자주 물어보는 질문', '국내와 해외 마감 시간 문의', 2, 2, '2023-08-29 22:58:08', '2024-03-11 10:26:45');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (23, 'Q&A 자주 물어보는 질문', '계좌 정지 관련 문의', 5, 2, '2024-03-11 00:53:52', '2023-12-08 13:55:58');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (24, '고객센터 문의', '선물 파생상품 문의', 3, 1, '2024-01-17 22:53:07', '2023-05-14 16:45:59');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (25, '고객센터 문의', '세금 관련 문의해요.', 5, 2, '2023-12-28 07:28:56', '2023-12-26 21:35:59');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (26, '고객센터 문의', '연말 정산 관련 문의해요', 5, 1, '2023-06-29 06:49:05', '2024-04-02 19:53:42');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (27, 'Q&A 자주 물어보는 질문', '해외주식 투자 방법 문의', 3, 2, '2023-12-22 18:46:27', '2023-07-21 05:30:17');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (28, 'Q&A 자주 물어보는 질문', '국내와 해외 마감 시간 문의', 5, 2, '2023-11-10 15:22:42', '2023-06-06 14:24:05');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (29, '고객센터 문의', '지점 방문 상담 문의', 4, 1, '2023-05-16 19:13:17', '2023-04-13 16:15:22');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (30, 'Q&A 자주 물어보는 질문', 'ISA 계좌 문의', 4, 2, '2023-07-17 06:55:36', '2023-07-12 21:56:55');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (31, '고객센터 문의', '영업 관련 문의', 5, 1, '2023-09-17 01:43:42', '2024-03-12 11:57:48');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (32, 'Q&A 자주 물어보는 질문', '연금 계좌에 대해 알고 싶어요', 3, 2, '2023-04-19 18:02:02', '2023-04-16 17:59:00');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (33, '고객센터 문의', '지점 방문 상담 관련 문의', 1, 1, '2023-05-16 15:50:02', '2023-12-06 12:59:44');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (34, 'Q&A 자주 물어보는 질문', '법인 회사 투자 관련 문의', 3, 2, '2024-03-10 20:37:46', '2024-01-05 11:22:55');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (35, '고객센터 문의', '비밀번호 5회 이상 틀렸어요', 3, 2, '2024-01-31 10:31:58', '2023-08-24 06:03:54');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (36, '고객센터 문의', '계정이 잠겼어요', 1, 1, '2023-04-08 18:34:19', '2023-12-31 06:36:58');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (37, 'Q&A 자주 물어보는 질문', '투자 조언 받고 싶어요', 4, 2, '2023-06-19 23:44:50', '2023-09-25 18:22:19');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (38, 'Q&A 자주 물어보는 질문', '개인 투자자 & 법인 투자자 관련 문의', 1, 2, '2023-08-10 14:42:53', '2023-10-28 13:09:30');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (39, '고객센터 문의', '계좌 정지 문의', 5, 1, '2023-09-05 05:35:25', '2023-05-15 04:06:55');
insert into articles (id
                     , title, content, writer_id, board_id, mod_date, reg_date) values (40, '고객센터 문의', '선물 파생상품 문의', 1, 1, '2024-01-28 19:22:05', '2024-03-16 21:14:17');

